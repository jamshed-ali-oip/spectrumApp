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
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import {themeBlue, themeDarkBlue} from '../assets/colors/colors';
import * as actions from '../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation, userReducer, loginRequest}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const _onPressLoginButton = async () => {
    setIsLoading(true);
    await loginRequest({email, password}, onLoginFailed);
  };

  const onLoginFailed = () => {
    setIsLoading(false);
  };
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />

      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <Image
                source={require('../assets/images/new-logo.png')}
                style={{
                  marginTop: height * 0.15,
                  marginBottom: height * 0.05,
                  width: width * 0.4,
                  height: height * 0.2,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#565B66"
                style={[
                  styles.inputfield,
                  {marginBottom: width * 0.04, marginTop: height * 0.1},
                ]}
                onChangeText={e => {
                  if (e == ' ' || isLoading) {
                    return;
                  }
                  setEmail(e);
                }}
                value={email}
              />

              {/* <TextInput
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#565B66"
                style={[styles.inputfield, {marginBottom: width * 0.04}]}
                onChangeText={e => {
                  if (e == ' ' || isLoading) {
                    return;
                  }
                  setPassword(e);
                }}
                value={password}
              /> */}
              <View style={styles.passwordViewContainer}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#565B66"
                  style={[
                    styles.inputfieldPassword,
                    {fontSize: showPassword ? width * 0.04 : width * 0.04},
                  ]}
                  value={password}
                  onChangeText={e => {
                    if (e == ' ' || isLoading) {
                      return;
                    }
                    setPassword(e);
                  }}
                  secureTextEntry={showPassword}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}>
                  <Icon
                    name={showPassword ? 'eye-slash' : 'eye'}
                    color="grey"
                    style={{
                      fontSize: width * 0.045,
                      marginRight: width * 0.03,
                    }}
                  />
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <View style={styles.loginBtnStyle}>
                  <LottieView
                    speed={1}
                    style={styles.lottieStyle}
                    autoPlay
                    loop
                    source={require('../assets/lottie/color-loader.json')}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => _onPressLoginButton()}
                  style={styles.loginBtnStyle}>
                  <Heading
                    title="LOG IN"
                    passedStyle={styles.loginTextStyle}
                    fontType="semi-bold"
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.8}
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
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    </>
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
    borderRadius: width * 0.5,
    paddingLeft: 20,
    height: Platform.OS == 'ios' ? height * 0.06 : height * 0.07,
    fontFamily: 'Montserrat-Medium',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputfieldPassword: {
    alignSelf: 'center',
    width: width * 0.8,
    borderBottomLeftRadius: width * 0.5,
    borderTopLeftRadius: width * 0.5,
    paddingLeft: 20,
    height: Platform.OS == 'ios' ? height * 0.06 : height * 0.07,
    fontFamily: 'Montserrat-Medium',
  },
  loginBtnStyle: {
    backgroundColor: themeBlue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: Platform.OS == 'ios' ? height * 0.06 : height * 0.07,
    marginTop: height * 0.02,
  },
  passwordViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.5,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: width * 0.04,
    elevation: 5,
  },
  loginTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    alignSelf: 'center',
  },
  lottieStyle: {
    height: height * 0.1,
    // marginTop: height * 0.098,
    // marginLeft: width * 0.07,
  },
});
