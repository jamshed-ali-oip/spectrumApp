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
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import {themeBlue, themeDarkBlue} from '../assets/colors/colors';
import * as actions from '../store/actions';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation, userReducer, loginRequest}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const _onPressLoginButton = () => {
    loginRequest({email, password});
  };
  return (
    <View>
      <StatusBar backgroundColor={themeDarkBlue} />

      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <Image
              source={require('../assets/images/logo.png')}
              style={{
                marginTop: height * 0.15,
                marginBottom: height * 0.05,
                width: width * 0.4,
                height: height * 0.2,
                alignSelf: 'center',
              }}
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#565B66"
              style={[
                styles.inputfield,
                {marginBottom: width * 0.04, marginTop: height * 0.1},
              ]}
              onChangeText={e => {
                if (e == ' ') {
                  return;
                }
                setEmail(e);
              }}
              value={email}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#565B66"
              style={[styles.inputfield, {marginBottom: width * 0.04}]}
              onChangeText={e => {
                if (e == ' ') {
                  return;
                }
                setPassword(e);
              }}
              value={password}
            />

            <TouchableOpacity
              onPress={() => _onPressLoginButton()}
              style={{
                backgroundColor: themeBlue,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: width * 0.9,
                height: height * 0.07,
                marginTop: height * 0.02,
              }}>
              <Heading
                title="LOG IN"
                passedStyle={{
                  color: 'white',
                  fontSize: width * 0.04,
                  alignSelf: 'center',
                }}
                fontType="semi-bold"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{marginTop: height * 0.03}}>
              <Heading
                title="Forgot Password"
                passedStyle={{
                  color: 'white',
                  fontSize: width * 0.037,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  inputfield: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: 25,
    paddingLeft: 20,
    height: height * 0.07,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
