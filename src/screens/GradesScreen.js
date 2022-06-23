import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  FlatList,
  ScrollView,
  Platform,
  RefreshControl,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
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

const {width, height} = Dimensions.get('window');

const GradesScreen = ({
  navigation,
  route,
  getGroupMembers,
  userReducer,
  getColors,
}) => {
  const ITEM = route.params.item;
  const GROUP_DATA = route.params.groupData;

  const accessToken = userReducer.accessToken;
  const [groupMembers, setGroupMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const apiData = {
    grade_id: GROUP_DATA?.id,
  };

  useEffect(() => {
    getAllGroupsMembers();
  }, []);

  useEffect(() => {
    setGroupMembers(userReducer?.groupMembers);
  }, [userReducer?.groupMembers]);

  const getAllGroupsMembers = async () => {
    setIsLoading(true);
    await getGroupMembers(apiData, accessToken);
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
      getAllGroupsMembers();
    });
  }, []);

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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={() => {
              return (
                groupMembers?.length === 0 && (
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
                    title={ITEM.Name}
                    passedStyle={styles.headingStyles}
                    fontType="semi-bold"
                  />
                </View>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={styles.filterLabelViewStyle}>
                    <Heading
                      title="Run Assessment"
                      passedStyle={styles.filterLabelStyle}
                      fontType="regular"
                    />
                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />
                    <Heading
                      title={ITEM?.Name}
                      passedStyle={styles.filterLabelStyle}
                      fontType="regular"
                    />
                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />
                    <Heading
                      title="Groups"
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />

                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />
                    <Heading
                      title={`${GROUP_DATA?.Name} - ${GROUP_DATA?.Abbr}`}
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />
                  </View>
                </ScrollView>
                {/* Colors  */}
                <ColoredFlatlist />
              </>
            }
            data={groupMembers}
            keyExtractor={({item, index}) => item?.id?.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (ITEM?.Type === 'Duration') {
                      navigation?.navigate('timeAssessment', {
                        item: ITEM,
                        childData: item,
                        groupData: GROUP_DATA,
                      });
                    } else if (ITEM?.Type === 'Distance') {
                      navigation?.navigate('scaleScreen', {
                        item: ITEM,
                        childData: item,
                        groupData: GROUP_DATA,
                      });
                    } else {
                      navigation?.navigate('gradingScreen', {
                        item: ITEM,
                        childData: item,
                        groupData: GROUP_DATA,
                      });
                    }
                  }}
                  style={[
                    index !== groupMembers?.length - 1 && {
                      borderBottomColor: 'silver',
                      borderBottomWidth: 1,
                    },
                    {
                      width: width * 0.9,
                      alignSelf: 'center',
                      zIndex: 999,
                      height: height * 0.07,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}>
                  <Heading
                    title={`${item?.Firstname} ${item?.Lastname}`}
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.04,
                      textTransform: 'capitalize',
                    }}
                    fontType="regular"
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(GradesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
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
    textTransform: 'capitalize',
  },
  rightIconStyle: {
    color: 'white',
    fontSize: width * 0.05,
    marginLeft: 5,
  },
  filterLabelViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    marginVertical: 10,
  },
  filterLabelStyle: {
    fontSize: width * 0.04,
    color: 'white',
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
});
