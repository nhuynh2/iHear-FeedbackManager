import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

// Reads ticket data from json file here
import ticketData from '../../assets/data/ticketdetail.json';

type TicketProps = {
    id: string;
    topic: string;
    category: string;
    location: string;
    description: string;
    status: string;
    photos: string[];
};

const TicketItem = ({ topic, category, location, description, status, photos }: TicketProps) => (
    <View style={styles.ticketContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.header}>Topic: {topic}</Text>
            <Text style={styles.label}>Category: {category}</Text>
            <Text style={styles.label}>Location: {location}</Text>
            <Text style={styles.descriptionLabel}>Description: {description}</Text>
            <Text style={styles.label}>Status: {status}</Text>
        </View>

        {/* Display photos */}
        <View style={styles.photoContainer}>
            {photos.map((photo, index) => (
                <Image key={index} style={styles.photo} source={{ uri: photo }} />
            ))}
        </View>
    </View>
);

const TicketDetailScreen = () => {
    const [tickets, setTickets] = useState<TicketProps[]>([]);

    useEffect(() => {

        setTickets(ticketData);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={tickets}
                renderItem={({ item }) => (
                    <TicketItem
                        topic={item.topic}
                        category={item.category}
                        location={item.location}
                        description={item.description}
                        status={item.status}
                        photos={item.photos}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: 'white',
    },
    ticketContainer: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'orange',
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    textContainer: {
        marginBottom: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'purple',
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginBottom: 4,
    },
    descriptionLabel: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 10,
    },
    photoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    photo: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 5,
    },
});

export default TicketDetailScreen;