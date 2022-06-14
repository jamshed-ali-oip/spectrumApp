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
import ParticipantsMapper from '../components/ParticipantsMapper';

const {width, height} = Dimensions.get('window');

const ViewParticipants = () => {
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <>
              <Heading
                title={'VIEW PARTICIPANTS'}
                passedStyle={styles.headingStyles}
                fontType="semi-bold"
              />
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
                  title="Lalit Beahan"
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
                  title="8"
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
                  title="1"
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
                  title="Male"
                  passedStyle={{
                    color: 'white',
                    marginLeft: width * 0.1,
                    fontSize: width * 0.045,
                  }}
                  fontType="regular"
                />
              </TouchableOpacity>

              <Heading
                title={'PAST ASSESSMENTS'}
                passedStyle={styles.pastAssessmentHeadingStyles}
                fontType="semi-bold"
              />
            </>
          }
          data={list}
          keyExtractor={({item, index}) => item?.id?.toString()}
          contentContainerStyle={{paddingBottom: height * 0.1}}
          renderItem={({item, index}) => (
            <ParticipantsMapper item={item} index={index} />
          )}
        />
      </ImageBackground>
    </>
  );
};

export default ViewParticipants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  headingStyles: {
    width: width * 0.6,
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
