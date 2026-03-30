import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';

export const useFCM = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: 'YOUR_VAPID_KEY' // You need to get this from Firebase Console
          });
          console.log('FCM Token:', token);
          // Send token to your server to store it
        }
      } catch (error) {
        console.error('Error requesting FCM permission:', error);
      }
    };

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Handle foreground message
    });

    return () => unsubscribe();
  }, []);
};
