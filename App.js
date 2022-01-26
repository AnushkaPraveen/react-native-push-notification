import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, Alert, Modal} from 'react-native';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
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
          Alert.alert(
            'Action Alert',
            "This is push notification 'Yes' action",
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
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
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const [notificationPayload, setNotificationPayload] = useState([]);

  useEffect(() => {
    createChannels();
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
      title: 'App Notification',
      message: 'This is test message for notification',
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
    /* getData(); */
  };

  const ShedulehandleNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: ' Schedule Notification',
      message: 'This is test message for Schedule Notification Message',
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
      setNotificationPayload([]);
    } catch (e) {
      console.log(e);
    }

    console.log('Done.');
  };

  return (
    <View style={styles.Container}>{notificationPayload.length!==0?( <View style={styles.notificationBody}>
      <Text style={styles.NotificationTitle}>
        {notificationPayload.title}
      </Text>
      <Text>{notificationPayload.message}</Text>
      <View style={styles.button}>
        <Button title="Clear" onPress={removeValue} />
      </View>
    </View>): null}
     
      <Text style={styles.mainText}>Get Push Notification</Text>
      <View style={styles.button}>
        <Button title="click me" onPress={handleNotification} />
      </View>
      <Text style={styles.mainText}>Get Shedule Push Notification</Text>
      <View style={styles.button}>
        <Button title="click me" onPress={ShedulehandleNotification} />
      </View>
      {/* <View style={styles.button}>
        <Button title="Get data" onPress={getData} />
      </View> */}
      
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
  NotificationTitle: {
    fontSize: 20,
  },
  notificationBody:{
    alignItems:'center',
    borderWidth:2,
    borderColor:'black',
    marginBottom:60,
    padding:30,
    color:'black',
  },
  mainText:{
    fontSize:28,
    fontWeight:'bold'
  }
});

export default App;
