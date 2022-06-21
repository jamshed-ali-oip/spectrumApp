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
  RefreshControl,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
import {
  themeBlue,
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import * as actions from '../store/actions';
import IconComp from '../components/IconComp';
import ColoredFlatlist from '../components/ColoredFlatlist';
import ParticipantsMapper from '../components/ParticipantsMapper';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const ViewParticipants = ({
  navigation,
  route,
  getPastAssessment,
  userReducer,
  getColors,
}) => {
  const DATA = route.params.data;
  const accessToken = userReducer.accessToken;
  const [pastAssessments, setPastAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const apiData = {
    id: DATA?.id,
  };

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    setPastAssessments(userReducer?.pastAssessment);
  }, [userReducer?.pastAssessment]);

  const getDetail = async () => {
    setIsLoading(true);
    await getPastAssessment(apiData, accessToken);
    await getColors(accessToken);
    setIsLoading(false);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      getDetail();
    });
  }, []);

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
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={
              <>
                <View style={styles.headingView}>
                  <Heading
                    title={'VIEW PARTICIPANTS'}
                    passedStyle={styles.headingStyles}
                    fontType="semi-bold"
                  />
                </View>

                {/* Participants Head View  */}
                <View style={styles.participantsViewStyle}>
                  <Heading
                    title="Participants"
                    passedStyle={styles.participantsLabelStyle}
                    fontType="regular"
                  />
                  <IconComp
                    iconName={'chevron-right'}
                    type="Feather"
                    passedStyle={styles.iconStyle}
                  />
                  <Heading
                    title={`${DATA?.Firstname} ${DATA?.Lastname}`}
                    passedStyle={styles.participantsLabelStyle}
                    fontType="semi-bold"
                  />
                </View>

                {/* Colors  */}
                <ColoredFlatlist />

                {/* Age  */}
                <TouchableOpacity
                  style={{
                    backgroundColor: themeDarkBlue,
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.07,
                    marginTop: height * 0.02,
                  }}>
                  <Heading
                    title="Age"
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.045,
                      marginLeft: width * 0.06,
                    }}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={DATA?.Age}
                    passedStyle={{
                      color: 'white',
                      marginLeft: width * 0.18,
                      fontSize: width * 0.045,
                    }}
                    fontType="regular"
                  />
                </TouchableOpacity>

                {/* Grade  */}
                <TouchableOpacity
                  style={{
                    backgroundColor: themeDarkBlue,
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.07,
                    marginTop: height * 0.02,
                  }}>
                  <Heading
                    title="Grade"
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.045,
                      marginLeft: width * 0.06,
                    }}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={DATA?.grade_name}
                    passedStyle={{
                      color: 'white',
                      marginLeft: width * 0.14,
                      fontSize: width * 0.045,
                    }}
                    fontType="regular"
                  />
                </TouchableOpacity>

                {/* Gender  */}
                <TouchableOpacity
                  style={{
                    backgroundColor: themeDarkBlue,
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.07,
                    marginTop: height * 0.02,
                  }}>
                  <Heading
                    title="Gender"
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.045,
                      marginLeft: width * 0.06,
                    }}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={DATA?.Gender == '0' ? 'Male' : 'Female'}
                    passedStyle={{
                      color: 'white',
                      marginLeft: width * 0.1,
                      fontSize: width * 0.045,
                    }}
                    fontType="regular"
                  />
                </TouchableOpacity>

                {/* <Heading
                title={'PAST ASSESSMENTS'}
                passedStyle={styles.pastAssessmentHeadingStyles}
                fontType="semi-bold"
              /> */}

                <View
                  style={[
                    styles.headingView,
                    {
                      backgroundColor: themeFerozi,
                      marginTop: height * 0.05,
                      marginBottom: 20,
                    },
                  ]}>
                  <Heading
                    title={'PAST ASSESSMENTS'}
                    passedStyle={[
                      styles.headingStyles,
                      {backgroundColor: themeFerozi},
                    ]}
                    fontType="semi-bold"
                  />
                </View>
              </>
            }
            ListFooterComponent={() => {
              return (
                pastAssessments?.length === 0 && (
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: width * 0.02,
                      height: height * 0.1,
                      width: width * 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // marginTop:height * 0.2,
                      alignSelf: 'center',
                    }}>
                    <Heading
                      title="No Record, Swipe Down To Refresh"
                      passedStyle={{fontSize: width * 0.045, color: 'white'}}
                      fontType="semi-bold"
                    />
                  </View>
                )
              );
            }}
            // data={[
            //   {
            //     id: 2,
            //     Name: '24 Meter Dash',
            //     MaxParticipants: 1,
            //     Image: 'sprinting_1655459240.png',
            //     Sort: 3,
            //     Status: 0,
            //     created_at: '2022-06-10T15:07:13.000000Z',
            //     updated_at: '2022-06-17T09:47:20.000000Z',
            //     color_code: '#3528c3',
            //     color_id: 2,
            //   },
            //   {
            //     id: 3,
            //     Name: 'Speed Octagon',
            //     MaxParticipants: 15,
            //     Image: 'hurdles_1655459445.png',
            //     Sort: 5,
            //     Status: 0,
            //     created_at: '2022-06-10T15:11:02.000000Z',
            //     updated_at: '2022-06-17T09:50:45.000000Z',
            //     color_code: '#3528c3',
            //     color_id: 2,
            //   },
            // ]}
            data={pastAssessments}
            keyExtractor={({item, index}) => item?.id?.toString()}
            contentContainerStyle={{paddingBottom: height * 0.1}}
            renderItem={({item, index}) => (
              <ParticipantsMapper
                item={item}
                index={index}
              />
            )}
          />
        )}
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(ViewParticipants);

const styles = StyleSheet.create({
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  headingStyles: {
    color: 'white',
    backgroundColor: themeLightBlue,
    fontSize: width * 0.045,
    paddingVertical: height * 0.01,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  headingView: {
    backgroundColor: themeLightBlue,
    borderRadius: width * 0.05,
    width: width * 0.57,
    marginBottom: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  pastAssessmentHeadingStyles: {
    width: width * 0.55,
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.04,
    borderRadius: 25,
    paddingVertical: height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.01,
  },
  participantsViewStyle: {
    marginVertical: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.05,
  },
  participantsLabelStyle: {
    fontSize: width * 0.04,
    color: 'white',
    textTransform: 'capitalize',
  },
  iconStyle: {
    color: 'white',
    fontSize: width * 0.05,
    marginLeft: 5,
  },
});

const colors = [
  {
    id: 1,
    color: '#E5306D',
  },

  {
    id: 2,
    color: '#EF4A37',
  },
  {
    id: 3,
    color: '#F17A29',
  },
  {
    id: 4,
    color: '#E4C546',
  },
  {
    id: 5,
    color: '#40C0C9',
  },
  {
    id: 6,
    color: '#6592CD',
  },
  {
    id: 7,
    color: '#704FA0',
  },
];

const list = [
  {
    id: 1,
    name: 'Long Jump',
    image: require('../assets/images/long-jump.png'),
    colors: [
      {
        id: 1,
        color: '#E5306D',
      },

      {
        id: 2,
        color: '#EF4A37',
      },
      {
        id: 3,
        color: '#F17A29',
      },
      {
        id: 4,
        color: '#E4C546',
      },
      {
        id: 5,
        color: '#40C0C9',
      },
      {
        id: 6,
        color: '#6592CD',
      },
      {
        id: 7,
        color: '#704FA0',
      },
    ],
  },
  {
    id: 2,
    name: 'Sprinting',
    image: require('../assets/images/sprinting.png'),
    colors: [
      {
        id: 1,
        color: '#E5306D',
      },

      {
        id: 2,
        color: '#EF4A37',
      },
      {
        id: 3,
        color: '#F17A29',
      },
      {
        id: 4,
        color: '#E4C546',
      },
      {
        id: 5,
        color: '#40C0C9',
      },
      {
        id: 6,
        color: '#6592CD',
      },
      {
        id: 7,
        color: '#704FA0',
      },
    ],
  },
  {
    id: 3,
    name: 'Shot Put',
    image: require('../assets/images/shot-put.png'),
    colors: [
      {
        id: 1,
        color: '#E5306D',
      },

      {
        id: 2,
        color: '#EF4A37',
      },
      {
        id: 3,
        color: '#F17A29',
      },
      {
        id: 4,
        color: '#E4C546',
      },
      {
        id: 5,
        color: '#40C0C9',
      },
      {
        id: 6,
        color: '#6592CD',
      },
      {
        id: 7,
        color: '#704FA0',
      },
    ],
  },
  {
    id: 4,
    name: 'Hurdles',
    image: require('../assets/images/hurdles.png'),
    colors: [
      {
        id: 1,
        color: '#E5306D',
      },

      {
        id: 2,
        color: '#EF4A37',
      },
      {
        id: 3,
        color: '#F17A29',
      },
      {
        id: 4,
        color: '#E4C546',
      },
      {
        id: 5,
        color: '#40C0C9',
      },
      {
        id: 6,
        color: '#6592CD',
      },
      {
        id: 7,
        color: '#704FA0',
      },
    ],
  },
];
