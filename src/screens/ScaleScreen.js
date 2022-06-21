import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Heading from '../components/Heading';
import * as actions from '../store/actions';
import {
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
} from '../assets/colors/colors';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const ScaleScreen = ({navigation, route, getColors, userReducer}) => {
  const accessToken = userReducer?.accessToken;
  const [isLoading, setIsLoading] = useState(false);

  const RESULT = 25;
  const space1 = height * 0.01;
  const space2 = height * 0.045;
  const space3 = height * 0.08;
  const space4 = height * 0.105;
  const space5 = height * 0.14;
  const space6 = height * 0.175;
  const space7 = height * 0.21;
  const space8 = height * 0.245;
  const ans =
    RESULT == 40
      ? space1
      : RESULT == 35
      ? space2
      : RESULT == 30
      ? space3
      : RESULT == 25
      ? space4
      : RESULT == 20
      ? space5
      : RESULT == 15
      ? space6
      : RESULT == 10
      ? space7
      : RESULT == 5
      ? space8
      : 0;

  useEffect(() => {
    getAllColors();
  }, []);

  const getAllColors = async () => {
    setIsLoading(true);
    await getColors(accessToken);
    setIsLoading(false);
  };

  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {isLoading ? (
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/color-loader.json')}
          />
        ) : (
          <ScrollView>
            <View style={styles.headingView}>
              <Heading
                title={`LONG JUMP`}
                passedStyle={styles.headingStyles}
                fontType="semi-bold"
              />
            </View>
            {/* </View> */}
            <Image
              resizeMode="contain"
              source={require('../assets/images/new-logo.png')}
              style={styles.bgimage}
            />

            {/* <TouchableOpacity style={styles.Button}>
            <Text style={styles.Text}>Grade-6 Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.Text}>Lalit Beahan</Text>
          </TouchableOpacity> */}

            {/* Grade  */}
            <View style={styles.headingStyle2View}>
              <Heading
                title={'Grade-6 Male'}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View>
            {/* Child Name  */}
            <View style={styles.headingStyle2View}>
              <Heading
                title={'Lalit Beahan'}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View>

            <View style={styles.triangleContainer}>
              <View
                style={{
                  alignItems: 'center',
                  borderRightWidth: 6,
                  borderRightColor: 'white',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',

                    justifyContent: 'space-between',

                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}>
                  <Image
                    source={require('../assets/images/1.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.02,
                      height: height * 0.032,
                      width: width * 0.5,
                    }}
                  />

                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      // alignSelf:'flex-start',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    40
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',

                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}>
                  <Image
                    source={require('../assets/images/2.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.055,
                      height: height * 0.032,
                      width: width * 0.43,
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    35
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}>
                  <Image
                    source={require('../assets/images/3.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.082,
                      height: height * 0.032,
                      width: width * 0.37,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    30
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}>
                  <Image
                    source={require('../assets/images/4.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.11,
                      height: height * 0.032,
                      width: width * 0.313,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    25
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}>
                  <Image
                    source={require('../assets/images/5.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.135,
                      height: height * 0.032,
                      width: width * 0.26,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    20
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}>
                  <Image
                    source={require('../assets/images/6.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.165,
                      height: height * 0.032,
                      width: width * 0.205,
                    }}
                  />
                  <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    15
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}>
                  <Image
                    source={require('../assets/images/7.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.19,
                      height: height * 0.032,
                      width: width * 0.15,
                    }}
                  />
                  <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    10
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}>
                  <Image
                    source={require('../assets/images/8.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.22,
                      height: height * 0.05,
                      width: width * 0.09,
                    }}
                  />
                  <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    05
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: width * 0.15,
                  height: height * 0.006,
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  top: ans,
                  backgroundColor: 'white',
                }}
              />
              {/* 0.01, 0.035, 0.06, 0.085,  0.11, 0.135 0.16 , 0.187*/}
            </View>
            <View
              style={{
                marginTop: height * -0.1,
                // position: 'absolute',
                // top: height * 0.6,
                // zIndex: 999,
                // paddingBottom: 20,
              }}>
              <Heading
                title={`31'`}
                passedStyle={{
                  fontSize: width * 0.07,
                  color: 'white',
                  marginLeft: width * 0.15,
                }}
                fontType="semi-bold"
              />
              <View>
                <Image
                  source={require('../assets/images/yellow.png')}
                  style={styles.taskimage}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('GradingSystem');
                }}
                style={styles.savebtn}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {
    userReducer,
  };
};

export default connect(mapStateToProps, actions)(ScaleScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  btnStyle: {
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeLightBlue,
    alignSelf: 'center',
    width: width * 0.41,
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: width * 0.07,
  },
  headingStyles: {
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    paddingVertical: height * 0.01,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headingView: {
    backgroundColor: themeFerozi,
    borderRadius: width * 0.05,
    width: width * 0.55,
    marginBottom: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-SemiBold',
  },
  jumpbtn: {
    width: width * 0.5,
    height: height * 0.05,
    backgroundColor: '#16c4bc',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 100,
    justifyContent: 'center',
  },
  jumpText: {
    textAlign: 'center',
    fontSize: width * 0.042,
    fontWeight: '900',
    color: 'white',
  },
  bgimage: {
    marginBottom: height * 0.02,
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
  },
  Button: {
    width: width * 0.85,
    height: height * 0.06,
    backgroundColor: '#000b2d',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 100,
    justifyContent: 'center',
  },
  Text: {
    textAlign: 'center',
    fontSize: width * 0.042,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 3,
  },
  gradeimage: {
    marginBottom: height * 0.02,
    width: width * 0.07,
    height: height * 0.07,
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  taskimage: {
    height: height * 0.1,
    width: width * 0.2,
    // paddingVertical:20,
    marginLeft: width * 0.09,
    // marginTop: 10,
  },
  savebtn: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#16c4bc',
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
    borderRadius: 100,
    justifyContent: 'center',
    elevation: 5,
    marginBottom: height * 0.1,
  },
  saveText: {
    textAlign: 'center',
    fontSize: width * 0.038,
    fontWeight: '400',
    color: 'white',
  },
  gradeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  triangleContainer: {
    alignSelf: 'center',
    marginTop: height * 0.04,
    marginLeft: width * 0.15,
  },
  headingStyles2: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: width * 0.045,
    paddingVertical: height * 0.02,
  },
  headingStyle2View: {
    width: width * 0.9,
    borderRadius: 25,
    marginTop: height * 0.02,
    backgroundColor: themeDarkBlue,
    alignSelf: 'center',
  },
});
