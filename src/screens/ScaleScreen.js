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
  TextInput,
  FlatList,
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
import {showMessage} from 'react-native-flash-message';

const {width, height} = Dimensions.get('window');

const ScaleScreen = ({
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
  const CHILD_DATA = route.params.childData;
  const GROUP_DATA = route.params.groupData;
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState('0');
  const [ranges, setRanges] = useState([]);
  const [ans, setAns] = useState(height * 0.01);
  const [Resultvalue,setResultvalue]=useState([]);
  // console.log("clikc data",Resultvalue)
  const [resultColor, setResultColor] = useState(
    colors[7]?.WebColor || 'black',
  );

  // const RESULT = 25;
  const space1 = height * 0.01;
  const space2 = height * 0.045;
  const space3 = height * 0.08;
  const space4 = height * 0.115;
  const space5 = height * 0.145;
  const space6 = height * 0.175;
  const space7 = height * 0.215;
  const space8 = height * 0.245;

  const findResult = () => {
    if (score > parseInt(ranges[0]?.MaxValue)) {
      setAns(space1);
      setResultColor(colors[7]?.WebColor);
    } else if (score > parseInt(ranges[1]?.MaxValue)) {
      setResultColor(colors[7]?.WebColor);
      setAns(space1);
    } else if (score > parseInt(ranges[2]?.MaxValue)) {
      setResultColor(colors[6]?.WebColor);
      setAns(space2);
    } else if (score > parseInt(ranges[3]?.MaxValue)) {
      setResultColor(colors[5]?.WebColor);
      setAns(space3);
    } else if (score > parseInt(ranges[4]?.MaxValue)) {
      setResultColor(colors[4]?.WebColor);
      setAns(space4);
    } else if (score > parseInt(ranges[5]?.MaxValue)) {
      setResultColor(colors[3]?.WebColor);
      setAns(space5);
    } else if (score > parseInt(ranges[6]?.MaxValue)) {
      setResultColor(colors[2]?.WebColor);
      setAns(space6);
    } else if (score > parseInt(ranges[7]?.MaxValue)) {
      setResultColor(colors[1]?.WebColor);
      setAns(space7);
    } else {
      setResultColor(colors[0]?.WebColor);
      setAns(space8);
    }
  };

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
    if (score > 80) {
      showMessage({
        type: 'danger',
        message: 'Score is exceeding the scale values.',
      });
    } else if (score < 0) {
      showMessage({
        type: 'danger',
        message: 'Score cant be less than zero.',
      });
    } else {
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
        assessment_score_id: Resultvalue.id,
        participant_id: CHILD_DATA?.id,
        Score: Resultvalue.MaxValue,
        grade_id: CHILD_DATA?.id,
        assessment_id: Resultvalue.assessment_id,
        group_id: GROUP_DATA?.id,
        Distance: null,
      };

      setIsLoading(true);
      // console.log("Resultvalue", JSON.stringify(Resultvalue, null, 2));
      // console.log("API body", JSON.stringify(apiData, null, 2));
      await submitResult(apiData, accessToken, onSuccess);
      setIsLoading(false);
    }
  };

  const onSuccess = () => {
    navigation.navigate('home');
  };
  const RenderimageDAta = ({item}) => (
   <TouchableOpacity onPress={()=>{setResultvalue(item)}} style={{width:100,flexDirection:"row"}}>
     <Image
      style={{height: 70, width: 70}}
      source={{
        uri:
          item.image=== null ? "https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png":`https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/${item.image}`
      }}
    />
    <Text style={{position:"absolute",color:"white",fontWeight:"500",marginLeft:22,marginTop:25}}>
      {item.image == null?"":item.MaxValue}
    </Text>
   </TouchableOpacity>
  );
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      {/* {console.log("datdtatdatdta",ranges[0].image)} */}
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
                title={ITEM?.Name}
                passedStyle={styles.headingStyles}
                fontType="semi-bold"
              />
            </View>
            {/* </View> */}
            {/* <Image
              resizeMode="contain"
              source={require('../assets/images/new-logo.png')}
              style={styles.bgimage}
            /> */}

            {/* Grade  */}
            <View style={styles.headingStyle2View}>
              <Heading
                title={`${GROUP_DATA?.Name}`}
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

            <View style={styles.triangleContainer}>
              <View
                style={{
                  alignItems: 'center',
                  borderRightWidth: 6,
                  borderRightColor: 'white',
                }}>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                     source={{
                      uri: 'https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png',
                    }}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.02,
                      // tintColor: colors[7]?.WebColor,
                      height: height * 0.032,
                      width: width * 0.5,
                    }} */}
                {/* /> */}
                {/* <Image
                    source={require('../assets/images/1.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.02,
                      tintColor: colors[7]?.WebColor,
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
                    {ranges[0]?.MaxValue}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                    // backgroundColor:'silver',
                  }}> */}
                {/* <Image
                    source={require('../assets/images/2.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.055,
                      height: height * 0.032,
                      width: width * 0.43,
                      tintColor: colors[6]?.WebColor,
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                      marginBottom: height * 0.01,
                    }}>
                    {ranges[1]?.MaxValue}
                  </Text>
                </View> */}

                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/3.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.082,
                      height: height * 0.032,
                      width: width * 0.37,
                      tintColor: colors[5]?.WebColor,
                    }}
                  />
                  {/* <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {ranges[2]?.MaxValue}
                  </Text> */}
                {/* </View>

                <View
                  style={{
                    flexDirection: 'row',

                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/4.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.11,
                      height: height * 0.032,
                      tintColor: colors[4]?.WebColor,
                      width: width * 0.313,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {ranges[3]?.MaxValue}
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
                  }}> */}
                {/* <Image
                    source={require('../assets/images/5.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.135,
                      height: height * 0.032,
                      width: width * 0.26,
                      tintColor: colors[3]?.WebColor,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                      textAlignVertical:"top"
                    }}>
                    {ranges[4]?.MaxValue}
                  </Text>
                </View>
/
                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/6.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.165,
                      height: height * 0.032,
                      width: width * 0.205,
                      tintColor: colors[2]?.WebColor,
                    }}
                  /> */}
                {/* <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    {ranges[5]?.MaxValue}
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
                  }}> */}
                {/* <Image
                    source={require('../assets/images/7.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.19,
                      height: height * 0.032,
                      width: width * 0.15,
                      tintColor: colors[1]?.WebColor,
                    }}
                  />
                  <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    {ranges[6]?.MaxValue}
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
                  }}> */}
                {/* <Image
                    source={require('../assets/images/8.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.22,
                      height: height * 0.05,
                      width: width * 0.09,
                      tintColor: colors[0]?.WebColor,
                    }}
                  />
                  <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    {ranges[7]?.MaxValue}
                  </Text> */}
              </View>
            </View>
            {/* <View
              style={{
                width: width * 0.15,
                height: height * 0.006,
                alignSelf: 'flex-end',
                position: 'absolute',
                top: ans || height * 0.01,
                backgroundColor: 'white',
              }}
            /> */}
            {/* 0.01, 0.035, 0.06, 0.085,  0.11, 0.135 0.16 , 0.187*/}
            {/* </View> */}

            <View
              style={{
                marginTop: height * -0.1,
              }}>
              <Heading
                title={score == '0' || score == 0 ? '' : `${score}'`}
                passedStyle={{
                  fontSize: width * 0.07,
                  color: 'white',
                  marginLeft: width * 0.15,
                }}
                fontType="semi-bold"
              />

              <FlatList
              style={{marginLeft:20}}
                data={ranges}
                renderItem={RenderimageDAta}
                keyExtractor={item => item.id}
                numColumns={4}
              />

              <View>
              <Image
                source={ Resultvalue?.image ? {uri:`https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/${Resultvalue.image}`} : require('../assets/images/black.png' )}
                style={[
                  styles.taskimage,
                
                ]}
              />
              <Text style={{position:"absolute",marginLeft:65,color:"white",marginTop:25}}>
                {Resultvalue.MaxValue}
              </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: height * 0.1,
                }}>
                {/* <TextInput
                  value={score}
                  keyboardType="numeric"
                  placeholder={`Enter Score 1-${ranges[0]?.MaxValue}`}
                  placeholderTextColor={'grey'}
                  style={styles.scoreFieldStyle}
                  onChangeText={text => {
                    if (parseInt(text) > ranges[0]?.MaxValue) {
                      showMessage({
                        type: 'danger',
                        message: 'Score is exceeding the scale values.',
                      });
                      return;
                    }
                    setScore(text);
                  }}
                /> */}

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
  startBtnStyle: {
    color: 'white',
    fontSize: width * 0.04,
    paddingVertical: height * 0.015,
    textAlign: 'center',
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
    marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
  headingStyles: {
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    // paddingVertical: height * 0.01,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headingView: {
    backgroundColor: themeFerozi,
    borderRadius: width * 0.05,
    // width: width * 0.55,
    maxWidth: width * 0.95,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
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
    marginTop: height * 0.06,
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
