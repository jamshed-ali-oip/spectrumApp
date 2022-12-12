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
  const [counter, setCounter] = useState(0);
  const [counterGe, setCounterGe] = useState(0);
  const [counterGa, setCounterGa] = useState(0);

  const [selectedGroupsData, setGroupsData] = useState([]);
  const [allGroud, setAllGroup] = useState(false);
  const [allGender, allGenderSet] = useState(false);
  const [allGrade, setAllGrade] = useState(false);


  useEffect(() => {
    if (userReducer?.groups) {
      setGroupsData(
        userReducer?.groups
      )
    }
  }, []);


  return (
    <View>
      <StatusBar translucent={false} backgroundColor="black" />
      <Modal isVisible={isModalVisible}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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
              {!allGroud && (
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
                      title={selectedGroupsData[counter]?.Name || "Unavailable"}
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
            </View>
            {!allGroud && (
              <>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
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
                        setAllGrade(!allGrade)
                      }}
                      style={[styles.checkBoxContainer, { marginBottom: -height * .003 }]}>
                      <IconComp
                        type={'MaterialIcons'}
                        iconName={
                          allGrade
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
                  </View>
                  {!allGrade && (
                    <View style={styles.filterContainer}>
                      <Heading
                        passedStyle={styles.label}
                        title={'Grade'}
                        fontType="medium"
                      />

                      <View style={styles.rowView}>
                        <TouchableOpacity
                          onPress={() => {
                            if (counterGa > 0) {
                              setCounterGa(counterGa - 1);
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
                          title={selectedGroupsData[counter]?.group_grade[counterGa].grade.Name || "Unavailable"}
                          fontType="medium"
                        />

                        <TouchableOpacity
                          onPress={() => {
                            if (counterGa < selectedGroupsData[counter]?.group_grade.length - 1) {
                              setCounterGa(counterGa + 1);
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
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
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
                        allGenderSet(!allGender)
                      }}
                      style={[styles.checkBoxContainer, { marginBottom: -height * .003 }]}>
                      <IconComp
                        type={'MaterialIcons'}
                        iconName={
                          allGender
                            ? 'check-circle'
                            : 'radio-button-unchecked'
                        }
                        passedStyle={styles.textLAbel}
                      />
                      <Heading
                        passedStyle={styles.label}
                        title={'All Genders'}
                        fontType="medium"
                      />
                    </TouchableOpacity>
                  </View>
                  {!allGender && (
                    <View style={styles.filterContainer}>
                      <Heading
                        passedStyle={styles.label}
                        title={'Gender'}
                        fontType="medium"
                      />

                      <View style={styles.rowView}>
                        <TouchableOpacity
                          onPress={() => {
                            if (counterGe > 0) {
                              setCounterGe(counterGe - 1);
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
                          title={selectedGroupsData[counter]?.group_gender[counterGe]?.gender.Gender || "Unavailable"}
                          fontType="medium"
                        />

                        <TouchableOpacity
                          onPress={() => {
                            if (counterGa < selectedGroupsData[counter]?.group_gender.length - 1) {
                              setCounterGe(counterGe + 1);
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
                </View>
              </>
            )}
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
                          gender: allGender ||allGroud ? "All" : selectedGroupsData[counter]?.group_gender[0].gender.Gender,
                          group: allGroud ? "All" : selectedGroupsData[counter]?.Name,
                          grade: allGrade || allGroud ? "All" : selectedGroupsData[counter]?.group_grade[0].grade.Name,
                        })
                        onPress({
                          gender: allGender ? "All" : selectedGroupsData[counter]?.group_gender[0],
                          group: allGroud ? "All" : selectedGroupsData[counter]?.Name,
                          grade: allGender ? "All" : selectedGroupsData[counter]?.group_grade[0],
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
