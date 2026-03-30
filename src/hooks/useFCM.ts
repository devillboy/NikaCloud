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
            vapidKey: 'BI41M6mfcdqpZpz5abrS9QK1vgHPBNffqCYX1jI28ZQeFb2sglh8iYh5W4fjhVm6Jm_ZGLUdm3KRGR3ommXTQGA'
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
