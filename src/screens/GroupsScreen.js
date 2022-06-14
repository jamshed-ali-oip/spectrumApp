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
} from 'react-native';
import React, {useState} from 'react';
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

const {width, height} = Dimensions.get('window');

const GroupsScreen = ({navigation, route}) => {
  const ITEM = route.params.item;
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {/* Participants FlatList  */}
        <FlatList
          contentContainerStyle={{paddingBottom: height * 0.1}}
          ListHeaderComponent={
            <>
              <Heading
                title={ITEM?.name}
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
                  title={ITEM?.name}
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
          data={list}
          keyExtractor={({item, index}) => item?.id?.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('grades', {item: {...ITEM, grade: item.name}})
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
                  title={item?.name}
                  passedStyle={{color: 'white', fontSize: width * 0.04}}
                  fontType="regular"
                />
              </TouchableOpacity>
            );
          }}
        />
      </ImageBackground>
    </>
  );
};

export default GroupsScreen;

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
