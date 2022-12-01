import Modal from 'react-native-modal';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Heading from './Heading';
import Inputbox from './Inputbox';
import LottieView from 'lottie-react-native';
import Button from './Button';
import {
  themeBlue,
  themeDarkBlue,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import IconComp from './IconComp';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../config';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

const ParticipantFilterModal = ({
  isModalVisible,
  setIsModalVisible,
  buttonText,
  onPress,
  showLoader,
  userReducer,
  setFields
}) => {
  const [age, setAge] = useState(0);
  const [grade, setGrade] = useState(0);
  const [gradeCounter, setGradeCounter] = useState([]); // array od grades
  const [selectedGrade, setSelectedGrade] = useState(); // selected grade
  const [counter, setCounter] = useState(0);
  const [event, setevent] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [Grades, setGrades] = useState([]);
  const [selectedGroupsData, setGroupsData] = useState([]);
  const [selectedboth, setSelectedboth] = useState(false);
  const [selectedgirl, setSelectedgirl] = useState(false);
  const [selectedboy, setSelectedboy] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Both");
  const [selectedGender1, setSelectedGender1] = useState("Both");

  const [gradeAll, setGradeAll] = useState(true);
  const [allGroud, setAllGroup] = useState(false);

  const [Eventdata, setEventdata] = useState([]);
  // console.log("EventData", Eventdata)
  // console.log("seklected event", selectedEvent)

  // console.log("userReducer.groups", userReducer.groups);
  // console.log("Grades", Grades);
  // console.log("selectedGroupsData", selectedGroupsData);
  // console.log("counter selectedGroupsData", selectedGroupsData[counter]);
  // console.log("selectedGrade", selectedGrade);
  // console.log("counter", counter);
  // console.log("myyy data =?????????", age)
  useEffect(() => {
    if (userReducer?.groups && selectedGrade && selectedGrade.id) {
      setGroupsData(
        userReducer?.groups?.filter(group =>
          group.grade_id.includes(`${selectedGrade.id}`),
        ) || [],
      )
    }
  }, [selectedGrade]);
  // console.log("first grdae data", Grades)
  useEffect(() => {
    if (selectedGroupsData[counter] && selectedGroupsData[counter].group_type) {
      setSelectedGender(selectedGroupsData[counter].group_type || "Not Possible")
    }
  }, [counter])
  useEffect(() => {
    Event()
  }, [])

  useEffect(() => {
    setSelectedEvent(Eventdata[0]);
  }, [Eventdata])

  const Event = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`${baseUrl}/api/event`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.success){
          setEventdata(result.data)
        }
      })
    // .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchCall();
    if (userReducer?.groups?.length > 0) {
      setGrade(userReducer?.groups[counter]);
    }
  }, [userReducer?.groups]);

  // console.log("aaaaaaaaa")

  const fetchCall = async () => {
    const URL = `${baseUrl}/api/grade`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 22|lNXltijPdHHOyVPYSxlmgiym5OLPjenZOFZcRYhO`,
      },
    };
    const response = await axios.get(URL, headers);
    setGrades(response.data.data);
    setSelectedGrade(response.data.data.find(o => o.id === age + 1));
  };

  const gradeHandlerGrade = param => {
    if (param == 'decrease') {
      setAge((age) => age - 1);
      setSelectedGrade(Grades.find(o => o.id === age - 1));
      setCounter(0)
    } else {
      setAge((age) => age + 1);
      setSelectedGrade(Grades.find(o => o.id === age + 1));
      setCounter(0)
    }
  };
  const eventhandle = param => {
    if (param == 'decrease') {
      setevent((event) => event - 1);
    } else {
      setevent((event) => event + 1);
    }
  };
  useEffect(() => {
    setSelectedEvent(Eventdata[event]);
  }, [event])

  useEffect(()=>{
    if(allGroud){
      // alert(JSON.stringify(selectedGroupsData))
      let fem=false
      let mal=false
      let bo=false

      selectedGroupsData
      .map(it=>it.group_type)
      .forEach(it=>{
        if(it=="Female"){
          fem=true
        }else if(it=="Male"){
          mal=true
        }
        else if(it=="Both"){
          bo=true
        }
      })

      if(bo){
        setSelectedGender1("Both")
        return
      }
      else if(fem && mal){
        setSelectedGender1("Both")
        return 
      }
      else if(fem){
        setSelectedGender1("Female")
        return
      }
      else if(mal){
        setSelectedGender1("Male")
        return
      }

    }
  },[allGroud])


  function renderGenders(group) {
    if ((allGroud?selectedGender1:group?.group_type) == "Both") {
      return (
        <>
          {/* All */}
          <View style={{
            // paddingVertical: height * -0.01,
            // paddingBottom:-10,
            marginBottom: height * 0.02,
            borderWidth: 1,
            borderColor: themeLightBlue,
            borderRadius: 10,
            width: width * 0.8,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight:width*0.05
          }}>
            <Heading
              passedStyle={[styles.label, { marginBottom: -height * 0.03 }]}
              title={'Gender'}
              fontType="medium"
            />
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 20, paddingLeft: width * .15, marginBottom: -height * .03 }}>

              <TouchableOpacity
                activeOpacity={0.9}
                // onPress={() => onPressGender({id: 3, gender: 'Both'})}
                onPress={() => {
                  setSelectedGender("Both")
                }}
                style={styles.checkBoxContainer}>
                <IconComp
                  type={'MaterialIcons'}
                  iconName={
                    // selectedGroupsData.filter(f=>(f.group_type =="Both"))
                    selectedGender == "Both"
                      ? 'check-circle'
                      : 'radio-button-unchecked'
                  }
                  passedStyle={styles.textLAbel}
                />
                <Heading
                  passedStyle={styles.label}
                  title={'All'}
                  fontType="medium"
                />
              </TouchableOpacity>

              {/* Male */}
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.checkBoxContainer}
                onPress={() => {
                  setSelectedGender("Male")
                }}>
                <IconComp
                  type={'MaterialIcons'}
                  iconName={
                    // selectedGenders[0]?.id === 1 || selectedGenders[1]?.id === 1
                    selectedGender == "Male"
                      ? 'check-circle'
                      : 'radio-button-unchecked'
                  }
                  passedStyle={styles.textLAbel}
                />
                <Heading
                  passedStyle={styles.label}
                  title={'Male'}
                  fontType="medium"
                />
              </TouchableOpacity>


              {/* Female */}
              <TouchableOpacity
                activeOpacity={0.9}
                // onPress={() => onPressGender({id: 2, gender: 'Girls'})}
                onPress={() => {
                  setSelectedGender("Female")
                }}
                style={styles.checkBoxContainer}>
                <IconComp
                  type={'MaterialIcons'}
                  iconName={
                    // selectedGenders[0]?.id === 2 || selectedGenders[1]?.id === 2
                    selectedGender == "Female"
                      ? 'check-circle'
                      : 'radio-button-unchecked'
                  }
                  passedStyle={styles.textLAbel}
                />
                <Heading
                  passedStyle={styles.label}
                  title={'Female'}
                  fontType="medium"
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )
    }
    else {
      // setSelectedGender("Hello")
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          // onPress={() => onPressGender({id: 3, gender: 'Both'})}
          onPress={() => {
            // setSelectedboy(false)
            // setSelectedboth(true)
            // setSelectedgirl(false)
          }}
          style={styles.checkBoxContainer}>
          <IconComp
            type={'MaterialIcons'}
            iconName={
              // selectedGroupsData.filter(f=>(f.group_type =="Both"))
              true
                ? 'check-circle'
                : 'radio-button-unchecked'
            }
            passedStyle={styles.textLAbel}
          />
          {/* {alert(group?.group_type)} */}
          <Heading
            passedStyle={styles.label}
            title={allGroud?selectedGender1:group?.group_type}
            fontType="medium"
          />
        </TouchableOpacity>
      )
    }
  }

  return (
    <View>
      <StatusBar translucent={false} backgroundColor="black" />
      <Modal isVisible={isModalVisible}>
        <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center',alignItems:'center'}}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

            {/* event selector */}
            <View style={styles.filterContainer}>
              <Heading
                passedStyle={styles.label}
                title={'Event'}
                fontType="medium"
              />
              <View style={styles.rowView}>
                <TouchableOpacity
                  disabled={event <= 0}
                  onPress={() => {
                    eventhandle('decrease');
                  }}>
                  <IconComp
                    type={'Feather'}
                    iconName={'minus-circle'}
                    passedStyle={styles.textLAbel}
                  />
                </TouchableOpacity>
                <Heading
                  passedStyle={[styles.label, { marginHorizontal: width * 0.03 }]}
                  title={selectedEvent?.name?.slice(0,12)+'...' || "Nill"}
                  fontType="medium"
                />
                <TouchableOpacity
                  disabled={event >= (Eventdata?.length - 1)}
                  onPress={() => {
                    eventhandle('incress');
                  }}>
                  <IconComp
                    type={'Feather'}
                    iconName={'plus-circle'}
                    passedStyle={styles.textLAbel}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{
              paddingVertical: height * 0.001,
              marginBottom: height * 0.02,
              borderWidth: 1,
              borderColor: themeLightBlue,
              borderRadius: 10,
              width: width * 0.8,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setAllGroup(!allGroud)
                }}
                style={[styles.checkBoxContainer, { marginBottom: -height * .003 }]}>
                <IconComp
                  type={'MaterialIcons'}
                  iconName={
                    allGroud
                      ? 'check-circle'
                      : 'radio-button-unchecked'
                  }
                  passedStyle={styles.textLAbel}
                />
                <Heading
                  passedStyle={styles.label}
                  title={'All Groups'}
                  fontType="medium"
                />
              </TouchableOpacity>
            </View>
            {/* Group  */}
            {!allGroud &&(
              <View style={styles.filterContainer}>
              <Heading
                passedStyle={styles.label}
                title={'Group'}
                fontType="medium"
              />

              <View style={styles.rowView}>
                <TouchableOpacity
                  onPress={() => {
                    if (counter > 0) {
                      setCounter(counter - 1);
                    }
                  }}>
                  <IconComp
                    type={'Feather'}
                    iconName={'minus-circle'}
                    passedStyle={styles.textLAbel}
                  />
                </TouchableOpacity>
                <Heading
                  passedStyle={[styles.label, { marginHorizontal: width * 0.03 }]}
                  title={selectedGroupsData[counter]?.Name || "Unknow"}
                  fontType="medium"
                />

                <TouchableOpacity
                  onPress={() => {
                    if (counter < selectedGroupsData.length - 1) {
                      setCounter(counter + 1);
                    }
                  }}>
                  <IconComp
                    type={'Feather'}
                    iconName={'plus-circle'}
                    passedStyle={styles.textLAbel}
                  />
                </TouchableOpacity>
              </View>
            </View>
            )}

            {/* Grade  */}
            {/* <View style={{
              paddingVertical: height * 0.001,
              marginBottom: height * 0.02,
              borderWidth: 1,
              borderColor: themeLightBlue,
              borderRadius: 10,
              width: width * 0.8,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setGradeAll(!gradeAll)
                }}
                style={[styles.checkBoxContainer, { marginBottom: -height * .003 }]}>
                <IconComp
                  type={'MaterialIcons'}
                  iconName={
                    gradeAll
                      ? 'check-circle'
                      : 'radio-button-unchecked'
                  }
                  passedStyle={styles.textLAbel}
                />
                <Heading
                  passedStyle={styles.label}
                  title={'All Grades'}
                  fontType="medium"
                />
              </TouchableOpacity>
            </View> */}

            
            {/* {!gradeAll && (
              <View style={styles.filterContainer}>
                <Heading
                  passedStyle={styles.label}
                  title={'Grade'}
                  fontType="medium"
                />
                <View style={styles.rowView}>
                  <TouchableOpacity
                    disabled={age <= 1}
                    onPress={() => {
                      gradeHandlerGrade('decrease');
                    }}>
                    <IconComp
                      type={'Feather'}
                      iconName={'minus-circle'}
                      passedStyle={styles.textLAbel}
                    />
                  </TouchableOpacity>
                  <Heading
                    passedStyle={[styles.label, { marginHorizontal: width * 0.03 }]}
                    title={selectedGrade?.Name || "Not Possible"}
                    fontType="medium"
                  />
                  <TouchableOpacity
                    disabled={age >= 10}
                    onPress={() => {
                      gradeHandlerGrade('incress');
                    }}>
                    <IconComp
                      type={'Feather'}
                      iconName={'plus-circle'}
                      passedStyle={styles.textLAbel}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )} */}


          </View>
          {/* <Heading
            passedStyle={[styles.label, {marginLeft: width * 0.03}]}
            title={'Gender'}
            fontType="medium"
          /> */}
          {/* {selectedGroupsData.filter(group => group.group_type == 'Both') ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginLeft: width * 0.05,
              }}>
              {selectedGroupsData.length>1&&(
                <>
                {renderGenders(selectedGroupsData[counter])}
                </>
              )}
            </View>
          ) : (
            <Text>nill</Text>
          )} */}



          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginLeft: width * 0.05,
            }}>
            {
              selectedGroupsData.length ? (
                <>
                  {renderGenders(selectedGroupsData[counter])}
                </>
              ) :null
              // ) : <Text>Something went wrong!</Text>
            }
          </View> */}


          {/* Buttons Container  */}
          <View style={styles.flexRow}>
            {showLoader ? (
              <View style={styles.requestingView}>
                <LottieView
                  speed={1}
                  style={styles.lottieStyle}
                  autoPlay
                  loop
                  source={require('../assets/lottie/color-loader.json')}
                />
                <Heading
                  title="Please Wait..."
                  passedStyle={styles.requestLabel}
                  fontType="medium"
                />
              </View>
            ) : (
              <>
                <Button
                  title={buttonText || 'OK'}
                  onBtnPress={() => {
                    if (onPress) {
                      setFields({
                        event:selectedEvent?.name,
                        gender:selectedGender,
                        group:allGroud?"All":selectedGroupsData[counter]?.Name,
                        grade:gradeAll?"All":selectedGrade?.Name
                      })
                      onPress({
                        grade_id: selectedGrade?.id,
                        gender: selectedGender || selectedGroupsData[counter]?.group_type || "Both",
                        group_id: selectedGroupsData[counter]?.id,
                        GROUP_DATA: selectedGroupsData[counter],
                        gradeAll,
                        allGroud,
                        event: selectedEvent || "not selected"
                      });
                      setIsModalVisible(false);
                    } else {
                      setIsModalVisible(false);
                    }
                  }}
                  isBgColor={false}
                  btnStyle={styles.btnStyle}
                  btnTextStyle={styles.btnTextStyle}
                />
                {/* <Button
                  title="CANCEL"
                  onBtnPress={() => {
                    setIsModalVisible(false);
                  }}
                  isBgColor={false}
                  btnStyle={styles.cancelBtnStyle}
                  btnTextStyle={styles.cancelBtnTextStyle}
                /> */}
              </>
            )}
          </View>
        </View>
        </ScrollView>
      </Modal>
    </View>
  );
};
const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, null)(ParticipantFilterModal);

const styles = StyleSheet.create({
  textLAbel: { color: themeLightBlue, fontSize: width * 0.08 },
  rowView: { flexDirection: 'row', alignItems: 'center' },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    marginBottom: height * 0.025,
    width: width * 0.35,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  label: {
    color: 'black',
    fontSize: width * 0.04,
  },
  message: {
    color: 'grey',
    fontSize: width * 0.04,
    marginVertical: height * 0.02,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: width * 0.8,
    fontSize: width * 0.04,
    marginLeft: 0,
    paddingLeft: 0,
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: themeLightBlue,
    borderRadius: width * 0.025,
    width: width * 0.7,
    margin: 0,
  },
  filterContainer: {
    paddingVertical: height * 0.01,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: themeLightBlue,
    borderRadius: 10,
    width: width * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cancelBtnStyle: {
    borderRadius: width * 0.025,
    width: width * 0.35,
    borderWidth: 1,
    borderColor: themeLightBlue,
    margin: 0,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.045,
    // fontFamily: 'Poppins-SemiBold',
  },
  cancelBtnTextStyle: {
    color: themeLightBlue,
    // fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    // width: width * 0.75,
    minWidth: width * 0.75,
  },
  inputField: {
    marginVertical: height * 0.03,
    height: height * 0.23,
    // backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.2,
    borderColor: themeLightBlue,
    borderRadius: width * 0.05,
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.025,
    textAlignVertical: 'top',
    // fontFamily: 'Poppins-Regular',
  },
  requestingView: {
    backgroundColor: themeLightBlue,
    borderRadius: width * 0.025,
    // paddingVertical: height * 0.015,
    width: width * 0.75,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: themeLightBlue,
  },
  lottieStyle: {
    height: height * 0.07,
    // position: 'absolute',
    // marginTop: -30,
    // top: height * 0.005,
    // left: width * 0.01,
  },
  requestLabel: {
    color: 'white',
    fontSize: width * 0.05,
    // marginLeft: width * 0.08,
    // fontFamily: 'Poppins-SemiBold',
  },
});
