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
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
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
import WheelOfFortune from 'react-native-wheel-of-fortune';
import {connect} from 'react-redux';
import * as actions from '../store/actions';

const {width, height} = Dimensions.get('window');

const TimeAssessment = ({navigation, route, userReducer, getColors}) => {
  const ITEM = route.params.item;
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const GRADE = route.params.grade;
  const CHILD_NAME = route.params.childName;
  const [child, setChild] = useState(null);
  const accessToken = userReducer?.accessToken;
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [wheelState, setWheelState] = useState({
    winnerValue: null,
    winnerIndex: null,
    started: false,
  });
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const participants = ['', '', '', '', '', '', '', '', ''];
  const [secs, setSecs] = useState(0);

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
    duration: 4000,
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

  const _onButtonPress = () => {
    if (!wheelState?.started) {
      setWheelState(() => {
        return {winnerIndex: null};
      });
      child._tryAgain();
    } else {
      setWheelState(prev => {
        return {...prev, started: true};
      });
      child._onPress();
    }
  };

  useEffect(() => {
    console.log(secs * 1000, '----');
    if (hasTimerStarted) {
      if (4000 === secs * 1000) {
        timerRef.current.pause();
        setSecs(0);
      }
    }
  }, [secs]);

  useEffect(() => {
    getAllColors();
  }, []);

  useEffect(() => {
    setColors(userReducer?.colors);
  }, [userReducer?.colors]);

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
        <ScrollView>
          <Heading
            title={ITEM?.Name}
            passedStyle={styles.headingStyles}
            fontType="semi-bold"
          />

          <Image
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={{
              marginBottom: height * 0.04,
              width: width * 0.4,
              height: height * 0.2,
              alignSelf: 'center',
            }}
          />

          {/* Grade  */}
          <Heading
            title={GRADE}
            passedStyle={styles.headingStyles2}
            fontType="regular"
          />

          {/* Child Name  */}
          <Heading
            title={CHILD_NAME}
            passedStyle={styles.headingStyles2}
            fontType="regular"
          />

          <WheelOfFortune
            style={{width: 100, height: 100}}
            //   wheelOptions={wheelOptions}
            options={wheelOptions}
            getWinner={(value, index) => {
              setWheelState(prev => {
                return {...prev, winnerValue: value, winnerIndex: index};
              });
            }}
          />

          {/* {!wheelState.started && ( */}
          <TouchableOpacity
            onPress={() => {
              timerRef.current.start();
              setHasTimerStarted(true);
              _onButtonPress();
            }}
            style={{marginTop: height * 0.1, marginLeft: width * 0.05}}>
            <Heading
              title={'START'}
              passedStyle={{
                width: width * 0.3,
                color: 'white',
                backgroundColor: themeGreen,
                fontSize: width * 0.04,
                borderRadius: 25,
                paddingVertical: height * 0.02,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                // marginTop: height * 0.02,
                marginVertical: height * 0.02,
                // marginBottom: height * 0.1,
              }}
              fontType="semi-bold"
            />
          </TouchableOpacity>
          {/* )} */}
          <TouchableOpacity
            onPress={() => {
              timerRef.current.pause();
              setHasTimerStarted(false);
              setSecs;
            }}
            style={{marginTop: height * 0.02, marginLeft: width * 0.05}}>
            <Heading
              title={'STOP'}
              passedStyle={{
                width: width * 0.3,
                color: 'white',
                backgroundColor: themeRed,
                fontSize: width * 0.04,
                borderRadius: 25,
                paddingVertical: height * 0.02,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                // marginTop: height * 0.02,
                //
                // marginBottom: height * 0.1,
              }}
              fontType="semi-bold"
            />
          </TouchableOpacity>

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

          {/* {hasTimerStarted ? ( */}
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
              console.log(e);
              setSecs(e);
            }}
            formatTime={'hh:mm:ss'}
            onEnd={e => {}}
          />
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

          <TouchableOpacity
            onPress={() => {
              // timerRef.current.pause();
              navigation.navigate('GradingSystem');
            }}
            style={{marginTop: height * 0.02, marginLeft: width * 0.05}}>
            <Heading
              title={'SAVE'}
              passedStyle={{
                width: width * 0.3,
                color: 'white',
                backgroundColor: themeFerozi,
                fontSize: width * 0.04,
                borderRadius: 25,
                paddingVertical: height * 0.02,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                // marginTop: height * 0.02,
                //
                // marginBottom: height * 0.1,
              }}
              fontType="semi-bold"
            />
          </TouchableOpacity>
          <View style={{paddingBottom: 50}} />
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(TimeAssessment);

const styles = StyleSheet.create({
  timer: {
    marginVertical: 10,
  },
  timerText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  headingStyles: {
    width: width * 0.6,
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    borderRadius: 25,
    paddingVertical: height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
  },

  headingStyles2: {
    color: 'white',
    backgroundColor: themeDarkBlue,
    textAlign: 'center',
    borderRadius: 25,
    width: width * 0.9,
    alignSelf: 'center',
    textTransform: 'capitalize',
    fontSize: width * 0.045,
    marginTop: height * 0.02,
    paddingVertical: height * 0.02,
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
