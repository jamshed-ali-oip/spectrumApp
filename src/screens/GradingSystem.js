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
  Modal
} from 'react-native';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import {
  themeBlue,
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import { Svg, Polygon, Rect, Styles, G, Path } from 'react-native-svg';
import * as actions from '../store/actions';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { Shadow } from 'react-native-shadow-2';
import OctIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckIcon from "react-native-vector-icons/FontAwesome"
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';


const { width, height } = Dimensions.get('window');

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
  const Event = route.params.event;
  const GROUP_DATA = route.params.groupData;
  const CHILD_DATA = route.params.childData;
  const [Memebers, setMembers] = useState([]);
  console.log('hkhklahksdhakhdskl;ahkld', Memebers);
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState('');
  const [ranges, setRanges] = useState([]);
  const [Resultvalue, setResultvalue] = useState({});
  const [assessment_id, setassessment_id] = useState([]);
  const [reverse,setReverse]=useState("red")
  const [Uservalue, setUservalue] = useState({});
  const [errorModal, setErrorModal] = useState(false)
  console.log('=======>', Uservalue);
  // const [resultColor, setResultColor] = useState(
  //   colors[0]?.WebColor || 'black',
  // );
  // console.log("result vaue", Resultvalue)
  // console.log("sjdk", CHILD_DATA.grade_id)
  // console.log("Grading screen", Event)
  //  useEffect(() => {
  //     setRes(ranges[0]?.MaxValue);
  //   }, []);
  useLayoutEffect(() => {
    setMembers(route.params?.memberData)
  }, [])
  // console.log("firsttttttttttttttttttttttttt",userReducer?.assessmentDetails?.assessment_scoring[0]?.assessment_id)
  // useEffect=(()=>{
  //   setassessment_id(userReducer?.assessmentDetails.assessment_scoring[0]?.assessment_id)
  // },[assessment_id])


  // const Resulting =
  //   userReducer?.assessmentDetails?.assessment_scoring[0].MaxValue;
  // console.log('Areaaa', userReducer?.assessmentDetails?.assessment_scoring);
  // useEffect(() => {
  //   findResult();
  // }, [score]);

  useEffect(() => {
    setUservalue(route.params.childData)
    getAllColors();
  }, []);

  const getAllColors = async () => {
    setIsLoading(true);
    await getGameInfo(accessToken);
    await getColors(accessToken);
    await getAssessmentDetails(ITEM?.id, accessToken);
    setIsLoading(false);
  };

  // useEffect(()=>{
  //   if(ranges.length>0){
  //       setRanges([...ranges].reverse())
  //   }
  // },[reverse])

  useEffect(() => {
    setColors(userReducer?.colors);
  }, [userReducer?.colors]);

  useEffect(() => {
    setRanges(userReducer?.assessmentDetails?.assessment_scoring.reverse());
  }, [userReducer?.assessmentDetails]);

  // useEffect(() => {
  //   // alert(JSON.stringify({
  //   //   assessment_id: ITEM?.id,
  //   //   participant_id: Uservalue.id
  //   // }))
  //   if (Uservalue.Firstname) {
  //     setIsLoading(true)
  //     axios.post('https://webprojectmockup.com/custom/spectrum-8/api/participantCount', {
  //       assessment_id: ITEM?.id,
  //       participant_id: Uservalue.id,
  //       event_id: Event.id
  //     }).then((res) => {
  //       // alert(JSON.stringify(res.data))
  //       setIsLoading(false)
  //       if (res.data?.data > 2) {
  //         setErrorModal(true)
  //       }
  //     }).catch((Err)=>{
  //       setIsLoading(false)
  //       console.log(Err)
  //       // alert(JSON.stringify(Err))
  //     })
  //   }
  // }, [Uservalue])

  function nextCandidate() {
    const newIndex = Uservalue.index + 1
    const updatedMembers = [...Memebers].map((it) => {
      if (it.id == Uservalue.id) {
        return {
          ...it,
          disable: true
        }
      } else {
        return it
      }
    })
    setMembers(updatedMembers)
    setUservalue({
      ...Memebers[newIndex],
      index: newIndex,
    });
  }

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
      assessment_score_id: Resultvalue.id || 0,
      participant_id: Uservalue?.id,
      Score: Resultvalue.MaxValue || "0",
      grade_id: CHILD_DATA?.grade_id,
      assessment_id: userReducer?.assessmentDetails?.id,
      Beep: null,
      group_id: GROUP_DATA?.id,
      event_id: Event.id
    };
    setIsLoading(true);
    // console.log(JSON.stringify(apiData, null, 2));
    // console.log("+++++++++++++++++=", userReducer?.assessmentDetails?.id);
    await submitResult(apiData, accessToken, onSuccess);
    setIsLoading(false);
  };

  const onSuccess = () => {
    setResultvalue({})
    if ((Uservalue.index + 1) < Memebers.length) {
      const updatedMembers = [...Memebers].map((it) => {
        if (it.id == Uservalue.id) {
          return {
            ...it,
            disable: true
          }
        } else {
          return it
        }
      })
      setMembers(updatedMembers)
      const newIndex = Memebers[Uservalue.index + 1].disable ? (Uservalue.index + 2) : Uservalue.index + 1
      setUservalue({ ...Memebers[newIndex], index: newIndex })
    } else {
      navigation.navigate('home');
    }
  };
  // var RangeValue = parseInt(ranges[0]?.MaxValue);

  // console.log("first",ranges[0].MaxValue)

  // const findResult = () => {
  //   if (score > parseInt(ranges[0]?.MaxValue)) {
  //     setResultColor(colors[0]?.WebColor);
  //   } else if (score > parseInt(ranges[1]?.MaxValue)) {
  //     setResultColor(colors[7]?.WebColor);
  //   } else if (score > parseInt(ranges[2]?.MaxValue)) {
  //     setResultColor(colors[6]?.WebColor);
  //   } else if (score > parseInt(ranges[3]?.MaxValue)) {
  //     setResultColor(colors[5]?.WebColor);
  //   } else if (score > parseInt(ranges[4]?.MaxValue)) {
  //     setResultColor(colors[4]?.WebColor);
  //   } else if (score > parseInt(ranges[5]?.MaxValue)) {
  //     setResultColor(colors[3]?.WebColor);
  //   } else if (score > parseInt(ranges[6]?.MaxValue)) {
  //     setResultColor(colors[2]?.WebColor);
  //   } else if (score > parseInt(ranges[7]?.MaxValue)) {
  //     setResultColor(colors[1]?.WebColor);
  //   } else {
  //     setResultColor(colors[0]?.WebColor);
  //   }
  // };

  const RenderMembersData = ({ item, index }) => (
    <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
      {/* {console.log(Memebers)} */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center",flex:1,marginRight:10  }}
        disabled={item.disable}
        onPress={() => {
          setResultvalue({})
          setUservalue({ ...item, index });
        }}>
        <Text
          style={{
            fontSize: 20,
            alignSelf: 'center',
            color: item.disable ? 'gray' : (Uservalue.id == item.id ? 'green' : 'white'),
            // textAlign: 'center',
            // textAlignVertical: 'center',
            letterSpacing: 1
          }}>
          {`${item.Firstname} ${item.Lastname}`}
        </Text>

        {
          Uservalue.id == item.id ?
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: item.disable ? 'gray' : (Uservalue.id == item.id ? 'green' : 'white'),
                letterSpacing: 1,
                marginLeft: width * 0.05

              }}>
              ✓
            </Text> :
            <Text></Text>
        }

      </TouchableOpacity>
    </View>
  );

  const RenderimageDAta = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setResultvalue(item);
      }}
      style={{ width: "25%", flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}
    >
      {Resultvalue.image == item.image && (
        <View style={{ position: 'absolute', zIndex: 1 }}>
          <CheckIcon name='check' color={"black"} size={30} />
        </View>
      )}
      <Image
        style={{ height: height * .095, width: width / 6,  resizeMode: "contain" }}
        source={{
          uri:
            item.image === null
              ? 'https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png'
              : `https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/${item.image}`,
        }}
      />
      {/* <Text style={{position:"absolute",color:"white",fontWeight:"500",marginLeft:22,marginTop:25}}>
       {item.image == null?"":item.MaxValue}
     </Text> */}
    </TouchableOpacity>
  );
  console.log("=============================", Resultvalue, !Resultvalue.id ? 1 : .5);
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
                  <Modal
          visible={errorModal}
          transparent={true}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, flex: 1 }}>
            <View style={{ backgroundColor: 'white', height: height / 3, width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 10,padding:10 }}>
              
            <Text style={{ textAlign: 'center',fontSize:20,color:'black',marginBottom:10 }}>
                  {`${Uservalue.Firstname} ${Uservalue.Lastname}`}
                </Text>
                <Text style={{ textAlign: 'center' }}>
                  {`${Uservalue.Firstname} ${Uservalue.Lastname} can not participate more than three times in a month`}
                </Text>
              <TouchableOpacity
              style={{backgroundColor:'black',padding:5,borderRadius:20,paddingHorizontal:40,marginTop:20}}
                onPress={() => {
                  setErrorModal(false)

                  const newIndex = Uservalue.index + 1

                  if (newIndex < Memebers.length) {
                    nextCandidate()
                  } else {
                    navigation.navigate('home');

                  }
                }}
              >
                <Text style={{color:'white'}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          {/* <AwesomeAlert
          show={errorModal}
          showProgress={false}
          title={`${Uservalue.Firstname} ${Uservalue.Lastname}`}
          message={`${Uservalue.Firstname} ${Uservalue.Lastname} can not participate more than three times in a month`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          // showCancelButton={true}
          showConfirmButton={true}
          // cancelText="No, cancel"
          confirmText="Next"
          confirmButtonColor="#DD6B55"
          // onCancelPressed={() => {
          //   setErrorModal(false)
          // }}
          onConfirmPressed={() => {
            setErrorModal(false)

            const newIndex = Uservalue.index + 1

            if (newIndex < Memebers.length) {
              nextCandidate()
            } else {
              navigation.navigate('home');

            }
          }}
        /> */}
       <ScrollView style={{flexGrow:1}}>
       <View>
          <Heading
            title={ITEM?.Name}
            passedStyle={styles.headingStyles}
            fontType="semi-bold"
          />
        </View>

        {/* <Image
              resizeMode="contain"
              source={require('../assets/images/logo.png')}
              style={styles.bgimage}
            /> */}

        {/* Grade  */}
        <View
          style={{
            height: height * 0.20,
            width: '95%',
            backgroundColor: themeDarkBlue,
            borderRadius: 10,
            paddingLeft: 20,
            alignSelf: "center"
          }}>
          <FlatList
          nestedScrollEnabled={true}
            data={Memebers}
            renderItem={RenderMembersData}
            keyExtractor={item => item.id}
          // scrollEnabled={false}
          // contentContainerStyle={{
          //   flexGrow: 1,
          // }}
          />
        </View>
        {isLoading ? (
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <LottieView
          speed={1}
          style={styles.lottieStyle}
          autoPlay
          loop
          source={require('../assets/lottie/color-loader.json')}
        />
        </View>
        ) : (
          <View showsVerticalScrollIndicator={false}>
            <ScrollView>
              <View style={[styles.headingStyle2View, { marginBottom: 20 }]}>
                <Heading
                  title={`${GROUP_DATA?.Name} - ${GROUP_DATA?.Abbr}`}
                  passedStyle={styles.headingStyles2}
                  fontType="regular"
                />
              </View>
              {/* <TouchableOpacity 
              onPress={()=>{
                if(reverse=="red"){
                  setReverse("white")
                }else{
                  setReverse("red")
                }
              }}
              style={[styles.headingStyle2View, { marginTop:0,marginBottom: 20 }]}>
                <Heading
                  title={reverse=="red"?'White to Red ---->':'Red to White ---->'}
                  passedStyle={styles.headingStyles2}
                  fontType="regular"
                />
              </TouchableOpacity> */}
              {/* Child Name  */}
              {/* <View style={styles.headingStyle2View}>
              <Heading
                title={`${CHILD_DATA?.Firstname} ${CHILD_DATA?.Lastname}`}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View> */}

              <View style={{ alignItems: "center", justifyContent: "space-evenly" }}>
                <FlatList
                  style={{ marginTop: Platform.OS == "ios" ? 30 : 0 }}
                  data={ranges}
                  renderItem={RenderimageDAta}
                  keyExtractor={item => item.color_sort}
                  numColumns={4}
                />
              </View>
              {/* <Text>haz,a</Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent:'space-between',
                  marginVertical:10,
                  paddingHorizontal:10
                }}>
                {/* <TextInput
                value={score}
                keyboardType="numeric"
                placeholder={`Enter Score 0-${Resulting} `}
                placeholderTextColor={'grey'}
                style={styles.scoreFieldStyle}
                onChangeText={text => {
                  if (parseInt(text) > parseInt(Resulting)) {
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
                   <TouchableOpacity
                onPress={() => { setResultvalue({}) }}
                style={{...styles.saveBtnStyle,backgroundColor:'black'}}
              >
                {/* <Image
                  source={require('../assets/images/black.png')}
                  style={{
                    height:height*.1, 
                    width:width*.185,
                    marginLeft: width * 0.05,
                    opacity: Resultvalue.length == 0 ? 1 : .5
                  }}
                /> */}
                    <Heading
                      title={'N/A'}
                      passedStyle={styles.startBtnStyle}
                      fontType="bold"
                    />
              </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
       </ScrollView>
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer }) => {
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
    backgroundColor: themeFerozi,
    borderRadius: width * 0.5,
    width: width * 0.25,
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
    // textAlign:"center"
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
    borderRadius: width * .1,
    paddingVertical: height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
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
    // width: width * 0.07,
    // height: height * 0.07,
    // alignSelf: 'center',
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderColor: 'white',
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
    marginTop: height * 0.038,
    // marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
});
