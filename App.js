import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, Alert, Modal} from 'react-native';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

PushNotification.configure({
  onNotification: function (notification) {
    if (notification.title !== '') {
      let notificationObj = {
        title: notification.title,
        message: notification.message,
      };
      storeData(notificationObj);
    } else {
      Alert.alert('Notification Alert', 'There is a no any notification', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  },

  onAction: function (notification) {
    switch (notification.action) {
      case 'Yes':
        Alert.alert('Action Alert', "This is push notification 'Yes' action", [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        break;
      case 'No':
        Alert.alert('Action Alert', "This is push notification 'No' action", [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        break;
      default:
        null;
    }
  },

  requestPermissions: Platform.OS === 'ios',
});

const storeData = async notificationObj => {
  try {
    await AsyncStorage.setItem(
      'NotificationPayload',
      JSON.stringify(notificationObj),
    );
  } catch (error) {
    console.log(error);
  }
};

const App = () => {
  const [notificationPayload, setNotificationPayload] = useState([]);
  
  useEffect(() => {
    createChannels();
    getData();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  PushNotification.cancelAllLocalNotifications();

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Notification',
      message: 'Quick Notification',
      bigText: 'This is big text',
      color: 'red',
      largeIconUrl:
        'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
      /* actions: ['ReplyInput'],
      reply_placeholder_text: 'Write your response...', // (required)
      reply_button_text: 'Reply',  */
      actions: ['Yes', 'No'],
      invokeApp: false,
    });
  };

  const ShedulehandleNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: ' Schedule Notification',
      message: 'Schedule Notification Message',
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle: true,
      repeatTime: 1,
      largeIconUrl:
        'https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Messages-512.png',
      actions: ['Yes', 'No'],
    });
  };

  const getData = async () => {
    try {
      console.log("working");
      const value = await AsyncStorage.getItem('NotificationPayload');
      const convertedValue = JSON.parse(value);
      if (value !== null) {
        setNotificationPayload(convertedValue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('NotificationPayload');
    } catch (e) {
      console.log(e);
    }

    console.log('Done.');
  };

  return (
    <View style={styles.Container}>
      <Text>Get Push Notification</Text>
      <View style={styles.button}>
        <Button title="click me" onPress={handleNotification} />
      </View>
      <Text>Get Shedule Push Notification</Text>
      <View style={styles.button}>
        <Button title="click me" onPress={ShedulehandleNotification} />
      </View>
       <View style={styles.button}>
        <Button title="Get data" onPress={getData} />
      </View> 
      <View style={styles.button}>
        <Button title="Clear" onPress={removeValue} />
      </View>
    
        <View>
          <Text>{notificationPayload.title}</Text>
          <Text>{notificationPayload.message}</Text>
         
        </View>
     

    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 20,
  },
});

export default App;
