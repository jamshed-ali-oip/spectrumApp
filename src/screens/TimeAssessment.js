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
  Button,
  FlatList,
  Modal,
  AppState,
  Animated
} from 'react-native';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import RNSpeedometer from 'react-native-speedometer';
import KeepAwake from 'react-native-keep-awake';
import Heading from '../components/Heading';
// import {Timer, Countdown} from 'react-native-element-timer';
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
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import LottieView from 'lottie-react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { showMessage } from 'react-native-flash-message';
import RNBeep from 'react-native-a-beep';
import Sound from 'react-native-sound';
import CheckIcon from "react-native-vector-icons/FontAwesome"
import moment from 'moment';
import { baseUrl } from '../config';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');

const TimeAssessment = ({
  navigation,
  route,
  userReducer,
  getColors,
  submitResult,
  getGameInfo,
  getAssessmentDetails,
  checkGame,
}) => {
  const ITEM = route.params.item;
  const [Memebers, setMembers] = useState([]);
  const CHILD_DATA = route.params.childData;
  const GROUP_DATA = route.params.groupData;
  const Event = route.params.event;
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [child, setChild] = useState(null);
  const accessToken = userReducer?.accessToken;
  const [meterValue, setMeterValue] = useState(50);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [assessmentScoreid, setAssessmentScoreId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [Uservalue, setUservalue] = useState({});
  const [Resultvalue, setResultvalue] = useState({});
  // const [NA, setNA] = useState(true)
  const [flag, setFlag] = useState(true)
  const [showTextField, setShowTextField] = useState(false);
  const partScrollRef = useRef(null)
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const animationRef = useRef()
  const [ranges, setRanges] = useState([
    {
      "id": 24,
      "assessment_id": 3,
      "color_id": 1,
      "MinValue": ITEM.times?.RL,
      "MaxValue": ITEM.times?.RU,
      "Duration": "00:00:00",
      "Beep": null,
      "Distance": null,
      "Score_target": "Duration",
      "created_at": "2022-06-21T02:12:57.000000Z",
      "updated_at": "2022-08-12T01:25:03.000000Z",
      "image": "red_1660267503.png",
      "minTime": "0.36",
      "maxTime": "0.40"
    },
    {
      "id": 23,
      "assessment_id": 3,
      "color_id": 2,
      "MinValue": ITEM.times?.BL,
      "MaxValue": ITEM.times?.BU,
      "Duration": "00:00:00",
      "Beep": null,
      "Distance": null,
      "Score_target": "Duration",
      "created_at": "2022-06-21T02:12:57.000000Z",
      "updated_at": "2022-08-09T18:53:30.000000Z",
      "image": "blue_1660071210.png",
      "minTime": "0.31",
      "maxTime": "0.35"
    },
    {
      "id": 22,
      "assessment_id": 3,
      "color_id": 3,
      "MinValue": ITEM.times?.GL,
      "MaxValue": ITEM.times?.GU,
      "Duration": "00:00:00",
      "Beep": null,
      "Distance": null,
      "Score_target": "Duration",
      "created_at": "2022-06-21T02:12:57.000000Z",
      "updated_at": "2022-08-12T01:24:43.000000Z",
      "image": "green_1660267483.png",
      "minTime": "0.26",
      "maxTime": "0.30"
    },
    {
      "id": 21,
      "assessment_id": 3,
      "color_id": 4,
      "MinValue": ITEM.times?.OL,
      "MaxValue": ITEM.times?.OU,
      "Duration": "00:00:00",
      "Beep": null,
      "Distance": null,
      "Score_target": "Duration",
      "created_at": "2022-06-21T02:12:57.000000Z",
      "updated_at": "2022-08-12T01:24:21.000000Z",
      "image": "orange_1660267461.png",
      "minTime": "0.21",
      "maxTime": "0.25"
    },
    {
      "id": 20,
      "assessment_id": 3,
      "color_id": 5,
      "MinValue": ITEM.times?.VL,
      "MaxValue": ITEM.times?.VU,
      "Duration": "00:00:00",
      "Beep": null,
      "Distance": null,
      "Score_target": "Duration",
      "created_at": "2022-06-21T02:12:57.000000Z",
      "updated_at": "2022-08-12T01:24:04.000000Z",
      "image": "purple_1660267444.png",
      "minTime": "0.16",
      "maxTime": "0.20"
    },
    {
      "id": 19,
      "assessment_id": 3,
      "color_id": 6,
      "MinValue": ITEM.times?.YL,
      "MaxValue": ITEM.times?.YU,
      "Duration": "00:00:00",
      "Beep": null,
      "Distance": null,
      "Score_target": "Duration",
      "created_at": "2022-06-21T02:12:57.000000Z",
      "updated_at": "2022-08-09T18:54:29.000000Z",
      "image": "yellow_1660071269.png",
      "minTime": "0.11",
      "maxTime": "0.15"
    },
    {
      "id": 18,
      "assessment_id": 3,
      "color_id": 7,
      "MinValue": ITEM.times?.PL,
      "MaxValue": ITEM.times?.PU,
      "Duration": "00:00:00",
      "Beep": null,
      "Distance": null,
      "Score_target": "Duration",
      "created_at": "2022-06-21T02:12:57.000000Z",
      "updated_at": "2022-08-12T01:23:39.000000Z",
      "image": "pink_1660267419.png",
      "minTime": "0.06",
      "maxTime": "0.10"
    },
    {
      "id": 17,
      "assessment_id": 3,
      "color_id": 8,
      "MinValue": ITEM.times?.WL,
      "MaxValue": ITEM.times?.WU,
      "Duration": "00:00:00",
      "Beep": null,
      "Distance": null,
      "Score_target": "Duration",
      "created_at": "2022-06-21T02:12:57.000000Z",
      "updated_at": "2022-08-12T01:23:18.000000Z",
      "image": "white_1660267398.png",
      "minTime": "0.01",
      "maxTime": "0.05"
    }
  ]);
  const [highscore, sethighscore] = useState();
  const [player, setPlayer] = useState({})
  const [players, setPlayers] = useState([])
  const [errorModal, setErrorModal] = useState(false)
  const [reverse, setReverse] = useState("red")
  // console.log("ranges",ranges)

  // console.log("my kasjm,ir",route.params.item.id,highscore)
  // console.log("time assement screen", Event)
  const [wheelState, setWheelState] = useState({
    winnerValue: null,
    winnerIndex: null,
    started: false,
  });
  const [scoring, setscoring] = useState(0);
  const Value = userReducer?.gameInfo?.filter(game => game.assessment_id == ITEM.id);
  // const assessment_id = userReducer?.assessmentDetails?.assessment_scoring[0]?.assessment_id;
  // console.log("gameindo",userReducer?.gameInfo)
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const participants = ['', '', '', '', '', '', '', '', ''];
  const [secs, setSecs] = useState(0);
  const [zindex, setZindex] = useState(0)
  // console.log("seconds", secs)
  // console.log("first",meterValue)
  // const apiData = {
  //   assessment_score_id: Resultvalue ? Resultvalue.id : 0,
  //   Score: Resultvalue ? Resultvalue.MaxValue : 0,
  //   participant_id: Uservalue?.id,
  //   // Score: Resultvalue.MaxValue,
  //   grade_id: CHILD_DATA?.grade_id,
  //   group_id: GROUP_DATA?.id,
  //   assessment_id: route.params.item.id,
  //   Duration: secs,
  //   event_id: Event.id
  // };

  // Value.find((scoor) => {
  //   highscore > scoor.MaxValue && highscore < scoor.MinValue
  // })

  // useEffect(() => {
  //   if (ranges.length > 0) {
  //     setRanges([...ranges].reverse())
  //   }
  // }, [reverse])
  useEffect(() => {
    if (Resultvalue) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start()


      // setZindex(1)
      if (animationRef?.current) {
        animationRef?.current.reset()
      }
      animationRef.current = Animated.sequence([
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start()
      // setTimeout(()=>{
      //   setZindex(0)
      // },1000)
    }
  }, [Resultvalue])

  useEffect(() => {
    const stateListen = AppState.addEventListener('blur', (status) => {
      setFlag(true)
      resetStopwatch();
      checkGame(false);
      setSecs(0);
      setScore('0');
      setShowTextField(false);
      setResultvalue({})
      setHasTimerStarted(false);
    })
    const unsubscribe = navigation.addListener('blur', () => {
      stateListen.remove()
    });

    return unsubscribe;
  }, [navigation])

  // console.log("ittt",ITEM)
  useEffect(() => {
    // axios.post(`https://webprojectmockup.com/custom/spectrum-8-v2/api/percentile`, {
    //   assessment_id: ITEM?.id
    // },{
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${userReducer.accessToken}`,
    //   }
    // }).then(res => {
    //   // alert(JSON.stringify(res.data.data))
    //   setPlayers(res.data.data)
    // })
  }, [])

  useEffect(() => {
    if (Uservalue && players.length > 0) {
      const currentPlayer = players?.filter(it => it.grade_id == Uservalue.grade_id && it.gender == Uservalue.Gender)[0]
      // alert(JSON.stringify(currentPlayer))
      setPlayer(currentPlayer)
    }
  }, [Uservalue, players])

  useEffect(() => {
    // const per = Math.round(Number(player?.percent))
    // const value = per.toString().length > 1 ? `0.${per}` : `0.0${per}`
    // const seletedCheck=ranges.filter((it)=>it.minTime==secs)
    // if(seletedCheck.length>0){
    //   setResultvalue(seletedCheck[0])
    // }
    // if (Number(secs) == value) {
    //   playSound()
    // }
    console.log(secs)
    if (secs) {
      ranges.forEach(it => {
        if (secs >= (it.MinValue / 100) && secs <= (it.MaxValue / 100)) {
          setResultvalue(it)
        }
      })
    }
  }, [secs])
  // alert(JSON.stringify(ranges.map(it=>({min:it.minTime,max:it.maxTime}))))

  const cDate = new Date().toLocaleDateString().split('/')
  // console.log(cDate[0]+"-"+cDate[1]+"-"+cDate[2]+" "+secs)
  // console.log("Sdfsdf",ITEM?.id)


  const apiData = {
    event_id: CHILD_DATA.event ? (CHILD_DATA?.event[0]?.id) : 1,
    participant_id: Uservalue?.id,
    assessment_id: ITEM?.id,
    grade_id: CHILD_DATA?.GradeID,
    gender_id: ITEM.times?.GenderID,
    color_id: Resultvalue.color_id,
    results: Resultvalue.MaxValue,
    // dt_recorded: moment().format('YYYY-MM-DD') + " " + `00:0${secs.toString()?.replace(".", ":")}`,
    dt_recorded: moment().format('YYYY-MM-DD hh:mm:ss'),
    attempt: 1,
    percent: Math.round(Number(ITEM.times?.Percent))
  };
  // console.log("QQQQQQQQQQQQQQQQQQQQ", Value, ITEM, userReducer);
  const [timer, setTimer] = useState({
    timerStart: false,
    stopwatchStart: false,
    totalDuration: 90000,
    timerReset: false,
    stopwatchReset: false,
  });
  // console.log("time", timer)
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
        return { ...prev, winnerValue: value, winnerIndex: index };
      });
    },
    onRef: ref => setChild(ref),
  };

  // console.log(JSON.stringify(CHILD_DATA,null,2), '----');
  // console.log("userReducer?.assessmentDetails?.id",highscore,userReducer?.assessmentDetails?.id)
  const assesmentBeep = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // console.log("first",8)
    var raw = JSON.stringify({
      assessment_id: ITEM?.id,
      top_score: 5
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseUrl}/api/score_result`, requestOptions)
      .then(response => response.json())
      .then(result => {
        sethighscore(result)
        // console.log("scorrimnh maa kli ajnk ",result)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    // console.log("sdfsdfaaa",highscore,flag,meterValue)
    if (meterValue > highscore && flag) {
      playSound()
      setFlag(false)
    } else {
      console.log("calling")
    }

  }, [meterValue])

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
  // console.log(
  //   'colors',
  //   Value[7]?.MaxValue
  //   // colors[0],
  //   // userReducer?.gameInfo?.filter(game => game.assessment_id == 8)
  // );
  useEffect(() => {
    // console.log('Miliseconds: ', secs * 1000, '----', 'Seconds: ', secs);
  }, [secs]);

  // const findScoreNow = () => {
  //   // console.log("color id",color_id)
  //   const thisGameScorePeers = userReducer?.gameInfo?.filter(
  //     game => game.assessment_id == 8,
  //   );
  //   let color_id = thisGameScorePeers[0]?.color_id;
  //   for (const thisGame of thisGameScorePeers) {
  //     // console.log('YYYYYYY', thisGame, color_id);
  //     if (thisGame?.MinValue <= secs && thisGame?.MaxValue >= secs) {
  //       color_id = thisGame?.color_id;
  //       setAssessmentScoreId(thisGame?.id);
  //     }
  //   }
  //   for (let i = 8; i <= userReducer?.gameInfo?.length; i++) {
  //     if (
  //       userReducer?.gameInfo[i]?.MinValue <= secs &&
  //       userReducer?.gameInfo[i]?.MaxValue >= secs
  //     ) {
  //       color_id = userReducer?.gameInfo[i]?.color_id;
  //       setAssessmentScoreId(userReducer?.gameInfo[i]?.id);
  //     }
  //   }
  //   // if (color_id === 1) {
  //   //   setMeterValue(5);
  //   // } else if (color_id === 2) {
  //   //   setMeterValue(15);
  //   // } else if (color_id === 3) {
  //   //   setMeterValue(25);
  //   // } else if (color_id === 4) {
  //   //   setMeterValue(35);
  //   // } else if (color_id === 5) {
  //   //   setMeterValue(45);
  //   // } else if (color_id === 6) {
  //   //   setMeterValue(55);
  //   // } else if (color_id === 7) {
  //   //   setMeterValue(65);
  //   // } else if (color_id === 8) {
  //   //   setMeterValue(75);
  //   // } else if (color_id === 9) {
  //   //   setMeterValue(85);
  //   // } else {
  //   //   setMeterValue(95);
  //   // }
  // };
  useEffect(() => {
    // setRanges(userReducer?.assessmentDetails?.assessment_scoring);
    // setRanges(userReducer?.gameInfo?.filter(game => game.assessment_id == ITEM.id))
    // setRanges(Value);
  }, [userReducer?.gameInfo]);

  // useEffect(() => {
  //   if (Uservalue.id) {
  //     setIsLoading(true)
  //     axios.post('https://webprojectmockup.com/custom/spectrum-8-v2/api/participantCount', {
  //       assessment_id: ITEM?.id,
  //       participant_id: Uservalue.id,
  //       event_id: Event.id
  //     }).then((res) => {
  //       // alert(JSON.stringify({
  //       //   a:Uservalue.Firstname,
  //       //   d:res.data?.data
  //       // }))
  //       setIsLoading(false)
  //       if (res.data?.data > 2) {
  //         // alert(JSON.stringify({
  //         //   a:Uservalue.Firstname,
  //         //   d:res.data?.data
  //         // }))
  //         setErrorModal(true)
  //       }
  //     }).catch((err) => {
  //       // alert(err)
  //       setIsLoading(false)
  //       console.log(err)
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

  useLayoutEffect(() => {
    setMembers(route.params?.memberData)
  }, [])
  useEffect(() => {
    setUservalue(route.params.childData);
    getAllColors();
    setMeterValue(0);
    setShowTextField(false);
    return () => {
      setScore('');
      setMeterValue('');
    };
  }, []);

  useEffect(() => {
    setColors(userReducer?.colors);
  }, [userReducer?.colors]);
  useEffect(() => {
    assesmentBeep();
  }, [])
  const getAllColors = async () => {
    setIsLoading(true);
    await getAssessmentDetails(1, accessToken);
    await getColors(accessToken);
    await getGameInfo(accessToken);
    setIsLoading(false);
  };

  const _onPressSave = async () => {
    // alert(JSON.stringify(apiData))
    // console.log("too",apiData)
    // console.log("child",CHILD_DATA)
    // alert(JSON.stringify(apiData))
    // console.log(JSON.stringify(apiData?.grade_id, null, 2), '-----');
    if (Resultvalue.color_id) {
      setIsLoading(true);

      if (Memebers?.length > 2 && Memebers.length != Uservalue.index + 1) {
        partScrollRef?.current?.scrollTo({ x: 0, y: (Uservalue.index + 1) * 35, animated: true })
      }
      // alert(JSON.stringify(apiData))
      await submitResult(apiData, accessToken, onSuccess);
      setIsLoading(false);
    } else {
      showMessage({
        message: 'please select octagone color',
        type: 'danger'
      })
    }
  };

  const onSuccess = () => {
    setFlag(true)
    resetStopwatch();
    checkGame(false);
    setSecs(0);
    setScore('0');
    setShowTextField(false);
    setResultvalue({})
    if (Uservalue.index + 1 < Memebers.length) {
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
      setUservalue({
        ...Memebers[newIndex],
        index: newIndex,
      });
    } else {
      // const updatedMembers = [...Memebers].map((it) => {
      //   if (it.id == Uservalue.id) {
      //     return {
      //       ...it,
      //       disable: true
      //     }
      //   } else {
      //     return it
      //   }
      // })
      // setMembers(updatedMembers)
      // const disableExist = Memebers.filter((it,i) => (!it.disable))
      // if (disableExist.length > 0) {
      //   const index=Memebers.findIndex(x=>x.id==disableExist[0].id)
      //   setUservalue({...disableExist[0],index});

      // } else {
      navigation.navigate('home');
      // }
    }
  };

  // useEffect(() => {
  //   meterController();
  // }, [secs]);
  // console.log("scoring",scoring)
  const meterController = () => {
    // console.log('faozannnnnn', secs);
    // console.log('..//....//',Value[0]);
    if (
      parseInt(secs) > Number(Value[0]?.minTime) &&
      Number(secs) <= Number(Value[0]?.maxTime)
    ) {
      setMeterValue(100);
      setscoring(Value[0])
    } else if (
      Number(secs) >= Number(Value[1]?.minTime) &&
      Number(secs) <= Number(Value[1]?.maxTime)
    ) {
      setMeterValue(200);
      setscoring(Value[1])
    } else if (
      Number(secs) >= Number(Value[2]?.minTime) &&
      Number(secs) <= Number(Value[2]?.maxTime)
    ) {
      setMeterValue(300);
      setscoring(Value[2])
    } else if (
      Number(secs) >= Number(Value[3]?.minTime) &&
      Number(secs) <= Number(Value[3]?.maxTime)
    ) {
      setMeterValue(400);
      setscoring(Value[3])
    } else if (
      Number(secs) >= Number(Value[4]?.minTime) &&
      Number(secs) <= Number(Value[4]?.maxTime)
    ) {
      setMeterValue(500);
      setscoring(Value[4])
    } else if (
      Number(secs) >= Number(Value[5]?.minTime) &&
      Number(secs) <= Number(Value[5]?.maxTime)
    ) {
      setMeterValue(600);
      setscoring(Value[5])
    } else if (
      Number(secs) >= Number(Value[6]?.minTime) &&
      Number(secs) <= Number(Value[6]?.maxTime)
    ) {
      setMeterValue(700);
      setscoring(Value[6])
    } else if (
      Number(secs) >= Number(Value[7]?.minTime) &&
      Number(secs) <= Number(Value[7]?.maxTime)
    ) {
      setMeterValue(800);
      setscoring(Value[7])
    }
  };
  // const toggleTimer = () => {
  //   setTimer(prev => {
  //     return {
  //       ...prev,
  //       timerStart: !timer.timerStart,
  //       timerReset: false,
  //     };
  //   });
  // };

  // const resetTimer = () => {
  //   setTimer(prev => {
  //     return {...prev, timerStart: false, timerReset: true};
  //   });
  // };

  const toggleStopwatch = () => {
    setTimer(prev => {
      return {
        ...prev,
        stopwatchStart: !timer.stopwatchStart,
        stopwatchReset: false,
      };
    });
  };

  const resetStopwatch = () => {
    setTimer(prev => {
      return {
        ...prev,
        stopwatchStart: false,
        stopwatchReset: true,
      };
    });
  };

  const handleTimerComplete = () => alert('custom completion function');

  const getFormattedTime = time => {
    if (time) {
      let currentTime = time;
      setSecs(
        Number(`${currentTime.split(':')[1]}.${currentTime.substring(6, 8)}`),
      );
    }
  };

  // console.log(GROUP_DATA?.Name);
  var whoosh = new Sound('my_beep.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      // console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

    // Play the sound with an onEnd callback
    // whoosh.setNumberOfLoops(1)

  });

  const playSound = () => {
    // const sound = new Sound('beep.mp3');
    // alert("call")

    if (Platform.OS == "ios") {
      // var whoosh = new Sound('my_beep.mp3', Sound.MAIN_BUNDLE, error => {
      //   if (error) {
      //     // console.log('failed to load the sound', error);
      //     return;
      //   }
      //   whoosh.play(success => {
      //     if (success) {
      //       console.log('successfully finished playing');
      //     } else {
      //       console.log('playback failed due to audio decoding errors');
      //     }
      //   });
      //   // loaded successfully
      //   // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

      //   // Play the sound with an onEnd callback
      //   // whoosh.setNumberOfLoops(1)

      // });

      var whoosh = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          // console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

        // Play the sound with an onEnd callback
        whoosh.play((success) => {
          if (success) {
            // console.log('successfully finished playing');
          } else {
            // console.log('playback failed due to audio decoding errors');
          }
        });
      });
    } else {
      RNBeep.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_CDMA_ANSWER)
    }


  };
  const RenderMembersData = ({ item, index }) => (
    <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
      {/* {console.log(Memebers)} */}
      <TouchableOpacity
        onPress={() => {
          setUservalue({ ...item, index });
        }}>
        <Text
          style={{
            fontSize: 20,
            alignSelf: 'center',
            color: Uservalue.id == item.id ? 'green' : 'white',
            // textAlign: 'center',
            // textAlignVertical: 'center',
            letterSpacing: 1,
          }}>
          {`${item.Firstname} ${item.Lastname}`}
        </Text>
      </TouchableOpacity>
    </View>
  );

  function renderHeader() {
    return (
      <>
        <View style={styles.headingView}>
          <Heading
            title={ITEM?.Name}
            passedStyle={styles.headingStyles}
            fontType="semi-bold"
          />
        </View>
        <ScrollView
          nestedScrollEnabled={true}
          style={{ height: height * 0.2 }}
          ref={partScrollRef}
          contentContainerStyle={{
            width: '95%',
            backgroundColor: themeDarkBlue,
            borderRadius: 10,
            paddingLeft: 20,
            alignSelf: 'center',
          }}>
          {Memebers.map((item, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: 'row', paddingVertical: 3 }}>
                {/* {console.log(Memebers)} */}
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center", flex: 1, marginRight: 10 }}
                  disabled={item.disable}
                  onPress={() => {
                    partScrollRef?.current?.scrollTo({ x: 0, y: index * 35, animated: true })
                    setResultvalue({})
                    setFlag(true)
                    resetStopwatch();
                    checkGame(false);
                    setSecs(0);
                    setScore('0');
                    setShowTextField(false);
                    setUservalue({ ...item, index });
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      color: item.disable ? 'gray' : (Uservalue.id == item.id ? 'green' : 'white'),
                      // textAlign: 'center',
                      // textAlignVertical: 'center',
                      letterSpacing: 1,
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
          })}
        </ScrollView>
      </>
    );
  }

  function renderData() {
    return (
      <>
        {isLoading || colors?.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
              speed={1}
              style={styles.lottieStyle}
              autoPlay
              loop
              source={require('../assets/lottie/color-loader.json')}
            />
          </View>
        ) : (
          <>
            {/* Heading  */}

            {/* Image Logo  */}
            {/* <Image
              resizeMode="contain"
              source={require('../assets/images/new-logo.png')}
              style={styles.logoStyles}
            /> */}

            {/* Grade  */}
            <View style={styles.headingStyle2View}>
              <Heading
                title={(GROUP_DATA?.Name) ? (GROUP_DATA.Name == "All" ? "All Groups" : GROUP_DATA?.Name) : "All Groups"}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View>
            {/* <TouchableOpacity
                onPress={() => {
                  if (reverse == "red") {
                    setReverse("white")
                  } else {
                    setReverse("red")
                  }
                }}
                style={[styles.headingStyle2View, {  marginBottom: 20 }]}>
                <Heading
                  title={reverse == "red" ? 'White to Red ---->' : 'Red to White ---->'}
                  passedStyle={styles.headingStyles2}
                  fontType="regular"
                />
              </TouchableOpacity> */}
            <View style={{ alignItems: "center", justifyContent: "space-evenly" }}>
              <FlatList
                contentContainerStyle={{ marginTop: Platform.OS == "ios" ? 30 : 0, width: "100%" }}
                data={ranges}
                renderItem={RenderimageDAta}
                keyExtractor={item => item.color_sort}
                numColumns={4}
              />

            </View>

            {/* Child Name  */}
            {/* <View style={styles.headingStyle2View}>
              <Heading
                title={`${CHILD_DATA?.Firstname} ${CHILD_DATA?.Lastname}`}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View> */}

            {/* Meter and Button View Container  */}
            <View style={styles.configurations}>
              {/* Buttons and Timers View  */}
              <View style={{ ...styles.innerLeftConfigView, width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 10 }}>
                {/* Start Button  */}

                {!hasTimerStarted ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setFlag(true)
                        if (!hasTimerStarted) {
                          // timerRef.current.start();

                          checkGame(true);
                          toggleStopwatch();
                          setHasTimerStarted(true);
                          setSecs(0);
                          setMeterValue(0);
                          playSound();
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
                    {showTextField && (
                      <TouchableOpacity
                        onPress={_onPressSave}
                        style={{ ...styles.startBtnContainer, backgroundColor: themeFerozi }}>
                        <Heading
                          title={'SAVE'}
                          passedStyle={styles.startBtnStyle}
                          fontType="semi-bold"
                        />
                      </TouchableOpacity>
                    )}

                  </>
                ) : (
                  // Stop Button
                  <TouchableOpacity
                    onPress={() => {
                      // timerRef.current.pause();
                      playSound();
                      checkGame(false);
                      toggleStopwatch();
                      setHasTimerStarted(false);
                      // findScoreNow();
                      setShowTextField(true);
                      Animated.sequence([
                        Animated.timing(fadeAnim, {
                          toValue: 0,
                          duration: 10,
                          useNativeDriver: true,
                        }),
                        Animated.timing(fadeAnim, {
                          toValue: 1,
                          duration: 1000,
                          useNativeDriver: true,
                        })
                      ]).start()


                      // setZindex(1)
                      if (animationRef?.current) {
                        animationRef?.current.reset()
                      }
                      animationRef.current = Animated.sequence([
                        Animated.timing(fadeAnim2, {
                          toValue: 1,
                          duration: 250,
                          useNativeDriver: true,
                        }),
                        Animated.timing(fadeAnim2, {
                          toValue: 0,
                          duration: 250,
                          useNativeDriver: true,
                        })
                      ]).start()
                    }}
                    style={{ ...styles.startBtnContainer, backgroundColor: themeRed, }}>
                    <Heading
                      title={'STOP'}
                      passedStyle={styles.startBtnStyle}
                      fontType="semi-bold"
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setResultvalue({})
                  }}
                  style={{ ...styles.startBtnContainer, backgroundColor: 'black' }}>

                  <Heading
                    title={'N/A'}
                    passedStyle={styles.startBtnStyle}
                    fontType="semi-bold"
                  />
                </TouchableOpacity>

                {/* <Timer
                  totalDuration={timer.totalDuration}
                  msecs
                  start={timer.timerStart}
                  reset={timer.timerReset}
                  options={{
                    container: {
                      backgroundColor: '#000',
                      padding: 5,
                      borderRadius: 5,
                      width: 220,
                    },
                    text: {
                      fontSize: 30,
                      color: '#FFF',
                      marginLeft: 7,
                    },
                  }}
                  handleFinish={handleTimerComplete}
                  getTime={(time) => getFormattedTime(timer)}
                /> */}
                {/* <Timer
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
                  formatTime={'hh:mm:ss:ssss'}
                  onEnd={e => {}}
                /> */}
              </View>

              {/* Game Meter  */}

              {/* <Button title='sound' onPress={()=>{playSound()}} /> */}
              {/* <RNSpeedometer
                wrapperStyle={{marginRight: width * 0.05}}
                value={parseInt(meterValue)}
                minValue={100}
                maxValue={800}
                size={200}
                labelStyle={{color: 'transparent'}}
                labelNoteStyle={{color: 'transparent'}}
                labels={
                  colors?.length > 0
                    ? [
                        {
                          name: 'Too Slow',
                          labelColor: colors[0]?.WebColor || 'red',
                          activeBarColor: colors[0]?.WebColor || 'red',
                        },
                        {
                          name: 'Very Slow',
                          labelColor: colors[1]?.WebColor || 'orange',
                          activeBarColor: colors[1]?.WebColor || 'orange',
                        },
                        {
                          name: 'Slow',
                          labelColor: colors[2]?.WebColor || 'yellow',
                          activeBarColor: colors[2]?.WebColor || 'yellow',
                        },
                        {
                          name: 'Normal',
                          labelColor: colors[3]?.WebColor || 'lightgreen',
                          activeBarColor: colors[3]?.WebColor || 'lightgreen',
                        },
                        {
                          name: 'Fast',
                          labelColor: colors[4]?.WebColor || 'darkgreen',
                          activeBarColor: colors[4]?.WebColor || 'darkgreen',
                        },
                        {
                          name: 'Unbelievably Fast',
                          labelColor: colors[5]?.WebColor || 'blue',
                          activeBarColor: colors[5]?.WebColor || 'blue',
                        },
                        {
                          name: 'Unsastifactory',
                          labelColor: colors[6]?.WebColor || 'darkblue',
                          activeBarColor: colors[6]?.WebColor || 'darkblue',
                        },
                        {
                          name: 'None',
                          labelColor: colors[7]?.WebColor || 'purple',
                          activeBarColor: colors[7]?.WebColor || 'purple',
                        },
                      ]
                    : [
                        {
                          name: 'Too Slow',
                          labelColor: 'green',
                          activeBarColor: 'green',
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
              /> */}
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: '60%',
                // marginTop: height * 0.03,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Timer  */}
              <Heading
                title="Timer"
                passedStyle={{
                  color: 'white',
                  fontSize: width * 0.05,
                  textAlign: "center"
                }}
                fontType="bold"
              />

              <Stopwatch
                laps
                msecs
                start={timer.stopwatchStart}
                reset={timer.stopwatchReset}
                options={{
                  container: {
                  },
                  text: {
                    fontSize: 22,
                    color: '#FFF',
                    // marginLeft: 7,
                    fontFamily: 'Montserrat-SemiBold',
                  },
                }}
                getTime={time => {
                  getFormattedTime(time)
                }}
              />
            </View>
            {/* 
            {showTextField && (
              <TextInput
                value={score}
                // value={parseInt(score)}
                keyboardType="numeric"
                textContentType="numeric"
                placeholder={`Enter Score 1- ${Value[7]?.MaxValue}`}
                placeholderTextColor={'grey'}
                style={styles.scoreFieldStyle}
                onChangeText={text => {
                  // if (parseInt(text) <= 100) {
                  setScore(text);
                  meterController(text);
                  // setMeterValue(text == 110 ? 200 : 100);
                  // }

                  if (parseInt(text) > Value[7]?.MaxValue) {
                    showMessage({
                      type: 'danger',
                      message: 'Score is exceeding the meter values.',
                    });
                    return;
                  }
                  setScore(text);
                }}
              />
            )} */}
            {showTextField > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setFlag(true)
                  resetStopwatch();
                  checkGame(false);
                  setSecs(0);
                  setScore('0');
                  setShowTextField(false);
                  setResultvalue({})
                }}
                style={{ ...styles.startBtnContainer, backgroundColor: themePurple, alignSelf: 'center', marginVertical: 10 }}>
                <Heading
                  title={'RESET'}
                  passedStyle={styles.startBtnStyle}
                  fontType="semi-bold"
                />
              </TouchableOpacity>
            )}
            {
              ITEM?.times?.UseSegment == 1 && (
                <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1) }}>
                  <View>
                    <Text style={{ color: 'white' }}>Distance To Red: {ITEM?.times?.DistanceToRed}</Text>
                  </View>
                </View>
              )
            }
            <View style={{ paddingBottom: 150 }} />
          </>
        )}
      </>
    );
  }

  const RenderimageDAta = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        !hasTimerStarted && setResultvalue(item)
        // setResultvalue(item)
      }} style={{ width: "25%", flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
      {Resultvalue.image == item.image && (
        <View style={{ position: 'absolute', zIndex: 1 }}>
          <CheckIcon name='check' color={"black"} size={30} />
        </View>
      )}
      <Animated.View
        style={{
          height: height * .095, width: width / 6,
          transform: [{ scale: Resultvalue.image == item.image ? fadeAnim : 1 }],
          opacity: Resultvalue.image == item.image ? fadeAnim : 1
        }}
      >
        <Image
          style={{ height: height * .095, width: width / 6, resizeMode: "contain" }}

          source={{
            uri:
              item.image === null ? "https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png" : `https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/${item.image}`
          }}
        />
      </Animated.View>
      {/* <Text style={{position:"absolute",color:"white",fontWeight:"500",marginLeft:width*.059,marginTop:height*.057,fontSize:width*.03}}>
      {item.image == null?"":item.MaxValue}
    </Text> */}
    </TouchableOpacity>
  );
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {
          ranges.map(it => {
            return <Animated.View
              style={{
                height: responsiveHeight(100),
                width: responsiveWidth(100),
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: it.image == Resultvalue.image ? fadeAnim2 : 0 }],
                opacity: it.image == Resultvalue.image ? fadeAnim2 : 0
              }}>
              <Image
                style={{ height: responsiveHeight(50), width: responsiveWidth(100), resizeMode: "contain", opacity: 0.75 }}

                source={{
                  uri:
                    Resultvalue.image === null ? "https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png" : `https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/${Resultvalue.image}`
                }}
              />
            </Animated.View>
          })
        }

        <Modal
          visible={errorModal}
          transparent={true}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, flex: 1 }}>
            <View style={{ backgroundColor: 'white', height: height / 3, width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 10 }}>

              <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', marginBottom: 10 }}>
                {`${Uservalue.Firstname} ${Uservalue.Lastname}`}
              </Text>
              <Text style={{ textAlign: 'center' }}>
                {`${Uservalue.Firstname} ${Uservalue.Lastname} can not participate more than three times`}
              </Text>
              <TouchableOpacity
                style={{ backgroundColor: 'black', padding: 5, borderRadius: 20, paddingHorizontal: 40, marginTop: 20 }}
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
                <Text style={{ color: 'white' }}>Next</Text>
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
        <FlatList
          nestedScrollEnabled={true}
          data={[1, 2]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            if (index == 0) {
              return renderHeader();
            } else {
              return renderData();
            }
          }}
        />
        {/* <KeepAwake/> */}
        {
          ITEM?.times?.UseSegment == 1 && (
            <View style={{ position: 'absolute', bottom: 20,right:20 }}>
              <Text style={{ color: "white" }}>Percentage: {ITEM?.dt_recorded.Percent}%</Text>
            </View>
          )
        }
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
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
    marginTop: height * 0.05,
    marginLeft: width * 0.05,
    backgroundColor: themeRed,
    borderRadius: width * 0.5,
    width: width * 0.3,
    justifyContent: 'center',
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
    marginTop: height * 0.038,
    // marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
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
  resetBtnContainer: {
    // marginTop: height * 0.1,
    marginLeft: width * 0.05,
    backgroundColor: themePurple,
    borderRadius: width * 0.5,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  startBtnContainer: {
    // marginTop: height * 0.05,
    // marginLeft: width * 0.05,

    backgroundColor: themeGreen,
    borderRadius: width * 0.5,
    width: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: height * 0.02,
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
    // paddingVertical: height * 0.01,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headingView: {
    maxWidth: '100%',
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
