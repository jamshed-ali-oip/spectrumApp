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
  ScrollView,
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
import Square from '../assets/svg/square.svg';

const {width, height} = Dimensions.get('window');

const GradingSystem = ({navigation, route}) => {
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Heading
            title={`LONG JUMP`}
            passedStyle={styles.headingStyles}
            fontType="semi-bold"
          />

          <Image
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={styles.bgimage}
          />
          {/* Grade  */}
          <Heading
            title={'Grade-6 Male'}
            passedStyle={styles.headingStyles2}
            fontType="regular"
          />

          {/* Child Name  */}
          <Heading
            title={'Lalit Beahan'}
            passedStyle={styles.headingStyles2}
            fontType="regular"
          />

          <View style={styles.gradeContainer}>
            <Image
              source={require('../assets/images/black.png')}
              style={styles.gradeimage}
              resizeMode={'contain'}
            />
            <Image
              source={require('../assets/images/red.png')}
              style={styles.gradeimage}
              resizeMode={'contain'}
            />
            <Image
              source={require('../assets/images/yellow.png')}
              style={styles.gradeimage}
              resizeMode={'contain'}
            />
            <Image
              source={require('../assets/images/pink.png')}
              style={styles.gradeimage}
              resizeMode={'contain'}
            />
            <Image
              source={require('../assets/images/lightblue.png')}
              style={styles.gradeimage}
              resizeMode={'contain'}
            />
            <Image
              source={require('../assets/images/orange.png')}
              style={styles.gradeimage}
              resizeMode={'contain'}
            />
            <Image
              source={require('../assets/images/darkblue.png')}
              style={styles.gradeimage}
              resizeMode={'contain'}
            />
            <Image
              source={require('../assets/images/purple.png')}
              style={styles.gradeimage}
              resizeMode={'contain'}
            />
          </View>
          <Image
            source={require('../assets/images/yellow.png')}
            style={styles.taskimage}
            //   resizeMode={'contain'}
          />
          <TouchableOpacity
            onPress={() => {
              alert("Finished Screens.")
            }}
            style={styles.savebtn}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default GradingSystem;

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
  headingStyles: {
    width: width * 0.6,
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    borderRadius: 25,
    paddingVertical: height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
  },
  headingStyles2: {
    color: 'white',
    backgroundColor: themeDarkBlue,
    textAlign: 'center',
    borderRadius: 25,
    width: width * 0.9,
    alignSelf: 'center',
    textTransform: 'capitalize',
    fontSize: width * 0.045,
    marginTop: height * 0.02,
    paddingVertical: height * 0.02,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-SemiBold',
  },
  jumpbtn: {
    width: width * 0.5,
    height: height * 0.05,
    backgroundColor: '#16c4bc',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 100,
    justifyContent: 'center',
  },
  jumpText: {
    textAlign: 'center',
    fontSize: width * 0.042,
    fontWeight: '900',
    color: 'white',
  },
  bgimage: {
    marginBottom: height * 0.02,
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
  },
  Button: {
    width: width * 0.85,
    height: height * 0.06,
    backgroundColor: '#000b2d',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 100,
    justifyContent: 'center',
  },
  Text: {
    textAlign: 'center',
    fontSize: width * 0.042,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 3,
  },
  gradeimage: {
    marginBottom: height * 0.02,
    width: width * 0.07,
    height: height * 0.07,
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  taskimage: {
    height: height * 0.12,
    width: width * 0.2,
    marginLeft: width * 0.09,
    marginTop: 20,
  },
  savebtn: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#16c4bc',
    alignSelf: 'flex-start',
    marginLeft: 20,
    borderRadius: 100,
    justifyContent: 'center',
    elevation: 5,
    marginBottom:50,
  },
  saveText: {
    textAlign: 'center',
    fontSize: width * 0.038,
    fontWeight: '400',
    color: 'white',
    // paddingBottom:50,
  },
  gradeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
});
