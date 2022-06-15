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
import React, {useState, useCallback, useEffect} from 'react';
import Heading from '../components/Heading';
import * as actions from '../store/actions';
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

const {width, height} = Dimensions.get('window');

const GroupsScreen = ({navigation, route, userReducer, getGroups}) => {
  const ITEM = route.params.item;
  const accessToken = userReducer.accessToken;
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllGroups();
  }, []);

  useEffect(() => {
    setGroups(userReducer?.groups);
  }, [userReducer?.groups]);

  const getAllGroups = async () => {
    setIsLoading(true);
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
      getAllGroups();
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
            ListHeaderComponent={
              <>
                <Heading
                  title={ITEM?.Name}
                  passedStyle={styles.headingStyles}
                  fontType="semi-bold"
                />

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
                </View>

                {/* Colors  */}
                <ColoredFlatlist />
              </>
            }
            data={groups}
            keyExtractor={({item, index}) => item?.id?.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation?.navigate('grades', {
                      item: {...ITEM, grade: `${item?.Name} - ${item?.Abbr}`},
                      id: item?.id,
                    })
                  }
                  style={[
                    index !== groups?.length - 1 && {
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
                    title={`${item?.Name} - ${item?.Abbr}`}
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
export default connect(mapStateToProps, actions)(GroupsScreen);

const styles = StyleSheet.create({
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
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: width * 0.07,
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
    width: width * 0.5,
    color: 'white',
    textTransform: 'uppercase',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    borderRadius: 25,
    paddingVertical: height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.1,
  },
});

const list = [
  {
    id: 1,
    name: 'Grade 1 - males',
  },
  {
    id: 2,
    name: 'Grade 2 - females',
  },
  {
    id: 3,
    name: 'Grade 2 - males',
  },
  {
    id: 4,
    name: 'Grade 3 - males',
  },
  {
    id: 5,
    name: 'Grade 3 - female',
  },
  {
    id: 6,
    name: 'Grade 4 - males',
  },
  {
    id: 7,
    name: 'Grade 4 - female',
  },
  {
    id: 8,
    name: 'Grade 5 - males',
  },
  {
    id: 9,
    name: 'Grade 5 - female',
  },
  {
    id: 10,
    name: 'Grade 6 - males',
  },
  {
    id: 11,
    name: 'Grade 6 - females',
  },
];
