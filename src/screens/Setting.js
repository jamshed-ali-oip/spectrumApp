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
import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import { themeBlue, themeDarkBlue } from '../assets/colors/colors';
import * as actions from '../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { showMessage } from 'react-native-flash-message';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');

const Setting = ({ navigation, userReducer, SaveDeviceCount, logo, getDevicesInfo }) => {
  const [counts, setCounts] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [data,setData]=useState({})


  useEffect(() => {
    setLoading(true)
    getDevicesInfo(userReducer.accessToken)
      .then((res) => {
        // console.log("dd",res?.data?.data?.number_of_devices_login?.toString())
        setCounts(res?.data?.data?.number_of_devices_login?.toString())
        setLoading(false)
      })
  }, [])

  const onSave = async () => {
    if (counts > 0 && ((counts%1)==0)) {
      setIsLoading(true)
      SaveDeviceCount(counts, userReducer.accessToken).then((res) => {
        showMessage({
          message: res.data?.message,
          type: 'success',
        });
        setIsLoading(false)
      }).catch(err => {
        console.log(err.response?.data)
        setIsLoading(false)
      })
    } else {
      showMessage({
        message: 'Please enter valid no',
        type: 'danger',
      });
    }
  };

  const onLoginFailed = () => {
    setIsLoading(false);
  };

  if (loading) {
    return (
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <LottieView
          speed={1}
          // style={styles.lottieStyle}
          autoPlay
          loop
          source={require('../assets/lottie/color-loader.json')}
        />
      </ImageBackground>)
  }
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />

      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
            <Text style={{color:'white',marginLeft:responsiveWidth(6),marginTop:responsiveHeight(3)}}>No of Devices</Text>
              <TextInput
                placeholder="No of Devices"
                placeholderTextColor="#565B66"
                style={[
                  styles.inputfield,
                  { marginBottom: width * 0.04, marginTop: responsiveFontSize(1), color: 'black' },
                ]}
                keyboardType="numeric"
                onChangeText={e => {
                  if (e == ' ' || isLoading) {
                    return;
                  }
                  setCounts(e);
                }}
                value={counts}
              />
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
                  onPress={() => onSave()}
                  style={styles.loginBtnStyle}>
                  <Heading
                    title="Save"
                    passedStyle={styles.loginTextStyle}
                    fontType="semi-bold"
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer, logo }) => {
  return { userReducer, logo };
};
export default connect(mapStateToProps, actions)(Setting);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    // height: height,
  },
  inputfield: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.5,
    paddingLeft: 20,
    height: Platform.OS == 'ios' ? height * 0.065 : height * 0.07,
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
    height: Platform.OS == 'ios' ? height * 0.065 : height * 0.07,
    fontFamily: 'Montserrat-Medium',
  },
  loginBtnStyle: {
    backgroundColor: themeBlue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: Platform.OS == 'ios' ? height * 0.065 : height * 0.07,
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
