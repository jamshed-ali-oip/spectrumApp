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
  Platform,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import {
  themeBlue,
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import {template} from '@babel/core';
import IconComp from '../components/IconComp';
import ColoredFlatlist from '../components/ColoredFlatlist';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import LottieView from 'lottie-react-native';
import ParticipantFilterModal from '../components/ParticipantFilterModal';

const {width, height} = Dimensions.get('window');

const ParticipantsScreen = ({
  navigation,
  userReducer,
  getParticipants,
  getFilteredParticipants,
  getGroups,
}) => {
  const accessToken = userReducer.accessToken;
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Boys-Girls");

  useEffect(() => {
    getAllParticipants();
  }, []);

  useEffect(() => {
    setParticipants(userReducer?.participants);
  }, [userReducer?.participants]);

  const getAllParticipants = async () => {
    setIsLoading(true);
    await getParticipants(accessToken);
    await getGroups(accessToken);
    setIsLoading(false);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      getAllParticipants();
    });
  }, []);

  const filterParticipants = async (data) => {
    // setSelectedGender()

      if (data?.gender.length>1) {
        setSelectedGender("Boys-Girls")
      }
      else if(data?.gender[0]==0){
        setSelectedGender("Boys")
      }else{
        setSelectedGender("Girls")
      }
    // alert(JSON.stringify(data?.gender[0].gender));
    // data?.gender?.map((gender) => {
    // })
    const apiData = {
      age: data?.age,
      gender: data?.gender?.map(ele => {
        if (ele?.id === 1) {
          return 0;
        } else {
          return 1;
        }
      }),
      group_id: data?.group_id,
    };
    // console.log(apiData);
    setIsLoading(true);
    await getFilteredParticipants(data, accessToken, onSuccess);
  };

  const onSuccess = () => {
    setShowFilterModal(false);
    setIsLoading(false);
  };
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {/* Participants FlatList  */}
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
            contentContainerStyle={{paddingBottom: height * 0.1}}
            ListFooterComponent={() => {
              return (
                participants?.length === 0 && (
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: width * 0.02,
                      height: height * 0.1,
                      width: width * 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: height * 0.2,
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
            ListHeaderComponent={
              <>
                <View style={styles.headingView}>
                  <Heading
                    title={'PARTICIPANTS'}
                    passedStyle={styles.headingStyles}
                    fontType="semi-bold"
                  />
                </View>

                <TouchableOpacity
                  style={styles.selectFilterStyle}
                  onPress={() => setShowFilterModal(true)}>
                  <Heading
                    title="Select Filter"
                    passedStyle={styles.selectFilterTextStyle}
                    fontType="semi-bold"
                  />
                  <IconComp
                    iconName={'chevron-right'}
                    type="Feather"
                    passedStyle={styles.rightIconStyle}
                  />
                </TouchableOpacity>

                <View style={styles.filterLabelViewStyle}>
                  <Heading
                    title="Filter"
                    passedStyle={styles.filterLabelStyle}
                    fontType="regular"
                  />
                  <IconComp
                    iconName={'chevron-right'}
                    type="Feather"
                    passedStyle={styles.rightIconStyle}
                  />
                  <Heading
                    title="Gender - "
                    passedStyle={styles.filterLabelStyle}
                    fontType="regular"
                  />
                  <Heading
                    title={selectedGender}
                    passedStyle={styles.selectFilterTextStyle}
                    fontType="semi-bold"
                  />
                </View>

                {/* Colors  */}
                <ColoredFlatlist />
              </>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={participants}
            keyExtractor={({item, index}) => item?.id?.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation?.navigate('viewParticipants', {data: item})
                  }
                  style={{
                    width: width * 0.9,
                    alignSelf: 'center',
                    zIndex: 999,
                    borderBottomColor: 'silver',
                    borderBottomWidth: 1,
                    height: height * 0.07,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Heading
                    title={`${item?.Firstname} ${item?.Lastname}`}
                    passedStyle={{color: 'white', fontSize: width * 0.04}}
                    fontType="regular"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation?.navigate('viewParticipants', {data: item})
                      }
                      activeOpacity={0.9}>
                      <Image
                        source={require('../assets/images/cut-eye.png')}
                        style={{
                          width: width * 0.06,
                          height: height * 0.032,
                          marginRight: width * 0.02,
                        }}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
                      <Image
                        source={require('../assets/images/cut-pencil.png')}
                        style={{
                          width: width * 0.06,
                          height: height * 0.032,
                          marginRight: width * 0.02,
                        }}
                      />
                    </TouchableOpacity> */}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}

        <ParticipantFilterModal
          isModalVisible={showFilterModal}
          setIsModalVisible={setShowFilterModal}
          onPress={filterParticipants}
          showLoader={isLoading}
        />
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(ParticipantsScreen);
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
  btnStyle: {
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeLightBlue,
    alignSelf: 'center',
    width: width * 0.41,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-SemiBold',
  },
  selectFilterStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.05,
  },
  selectFilterTextStyle: {
    fontSize: width * 0.04,
    color: 'white',
  },
  rightIconStyle: {
    color: 'white',
    fontSize: width * 0.05,
    marginLeft: 5,
  },
  filterLabelViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.05,
    marginVertical: 10,
  },
  filterLabelStyle: {
    fontSize: width * 0.04,
    color: 'white',
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
    width: width * 0.55,
    marginBottom: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
});
