import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import PushNotification from 'react-native-push-notification';

const App = () => {
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
      title: 'Notification',
      message: 'Quick Notification',
      bigText: 'This is big text',
      color: 'red',
      largeIconUrl:
        'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
    });

    /* PushNotification.localNotificationSchedule({
      channelId:"test-channel",
      title:"Schedule Notification",
      message:"It notification preview in after 10 sec click button",
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle:true, 
    });*/
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
    });
  };

  return (
    <View style={styles.Container}>
      <Text>Get Push Notification</Text>
      <View style={styles.button}>
        <Button
        
          title="click me"
          onPress={handleNotification}
        />
      </View>
      <View style={styles.button}>
        <Button title="click me" onPress={ShedulehandleNotification} />
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
