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

const ParticipantsScreen = ({navigation}) => {
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
                title={'PARTICIPANTS'}
                passedStyle={styles.headingStyles}
                fontType="semi-bold"
              />
              <View style={styles.selectFilterStyle}>
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
              </View>

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
                  title="Male"
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
                onPress={() => navigation?.navigate('viewParticipants')}
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
                    <Image
                      source={require('../assets/images/cut-eye.png')}
                      style={{
                        width: width * 0.06,
                        height: height * 0.032,
                        marginRight: width * 0.02,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
                    <Image
                      source={require('../assets/images/cut-pencil.png')}
                      style={{
                        width: width * 0.06,
                        height: height * 0.032,
                        marginRight: width * 0.02,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ImageBackground>
    </>
  );
};

export default ParticipantsScreen;

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
    width: width * 0.45,
    color: 'white',
    backgroundColor: themeLightBlue,
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
    name: 'Lalit Beahan',
  },
  {
    id: 2,
    name: 'Aaron Sanford',
  },
  {
    id: 3,
    name: 'Emmitt Rohan',
  },
  {
    id: 4,
    name: 'Denis Schneider',
  },
  {
    id: 5,
    name: 'Virgie Volkman',
  },
  {
    id: 6,
    name: 'Zackery Reynolds',
  },
  {
    id: 7,
    name: 'Aaron Sanford',
  },
  {
    id: 8,
    name: 'Emmitt Rohan',
  },
  {id: 9, name: 'Virgie Volkman'},
  {
    id: 10,
    name: 'Denis Schneider',
  },
  {
    id: 11,
    name: 'Zackery Reynolds',
  },
  {
    id: 12,
    name: 'Aaron Sanford',
  },
];
