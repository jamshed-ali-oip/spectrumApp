import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import Sound from 'react-native-sound';
import {
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import * as actions from '../store/actions';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';

const HomeScreen = ({navigation, logoutRequest, userReducer,sendFCMToken}) => {
  const accessToken = userReducer?.accessToken;
  // console.log("parti",userReducer?.accessToken)
  useEffect(() => {
    // sendFCM();
  }, []);
  const sound = new Sound('beep.mp3');
  const playSound = () => {
    sound.play()
 }

  const sendFCM = () => {
    messaging()
      .getToken()
      .then(fcmtoken => {
        console.log('TOKEN: : : : :  :', fcmtoken);
        const data = {
          id: userReducer?.userData?.id,
          token: fcmtoken,
        };
        sendFCMToken(data, accessToken);
      });
  };
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/new-logo.png')}
          style={styles.logoStyle}
        />

        <Button
          title={'ASSESSMENTS'}
          btnStyle={styles.asssessmentStyle}
          onBtnPress={() => navigation.navigate('assessments')}
          btnTextStyle={styles.textBtnStyle}
          isBgColor={false}
        />

        <Button
          title={'PARTICIPANTS'}
          btnStyle={styles.participantStyle}
          onBtnPress={() => navigation.navigate('participants')}
          btnTextStyle={styles.textBtnStyle}
          isBgColor={false}
        />

        {/* <Button
          title={'RUN AN ASSESSMENT'}
          btnStyle={styles.runAssessmentStyle}
          onBtnPress={() => {
            playSound()
            // navigation.navigate('runAssessment');

          }}
          btnTextStyle={styles.textBtnStyle}
          isBgColor={false}
        /> */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={logoutRequest}
          style={styles.logOutBtnStyle}>
          <Heading
            title={'Log Out'}
            passedStyle={{color: 'white', fontSize: width * 0.045}}
            fontType="semi-bold"
          />
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};
const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  logoStyle: {
    marginTop: height * 0.15,
    marginBottom: height * 0.05,
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
  },
  asssessmentStyle: {
    backgroundColor: themeFerozi,
    height: height * 0.1,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  participantStyle: {
    backgroundColor: themeLightBlue,
    height: height * 0.1,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  runAssessmentStyle: {
    backgroundColor: themePurple,
    height: height * 0.1,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  textBtnStyle: {
    color: 'white',
    fontSize: width * 0.045,
  },
  logOutBtnStyle: {
    backgroundColor: themeDarkBlue,
    paddingHorizontal: width * 0.01,
    width: width * 0.3,
    paddingVertical: height * 0.008,
    borderRadius: width * 0.34,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: width * 0.05,
  },
});
