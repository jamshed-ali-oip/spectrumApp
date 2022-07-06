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
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import {
  themeBlue,
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import * as actions from '../store/actions';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const {width, height} = Dimensions.get('window');

const GradingSystem = ({
  navigation,
  route,
  getColors,
  userReducer,
  getAssessmentDetails,
  getGameInfo,
  submitResult,
}) => {
  const accessToken = userReducer?.accessToken;
  const ITEM = route?.params?.item;
  const GROUP_DATA = route.params.groupData;
  const CHILD_DATA = route.params.childData;
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState('0');
  const [ranges, setRanges] = useState([]);
  const [resultColor, setResultColor] = useState(
    colors[0]?.WebColor || 'black',
  );

  useEffect(() => {
    findResult();
  }, [score]);

  useEffect(() => {
    getAllColors();
  }, []);

  const getAllColors = async () => {
    setIsLoading(true);
    await getGameInfo(accessToken);
    await getColors(accessToken);
    await getAssessmentDetails(ITEM?.id, accessToken);
    setIsLoading(false);
  };

  useEffect(() => {
    setColors(userReducer?.colors);
  }, [userReducer?.colors]);

  useEffect(() => {
    setRanges(userReducer?.assessmentDetails?.assessment_scoring);
  }, [userReducer?.assessmentDetails]);

  const _onPressSave = async () => {
    let color_id = userReducer?.gameInfo[0]?.color_id;
    for (let i = 0; i <= userReducer?.gameInfo?.length; i++) {
      if (
        userReducer?.gameInfo[i]?.MinValue <= score &&
        userReducer?.gameInfo[i]?.MaxValue >= score
      ) {
        color_id = userReducer?.gameInfo[i]?.color_id;
      }
    }
    const apiData = {
      assessment_score_id: color_id,
      participant_id: CHILD_DATA?.id,
      Score: score,
      grade_id: CHILD_DATA?.id,
      assessment_id: ITEM?.id,
      Beep: null,
      group_id: GROUP_DATA?.id,
    };
    setIsLoading(true);
    console.log(JSON.stringify(apiData, null, 2));
    await submitResult(apiData, accessToken, onSuccess);
    setIsLoading(false);
  };

  const onSuccess = () => {
    navigation.navigate('home');
  };

  const findResult = () => {
    if (score > parseInt(ranges[0]?.MaxValue)) {
      setResultColor(colors[0]?.WebColor);
    } else if (score > parseInt(ranges[1]?.MaxValue)) {
      setResultColor(colors[0]?.WebColor);
    } else if (score > parseInt(ranges[2]?.MaxValue)) {
      setResultColor(colors[1]?.WebColor);
    } else if (score > parseInt(ranges[3]?.MaxValue)) {
      setResultColor(colors[2]?.WebColor);
    } else if (score > parseInt(ranges[4]?.MaxValue)) {
      setResultColor(colors[3]?.WebColor);
    } else if (score > parseInt(ranges[5]?.MaxValue)) {
      setResultColor(colors[4]?.WebColor);
    } else if (score > parseInt(ranges[6]?.MaxValue)) {
      setResultColor(colors[5]?.WebColor);
    } else if (score > parseInt(ranges[7]?.MaxValue)) {
      setResultColor(colors[6]?.WebColor);
    } else {
      setResultColor(colors[7]?.WebColor);
    }
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Heading
              title={ITEM?.Name}
              passedStyle={styles.headingStyles}
              fontType="semi-bold"
            />

            <Image
              resizeMode="contain"
              source={require('../assets/images/logo.png')}
              style={styles.bgimage}
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

            <View style={styles.gradeContainer}>
              <Image
                source={require('../assets/images/black.png')}
                style={[
                  styles.gradeimage,
                  {tintColor: colors[0]?.WebColor || 'black'},
                ]}
                resizeMode={'contain'}
              />

              <Image
                source={require('../assets/images/red.png')}
                style={[
                  styles.gradeimage,
                  {tintColor: colors[1]?.WebColor || 'red'},
                ]}
                resizeMode={'contain'}
              />
              <Image
                source={require('../assets/images/yellow.png')}
                style={[
                  styles.gradeimage,
                  {tintColor: colors[2]?.WebColor || 'orange'},
                ]}
                resizeMode={'contain'}
              />
              <Image
                source={require('../assets/images/pink.png')}
                style={[
                  styles.gradeimage,
                  {tintColor: colors[3]?.WebColor || 'yellow'},
                ]}
                resizeMode={'contain'}
              />
              <Image
                source={require('../assets/images/lightblue.png')}
                style={[
                  styles.gradeimage,
                  {tintColor: colors[4]?.WebColor || 'lightgreen'},
                ]}
                resizeMode={'contain'}
              />
              <Image
                source={require('../assets/images/orange.png')}
                style={[
                  styles.gradeimage,
                  {tintColor: colors[5]?.WebColor || 'darkgreen'},
                ]}
                resizeMode={'contain'}
              />
              <Image
                source={require('../assets/images/darkblue.png')}
                style={[
                  styles.gradeimage,
                  {tintColor: colors[6]?.WebColor || 'blue'},
                ]}
                resizeMode={'contain'}
              />
              <Image
                source={require('../assets/images/purple.png')}
                style={[
                  styles.gradeimage,
                  {tintColor: colors[7]?.WebColor || 'purple'},
                ]}
                resizeMode={'contain'}
              />
            </View>

            <Image
              source={require('../assets/images/yellow.png')}
              style={[
                styles.gradeimage,
                {
                  tintColor: resultColor || 'grey',
                  marginLeft: width * 0.08,
                  height: height * 0.1,
                  width: width * 0.25,
                },
              ]}
            />
            {/* <TouchableOpacity
            onPress={() => {
              _onPressSave();
            }}
            style={styles.savebtn}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: height * 0.1,
              }}>
              <TextInput
                value={score}
                keyboardType="numeric"
                placeholder={'Enter Score 0-80'}
                placeholderTextColor={'grey'}
                style={styles.scoreFieldStyle}
                onChangeText={text => {
                  if (parseInt(text) > 80) {
                    showMessage({
                      type: 'danger',
                      message: 'Score is exceeding the scale values.',
                    });
                    return;
                  }
                  setScore(text);
                }}
              />

              {
                <TouchableOpacity
                  onPress={_onPressSave}
                  style={styles.saveBtnStyle}>
                  <Heading
                    title={'SAVE'}
                    passedStyle={styles.startBtnStyle}
                    fontType="bold"
                  />
                </TouchableOpacity>
              }
               <View style={{paddingBottom: 150}} />
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

export default connect(mapStateToProps, actions)(GradingSystem);
const styles = StyleSheet.create({
  startBtnStyle: {
    color: 'white',
    fontSize: width * 0.04,
    paddingVertical: height * 0.02,
    textAlign: 'center',
  },
  saveBtnStyle: {
    marginLeft: width * 0.05,
    backgroundColor: themeFerozi,
    borderRadius: width * 0.5,
    // marginTop: width * 0.03,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
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
  btnStyle: {
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeLightBlue,
    alignSelf: 'center',
    width: width * 0.41,
  },
  headingStyles: {
    maxWidth: width * 0.9,
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    borderRadius: 25,
    paddingVertical: height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
    paddingHorizontal:width * 0.05,
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
    // alignSelf: 'center',
    paddingHorizontal: 40,
  },
  taskimage: {
    height: height * 0.12,
    width: width * 0.2,
    marginLeft: width * 0.09,
    marginTop: 20,
  },
  savebtn: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#16c4bc',
    alignSelf: 'flex-start',
    marginLeft: 20,
    borderRadius: 100,
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 50,
  },
  saveText: {
    textAlign: 'center',
    fontSize: width * 0.038,
    fontWeight: '400',
    color: 'white',
    // paddingBottom:50,
  },
  gradeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
});
