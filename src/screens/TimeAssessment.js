import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import RNSpeedometer from 'react-native-speedometer';
import Heading from '../components/Heading';
import {Timer, Countdown} from 'react-native-element-timer';
import {
  themeBlue,
  themeDarkBlue,
  themeFerozi,
  themeGreen,
  themeLightBlue,
  themeLightPurple,
  themePurple,
  themeRed,
  themeYellow,
} from '../assets/colors/colors';
// import WheelOfFortune from 'react-native-wheel-of-fortune';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const TimeAssessment = ({
  navigation,
  route,
  userReducer,
  getColors,
  submitResult,
  getGameInfo,
}) => {
  const ITEM = route.params.item;
  const CHILD_DATA = route.params.childData;
  const GROUP_DATA = route.params.groupData;
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [child, setChild] = useState(null);
  const accessToken = userReducer?.accessToken;
  const [meterValue, setMeterValue] = useState(0);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [assessmentScoreid, setAssessmentScoreId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showTextField, setShowTextField] = useState(false);
  const [wheelState, setWheelState] = useState({
    winnerValue: null,
    winnerIndex: null,
    started: false,
  });
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const participants = ['', '', '', '', '', '', '', '', ''];
  const [secs, setSecs] = useState(0);

  const apiData = {
    assessment_score_id: assessmentScoreid,
    participant_id: CHILD_DATA?.id,
    Score: score,
    grade_id: CHILD_DATA?.grades?.id,
    assessment_id: ITEM?.id,
    Duration: secs,
  };

  const wheelOptions = {
    rewards: participants,
    knobSize: 30,
    borderWidth: 5,
    borderColor: themeDarkBlue,
    innerRadius: 10,
    width: 50,
    colors: userReducer?.colors?.map(ele => ele?.WebColor),
    // colors: [
    //   ,
    //   themeDarkBlue,
    //   themeLightBlue,
    //   themeBlue,
    //   themeFerozi,
    //   themeLightPurple,
    //   themePurple,
    //   themeGreen,
    //   themeRed,
    //   themeYellow,
    // ],
    height: 50,
    duration: 1000,
    backgroundColor: 'transparent',
    textAngle: 'horizontal',
    knobSource: require('../assets/images/knob.png'),
    getWinner: (value, index) => {
      setWheelState(prev => {
        return {...prev, winnerValue: value, winnerIndex: index};
      });
    },
    onRef: ref => setChild(ref),
  };

  // console.log(JSON.stringify(CHILD_DATA,null,2), '----');
  const _onButtonPress = () => {
    // if (!wheelState?.started) {
    //   setWheelState(() => {
    //     return {winnerIndex: null};
    //   });
    //   child._tryAgain();
    // } else {
    //   setWheelState(prev => {
    //     return {...prev, started: true};
    //   });
    //   child._onPress();
    // }
  };

  useEffect(() => {
    console.log('Miliseconds: ', secs * 1000, '----', 'Seconds: ', secs);
  }, [secs]);

  const findScoreNow = () => {
    let color_id = userReducer?.gameInfo[0]?.color_id;
    for (let i = 0; i <= userReducer?.gameInfo?.length; i++) {
      if (
        userReducer?.gameInfo[i]?.MinValue <= secs &&
        userReducer?.gameInfo[i]?.MaxValue >= secs
      ) {
        color_id = userReducer?.gameInfo[i]?.color_id;
        setAssessmentScoreId(userReducer?.gameInfo[i]?.id);
      }
    }
    // if (color_id === 1) {
    //   setMeterValue(5);
    // } else if (color_id === 2) {
    //   setMeterValue(15);
    // } else if (color_id === 3) {
    //   setMeterValue(25);
    // } else if (color_id === 4) {
    //   setMeterValue(35);
    // } else if (color_id === 5) {
    //   setMeterValue(45);
    // } else if (color_id === 6) {
    //   setMeterValue(55);
    // } else if (color_id === 7) {
    //   setMeterValue(65);
    // } else if (color_id === 8) {
    //   setMeterValue(75);
    // } else if (color_id === 9) {
    //   setMeterValue(85);
    // } else {
    //   setMeterValue(95);
    // }
  };

  useEffect(() => {
    getAllColors();
    setMeterValue(0);
    setShowTextField(false);
  }, []);

  useEffect(() => {
    setColors(userReducer?.colors);
  }, [userReducer?.colors]);

  const getAllColors = async () => {
    setIsLoading(true);
    await getColors(accessToken);
    await getGameInfo(accessToken);
    setIsLoading(false);
  };

  const _onPressSave = async () => {
    setIsLoading(true);
    console.log(JSON.stringify(apiData, null, 2));
    await submitResult(apiData, accessToken, onSuccess);
    setIsLoading(false);
  };

  const onSuccess = () => {
    navigation.navigate('home');
  };
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {isLoading || colors?.length === 0 ? (
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/color-loader.json')}
          />
        ) : (
          <ScrollView>
            {/* Heading  */}
            <View style={styles.headingView}>
              <Heading
                title={ITEM?.Name}
                passedStyle={styles.headingStyles}
                fontType="semi-bold"
              />
            </View>

            {/* Image Logo  */}
            <Image
              resizeMode="contain"
              source={require('../assets/images/new-logo.png')}
              style={styles.logoStyles}
            />

            {/* Grade  */}
            <View style={styles.headingStyle2View}>
              <Heading
                title={`${GROUP_DATA?.Name} - ${GROUP_DATA?.Abbr}`}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View>

            {/* Child Name  */}
            <View style={styles.headingStyle2View}>
              <Heading
                title={`${CHILD_DATA?.Firstname} ${CHILD_DATA?.Lastname}`}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View>
            {/* <WheelOfFortune
              style={{width: 100, height: 100}}
              options={wheelOptions}
              getWinner={(value, index) => {
                setWheelState(prev => {
                  return {...prev, winnerValue: value, winnerIndex: index};
                });
              }}
            /> */}

            {/* Meter and Button View Container  */}
            <View style={styles.configurations}>
              {/* Buttons and Timers View  */}
              <View style={styles.innerLeftConfigView}>
                {/* Start Button  */}
                {!hasTimerStarted ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (!hasTimerStarted) {
                        timerRef.current.start();
                        setHasTimerStarted(true);
                        setSecs(0);
                        setMeterValue(0);
                        setShowTextField(false);
                      }
                    }}
                    style={styles.startBtnContainer}>
                    <Heading
                      title={'START'}
                      passedStyle={styles.startBtnStyle}
                      fontType="semi-bold"
                    />
                  </TouchableOpacity>
                ) : (
                  // Stop Button
                  <TouchableOpacity
                    onPress={() => {
                      timerRef.current.pause();
                      setHasTimerStarted(false);
                      findScoreNow();
                      setShowTextField(true);
                    }}
                    style={styles.stopBtnStyle}>
                    <Heading
                      title={'STOP'}
                      passedStyle={styles.startBtnStyle}
                      fontType="semi-bold"
                    />
                  </TouchableOpacity>
                )}

                {/* Timer  */}
                <Heading
                  title="Timer"
                  passedStyle={{
                    color: 'white',
                    fontSize: width * 0.07,
                    marginLeft: width * 0.1,
                    marginTop: height * 0.03,
                  }}
                  fontType="bold"
                />
                <Timer
                  initialSeconds={0}
                  ref={timerRef}
                  style={{
                    marginLeft: width * 0.13,
                  }}
                  textStyle={{
                    fontSize: width * 0.08,
                    color: 'white',
                    fontFamily: 'Montserrat-Bold',
                  }}
                  onTimes={e => {
                    setSecs(e);
                  }}
                  formatTime={'hh:mm:ss'}
                  onEnd={e => {}}
                />
              </View>

              {/* Game Meter  */}
              <RNSpeedometer
                wrapperStyle={{marginRight: width * 0.05}}
                value={parseInt(meterValue)}
                size={200}
                labelStyle={{color: 'transparent'}}
                labelNoteStyle={{color: 'transparent'}}
                labels={
                  colors?.length > 0
                    ? [
                        {
                          name: 'Too Slow',
                          labelColor: colors[7]?.WebColor || 'red',
                          activeBarColor: colors[7]?.WebColor || 'red',
                        },
                        {
                          name: 'Very Slow',
                          labelColor: colors[6]?.WebColor || 'orange',
                          activeBarColor: colors[6]?.WebColor || 'orange',
                        },
                        {
                          name: 'Slow',
                          labelColor: colors[5]?.WebColor || 'yellow',
                          activeBarColor: colors[5]?.WebColor || 'yellow',
                        },
                        {
                          name: 'Normal',
                          labelColor: colors[4]?.WebColor || 'lightgreen',
                          activeBarColor: colors[4]?.WebColor || 'lightgreen',
                        },
                        {
                          name: 'Fast',
                          labelColor: colors[3]?.WebColor || 'darkgreen',
                          activeBarColor: colors[3]?.WebColor || 'darkgreen',
                        },
                        {
                          name: 'Unbelievably Fast',
                          labelColor: colors[2]?.WebColor || 'blue',
                          activeBarColor: colors[2]?.WebColor || 'blue',
                        },
                        {
                          name: 'Unsastifactory',
                          labelColor: colors[1]?.WebColor || 'darkblue',
                          activeBarColor: colors[1]?.WebColor || 'darkblue',
                        },
                        {
                          name: 'None',
                          labelColor: colors[0]?.WebColor || 'purple',
                          activeBarColor: colors[0]?.WebColor || 'purple',
                        },
                      ]
                    : [
                        {
                          name: 'Too Slow',
                          labelColor: 'red',
                          activeBarColor: 'red',
                        },
                        {
                          name: 'Very Slow',
                          labelColor: 'orange',
                          activeBarColor: 'orange',
                        },
                        {
                          name: 'Slow',
                          labelColor: 'yellow',
                          activeBarColor: 'yellow',
                        },
                        {
                          name: 'Normal',
                          labelColor: 'lightgreen',
                          activeBarColor: 'lightgreen',
                        },
                        {
                          name: 'Fast',
                          labelColor: 'darkgreen',
                          activeBarColor: 'darkgreen',
                        },
                        {
                          name: 'Unbelievably Fast',
                          labelColor: 'blue',
                          activeBarColor: 'blue',
                        },
                        {
                          name: 'Unsastifactory',
                          labelColor: 'darkblue',
                          activeBarColor: 'darkblue',
                        },
                        {
                          name: 'None',
                          labelColor: 'purple',
                          activeBarColor: 'purple',
                        },
                      ]
                }
              />
            </View>
            {/* <TextInput
              placeholder="Speedometer Value"
              style={{
                borderBottomWidth: 0.3,
                borderBottomColor: 'black',
                height: height * 0.08,
                fontSize: 16,
                backgroundColor: 'white',
                marginVertical: 50,
                marginHorizontal: 20,
              }}
              value={meterValue}
              onChangeText={e => setMeterValue(parseInt(e))}
            /> */}

            {/* {!wheelState.started && ( */}

            {/* ) : (
            <Heading
              title="00:00"
              passedStyle={{
                color: 'white',
                fontSize: width * 0.07,
                marginLeft: width * 0.1,
                marginTop: height * 0.03,
              }}
              fontType="bold"
            />
          )} */}
            {/* <Countdown
            ref={countdownRef}
            style={styles.timer}
            textStyle={styles.timerText}
            initialSeconds={5}
            onTimes={e => {}}
            onPause={e => {}}
            onEnd={e => {}}
          /> */}
            {showTextField && (
              <TextInput
                value={score}
                // value={parseInt(score)}
                keyboardType="numeric"
                textContentType="numeric"
                placeholder={'Enter Score 0-100'}
                placeholderTextColor={'grey'}
                style={styles.scoreFieldStyle}
                onChangeText={text => {
                  // if (parseInt(text) <= 100) {
                    setScore(text);
                    setMeterValue(text);
                  // }
                }}
              />
            )}

            {showTextField && (
              <TouchableOpacity
                onPress={_onPressSave}
                style={styles.saveBtnStyle}>
                <Heading
                  title={'SAVE'}
                  passedStyle={styles.startBtnStyle}
                  fontType="semi-bold"
                />
              </TouchableOpacity>
            )}
            <View style={{paddingBottom: 50}} />
          </ScrollView>
        )}
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(TimeAssessment);

const styles = StyleSheet.create({
  scoreFieldStyle: {
    backgroundColor: 'white',
    width: width * 0.5,
    height: height * 0.06,
    paddingHorizontal: width * 0.03,
    marginLeft: width * 0.05,
    // paddingBottom: height * 0.007,
    marginVertical: height * 0.02,
    fontFamily: 'Montserrat-Medium',
    borderRadius: width * 0.1,
    fontSize: width * 0.047,
  },
  logoStyles: {
    marginBottom: height * 0.04,
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
  },
  innerLeftConfigView: {
    flexDirection: 'column',
  },
  configurations: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stopBtnStyle: {
    marginLeft: width * 0.05,
    backgroundColor: themeRed,
    borderRadius: width * 0.5,
    width: width * 0.3,
    justifyContent: 'center',
    marginTop: height * 0.1,
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  startBtnStyle: {
    color: 'white',

    fontSize: width * 0.04,
    paddingVertical: height * 0.02,

    textAlign: 'center',
  },
  timer: {
    marginVertical: 10,
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
  saveBtnStyle: {
    marginLeft: width * 0.05,
    backgroundColor: themeFerozi,
    borderRadius: width * 0.5,
    marginTop: width * 0.03,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtnContainer: {
    marginTop: height * 0.1,
    marginLeft: width * 0.05,
    backgroundColor: themeGreen,
    borderRadius: width * 0.5,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  timerText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
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
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
