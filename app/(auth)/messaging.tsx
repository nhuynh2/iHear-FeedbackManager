// message.tsx
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { ROUTES } from '../../components/navigation/routes.tsx'; // centralized routes

// Function to request notification permission
export async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted.');
    return true;
  } else {
    console.log('Notification permission denied.');
    return false;
  }
}

// Function to retrieve and store the device token
export async function getAndStoreDeviceToken() {
  const user = auth().currentUser;
  if (!user) return;

  // Request permission if not already granted
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return;

  try {
      // Reference to the user document in Firestore
      const userRef = firestore().collection('users').doc(user.uid);
      await userRef.set({ tokens: [] }, { merge: true });
      // Register the device with FCM
        await messaging().registerDeviceForRemoteMessages();
    // Retrieve the device token
    const token = await messaging().getToken();
    // Add token to the tokens array in Firestore
    await userRef.update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });

    // Listen for token refresh and update Firestore with new token
    messaging().onTokenRefresh(async (newToken) => {
      await userRef.update({
        tokens: firestore.FieldValue.arrayUnion(newToken),
      });
      console.log('Token refreshed and updated in Firestore:', newToken);
    });

    console.log('Token stored in Firestore:', token);
  } catch (error) {
    console.error('Error fetching or storing token:', error);
  }
}

export const updateTicketStatus = async (ticketId, status) => {
  try {
    const ticketRef = firestore().collection('tickets').doc(ticketId);
    await ticketRef.update({
      status: status, // 'in-review', 'in-progress', 'resolved'
    });
    console.log(`Ticket ${ticketId} status updated to: ${status}`);
  } catch (error) {
    console.error("Error updating ticket status: ", error);
  }
};

// Listen for ticket status changes in Firestore
export const listenForTicketStatusChanges = () => {
  firestore()
    .collection('tickets')
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach(async (documentSnapshot) => {
        const ticket = documentSnapshot.data();
        const ticketId = documentSnapshot.id;

        // If ticket status is 'in-progress' or 'in-review', trigger notification
        if (ticket.status === 'in-progress' || ticket.status === 'in-review') {
          sendNotification(ticketId, 'Good news!', 'Your ticket\'s status has been updated 💖', ticket.recipients);
        }

        // If ticket status is 'resolved', trigger a different notification
        if (ticket.status === 'resolved') {
          sendNotification(ticketId, 'Issue resolved', 'Have a nice day!', ticket.recipients);
        }
      });
    });
};

// Send message from Firebase Cloud Messaging
const sendNotification = async (ticketId, title, body, recipients) => {
  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        ticketId: ticketId,
        status: title.toLowerCase(),  // 'in-review', 'in-progress', 'resolved'
      },
      tokens: recipients,  // An array of FCM tokens
    };

    // Send the message to recipients using FCM
    await messaging().sendMulticast(message);
  } catch (error) {
    console.error("Error sending notification: ", error);
  }
};

// Process the message on user's device
const handleNotification = async (remoteMessage) => {
  const router = useRouter();
  console.log("Notification received:", remoteMessage);

  if (remoteMessage?.foreground) {
    console.log("Foreground Notification:", remoteMessage.notification.body);
    alert(remoteMessage.notification.body);
  } else {
    console.log("Background Notification:", remoteMessage.notification.body);
    // Navigate user to the ticket details page when notification is clicked
    router.push(ROUTES.TICKET_DETAILS);
  }
};

// Set up the handlers
export const setupNotificationListeners = () => {
  // Foreground notification handler
  messaging().onMessage(async (remoteMessage) => {
    await handleNotification(remoteMessage);
  });

  // Background notification handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    await handleNotification(remoteMessage);
  });
};