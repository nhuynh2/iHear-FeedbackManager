import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';

// Import mock ticket data
import ticketData from '../../assets/data/ticketdetail.json';

type TicketProps = {
    id: string;
    topic: string;
    category: string;
    location: string;
    description: string;
    urgency: number;
    photos: string[];
};

const TicketDetailScreen = () => {
    const [tickets, setTickets] = useState<TicketProps[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showEmergencyLevel, setShowEmergencyLevel] = useState(true)
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    useEffect(() => {
        // Load ticket data
        setTickets(ticketData);
    }, []);

    const currentTicket = tickets[currentIndex];

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

    return (

        <View style={styles.container}>
            <Text style={styles.title}>TICKET DETAIL</Text>

            {currentTicket && (
                <>
                    {/* Topic */}
                    <View style={styles.detailContainer}>
                        <Text style={styles.label}>Topic:</Text>
                        <Text style={styles.value}>{currentTicket.topic}</Text>
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
                            {currentTicket.description}
                        </Text>
                    </View>

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
                                                level === currentTicket.urgency ? '#FFD700' : '#E0E0E0',
                                        },
                                    ]}
                                >
                                    <Text style={styles.urgencyText}>{level}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Photo Section */}
                    <View style={[styles.photoContainer, { justifyContent: currentTicket.photos.length === 1 ? 'center' : 'space-around' }]}>
                        {currentTicket.photos.map((photo, index) => (
                            <TouchableOpacity key={index} onPress={() => openModal(photo)}>
                                <Image source={{ uri: photo }} style={styles.photo} />
                            </TouchableOpacity>
                        ))}
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

                    {/* Navigation Buttons */}
                    <View style={styles.navigationContainer}>
                        <TouchableOpacity
                            onPress={handlePrevious}
                            disabled={currentIndex === 0}
                            style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
                        >
                            <Text style={styles.navButtonText}>Previous</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleNext}
                            disabled={currentIndex === tickets.length - 1}
                            style={[
                                styles.navButton,
                                currentIndex === tickets.length - 1 && styles.disabledButton,
                            ]}
                        >
                            <Text style={styles.navButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        width: '20%',
        alignSelf: 'center',
        marginRight: 125,
    },
    navButton: {
        width: 100,
        paddingVertical: 10,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#D3D3D3',
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TicketDetailScreen;
