import React, { useState, useEffect } from 'react';
import { View,
         Text,
         StyleSheet,
         TouchableOpacity,
         Image,
         Modal,
         Alert,
         ActivityIndicator } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { updateTicketStatus,
         listenForTicketStatusChanges,
         setupNotificationListeners } from './messaging.tsx';

type TicketProps = {
    id: string;
    title: string;
    category: string;
    location: string;
    detail: string;
    priority: number;
    images: string[];
    status: string;
};

const TicketDetailScreen = () => {
    const [tickets, setTickets] = useState<TicketProps[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showEmergencyLevel, setShowEmergencyLevel] = useState(true)
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingImage, setLoadingImage] = useState(true);
    // Initialize state with the current ticket status, default to "Other" if not available
    const [currentTicketStatus, setCurrentTicketStatus] = useState<string>("");

    const statusList = ["Open", "In Review", "In Progress", "Resolved", "Other"];
    // Fetch tickets from Firestore
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const ticketsSnapshot = await firestore()
                    .collection('tickets')
                    .get();

                const ticketsList: TicketProps[] = ticketsSnapshot.docs.map(doc => ({
                    id: doc.id, // Document ID
                    ...doc.data(), // All data fields from the document
                })) as TicketProps[];

                setTickets(ticketsList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tickets: ", error);
            }
        };

        fetchTickets();
    }, []);

    if (tickets.length === 0) {
            <View style={styles.centeredContainer}>
                <Text style={styles.centeredText}>No tickets available.</Text>
            </View>
        }

    const [isStaff, setIsStaff] = useState(false);
    const [loadingStaff, setLoadingStaff] = useState(true);
    useEffect(() => {
        const checkStaffStatus = async () => {
            try {
                const user = auth().currentUser;
                if (!user) return;

                // Query the staffs collection for the current user's UID
                const staffDoc = await firestore().collection('staffs').doc(user.uid).get();
                setIsStaff(staffDoc.exists);
                console.log("Is staff:", staffDoc.exists);
            } catch (error) {
                console.error("Error checking staff status:", error);
            } finally {
              setLoadingStaff(false); // Stop loading once done
            }
        };

        checkStaffStatus();
    }, []);

    // Show loading spinner while staff status is loading
    if (loadingStaff) {
        return <Text>Loading...</Text>;
    }

    const currentTicket = tickets[currentIndex];
    // handleStatusChange function updates the UI and database
     const handleStatusChange = async (newStatus: string) => {
         // Update the UI with the new status (locally and instantaneously)
         setCurrentTicketStatus(newStatus);

         // Update the status in the database
         try {
           await updateTicketStatus(currentTicket.id, newStatus); // Update database call
           console.log("Ticket status successfully updated in database.");
         } catch (error) {
           console.error("Error updating ticket status:", error);
           // Revert the UI update if there was an error
           setCurrentTicketStatus(currentTicket.status); // Revert to the previous status if the update failed
         }
     };


    const handleNext = () => {
        if (currentIndex < tickets.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    {/* handles clicking on photos to enlarge them */ }
    const openModal = (photo: string) => {
        setSelectedPhoto(photo);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
        setModalVisible(false);
    };

    const handleCheckboxToggle = () => {
            setIsSelected(prev => !prev);
    };

    const handleSubscribe = async () => {
        try {
            const user = auth().currentUser;
            if (!user) return;

            // A. Fetch the user's tokens from /users
            const userDoc = await firestore()
                .collection('users')
                .doc(user.uid)
                .get();
            const userData = userDoc.data();
            const userTokens = userData.tokens || []; // Retrieve the user's tokens

            // B. Check if the ticketID has been established in the /notifications collection
            const notificationsSnapshot = await firestore()
                .collection('notifications')
                .doc(currentTicket.id) // The document ID is the ticket ID
                .get();

            // Case 1: If not, create a new document
            if (!notificationsSnapshot.exists) {
                await firestore()
                    .collection('notifications')
                    .doc(currentTicket.id)
                    .set({
                        recipients: userTokens, // Append user's tokens
                        status: currentTicket.status // Append the current ticket status
                    });

                Alert.alert("Subscribed successfully!");
                setIsSubscribed(true); // Mark the ticket as subscribed
                return;
            }

            // Case 2: If yes, check recipients[]
            const notificationData = notificationsSnapshot.data();
            const existingRecipients = notificationData.recipients || [];

            // Case 2a: Check if user tokens are already in recipients
            const alreadySubscribed = userTokens.some(token => existingRecipients.includes(token));

            if (alreadySubscribed) {
                // Alert user they are already subscribed, providing option to unsubscribe
                Alert.alert(
                    "Already Subscribed",
                    "Would you like to unsubscribe?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                            onPress: () => console.log("User chose not to unsubscribe")
                        },
                        {
                            text: "Unsubscribe",
                            onPress: async () => {
                                // Case 2ab: Remove user tokens from the recipients[]
                                const updatedRecipients = existingRecipients.filter(token => !userTokens.includes(token));

                                // Update the notification document with new recipients
                                await firestore()
                                    .collection('notifications')
                                    .doc(currentTicket.id)
                                    .set({
                                        recipients: updatedRecipients,
                                    });

                                Alert.alert("Unsubscribed successfully!");
                                setIsSubscribed(false); // Mark the ticket as unsubscribed
                            }
                        }
                    ],
                    { cancelable: false }
                );
                return; // Exit the function after handling unsubscribe alert
            }

            // Case 2b: If they have not been on the list, add their tokens to the list
            const updatedRecipients = [...new Set([...existingRecipients, ...userTokens])];

            // Update the notification document with the new recipients
            await firestore()
                .collection('notifications')
                .doc(currentTicket.id)
                .set({
                    recipients: updatedRecipients,
                });

            Alert.alert("Subscribed successfully!");
            setIsSubscribed(true); // Mark the ticket as subscribed

        } catch (error) {
            console.error("Error handling subscription: ", error);
            Alert.alert("Failed to subscribe. Please try again.");
        }
    };

    return (

        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />
            ) : (
                <>
                    <Text style={styles.title}>TICKET DETAIL</Text>
                    {/* Ticket Fields */}
                    {currentTicket && (
                        <>
                            {/* Title */}
                            <View style={styles.detailContainer}>
                                <Text style={styles.label}>Title:</Text>
                                <Text style={styles.value}>{currentTicket.title}</Text>
                            </View>

                            {/* Category */}
                            <View style={styles.detailContainer}>
                                <Text style={styles.label}>Category:</Text>
                                <Text style={styles.value}>{currentTicket.category}</Text>
                            </View>

                            {/* Location */}
                            <View style={styles.detailContainer}>
                                <Text style={styles.label}>Location:</Text>
                                <Text style={styles.value}>{currentTicket.location}</Text>
                            </View>

                            {/* Description */}
                            <View style={styles.detailContainer}>
                                <Text style={styles.label}>Description:</Text>
                                <Text style={[styles.value, styles.description]}>
                                    {currentTicket.detail}
                                </Text>
                            </View>

                            {/* Status Selector for Staff Only */}
                              {isStaff ? (
                                  <View style={styles.detailContainer}>
                                    <Text style={styles.label}>Status:</Text>
                                    <ModalDropdown
                                      options={statusList}
                                      onSelect={(index, value) => handleStatusChange(value)}
                                      style={styles.dropdown}
                                      textStyle={styles.dropdownText}
                                      dropdownStyle={styles.dropdownList}
                                      showsVerticalScrollIndicator={true}
                                      isFullWidth={true}
                                      saveScrollPosition={true}
                                      value={currentTicketStatus || currentTicket.status}
                                      defaultIndex={
                                            statusList.includes(currentTicketStatus)
                                            ? statusList.indexOf(currentTicketStatus)
                                            : statusList.indexOf("Other")  // Scroll to "Other" if the status is invalid
                                      }
                                      defaultValue={currentTicket.status}
                                    >
                                    </ModalDropdown>
                                  </View>
                                ) : (
                                  <View style={styles.detailContainer}>
                                    <Text style={styles.label}>Status:</Text>
                                    <Text style={styles.value}>{currentTicketStatus || currentTicket.status}</Text>
                                  </View>
                                )}


                            {/* Urgency Level - SET TO HIDDEN FOR NOW */}
                            <View style={[styles.emergencyContainer, styles.hidden]}>
                                <Text style={styles.label}>Emergency Level:</Text>
                                <View style={styles.urgencyContainer}>
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <View
                                            key={level}
                                            style={[
                                                styles.urgencyCircle,
                                                {
                                                    backgroundColor:
                                                        level === currentTicket.priority ? '#FFD700' : '#E0E0E0',
                                                },
                                            ]}
                                        >
                                            <Text style={styles.urgencyText}>{level}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Photo Section */}
                            <View style={[styles.photoContainer, { justifyContent: currentTicket.images.length === 1 ? 'center' : 'space-around' }]}>
                                {/* Show ActivityIndicator if the image is still loading */}
                                {/* }{loadingImage && (
                                    <ActivityIndicator size="large"
                                                       color="#007AFF"
                                                       style={styles.loadingIndicator}
                                    />
                                )} */}

                                {/* Check if there are images to render */}
                                {currentTicket.images && currentTicket.images.length > 0 ? (
                                    currentTicket.images.filter(photo => photo && typeof photo === 'string' && photo.trim() !== '')
                                    .map((photo, index) => (
                                        <TouchableOpacity key={index} onPress={() => openModal(photo)}>
                                            <Image
                                                source={{ uri: photo }} // Use a placeholder if photo is invalid
                                                style={styles.photo}
                                                onLoadStart={() => setLoadingImage(true)}
                                                onLoadEnd={() => setLoadingImage(false)}
                                            />
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    // Placeholder if no images exist or if the entry is null
                                    <View style={styles.noImageContainer}>
                                        <MaterialIcons name="image" size={99} color="#ccc" />
                                        <Text style={styles.noImageText}>No Image Available</Text>
                                    </View>
                                )}
                            </View>


                            {/* Modal for Enlarged Photo */}
                            <Modal
                                visible={isModalVisible}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={closeModal}
                            >
                                <View style={styles.modalBackground}>
                                    <View style={styles.modalContainer}>
                                        {selectedPhoto && (
                                            <Image source={{ uri: selectedPhoto }} style={styles.enlargedPhoto} />
                                        )}
                                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                            <Text style={styles.closeButtonText}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>

                            {/* Checkbox Selection for Ticket with Subscribe Button */}
                            {!isStaff && (
                                <View style={styles.subscribeContainer}>
                                    <Checkbox
                                        status={isSelected ? 'checked' : 'unchecked'}
                                        onPress={ handleCheckboxToggle }
                                        color="#007AFF"
                                    />
                                    <TouchableOpacity
                                        onPress={handleSubscribe}
                                        style={styles.subscribeButton}
                                    >
                                        <Text style={styles.subscribeButtonText}>Subscribe</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {/* Navigation Buttons */}
                            <View style={styles.navigationContainer}>
                                {currentIndex > 0 && (
                                        <TouchableOpacity onPress={handlePrevious}>
                                            <Text style={styles.navText}>&lt; Previous</Text>
                                        </TouchableOpacity>
                                )}

                                {currentIndex < tickets.length - 1 && (
                                    <TouchableOpacity onPress={handleNext}>
                                        <Text style={styles.navText}>Next &gt;</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,

    },
    detailContainer: {
        marginBottom: 10,
        marginTop: 0,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    value: {
        fontSize: 16,
        color: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F9F9F9',
        borderRadius: 5,
    },
    description: {
        minHeight: 80,
    },
    emergencyContainer: {
        marginBottom: 10,
        display: 'none',
        opacity: 0,
        height: 0,
        overflow: 'hidden',
    },
    hidden: {
        display: 'none',
    },
    urgencyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    urgencyCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    urgencyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    photoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 50,
    },
    photo: {
        width: 125,
        height: 125,
        borderRadius: 5,
    },
    noImageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginHorizontal: 50,
    },
    noImageText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
        fontWeight: '500',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    enlargedPhoto: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    navText: {
        fontSize: 18,
        color: '#007AFF',
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    disabledText: {
        color: '#D3D3D3', // Grey color for disabled state
    },
    subscribeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    subscribeButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginLeft: 10, // Spacing between checkbox and button
    },
    subscribeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    centeredText: {
        fontSize: 18,
        textAlign: 'center',
    },
    dropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginTop: 5,
      alignSelf: 'stretch',  // Ensures it takes full width of the parent
    },
    dropdownText: {
      fontSize: 18,
      textAlign: 'center',
    },
    dropdownList: {
      width: '100%',  // Full width dropdown
      height: 120,
      borderRadius: 5,
    },
    text: {
          fontSize: 16,
          textAlign: 'center',
    },
});

export default TicketDetailScreen;