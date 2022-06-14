import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import {
  themeDarkBlue,
  themeFerozi,
  themeLightPurple,
  themePink,
  themeYellow,
} from '../assets/colors/colors';
import AssessmentMapper from '../components/AssessmentMapper';
import ColoredFlatlist from '../components/ColoredFlatlist';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';

const {width, height} = Dimensions.get('window');

const RunAssessment = ({navigation, route}) => {
  const _onPressRunAssessment = () => {};
  const ITEM = route.params.item;

  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <Heading
          title={'ASSESSMENTS'}
          passedStyle={styles.headingStyles}
          fontType="semi-bold"
        />

        {/* Participants Head View  */}
        <View style={styles.participantsViewStyle}>
          <Heading
            title="Run Assessment"
            passedStyle={styles.participantsLabelStyle}
            fontType="regular"
          />
          <IconComp
            iconName={'chevron-right'}
            type="Feather"
            passedStyle={styles.iconStyle}
          />
          <Heading
            title={ITEM.name}
            passedStyle={styles.participantsLabelStyle}
            fontType="semi-bold"
          />
        </View>

        {/* Colors  */}
        <ColoredFlatlist />

        <View style={styles.assessmentListStyle}>
          <Image
            resizeMode="contain"
            source={ITEM.image}
            style={{
              width: width * 0.4,
              height: height * 0.13,
              //   marginVertical: height * 0.03,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('groups', {item: ITEM})}>
            <Heading
              title={'START'}
              passedStyle={styles.buttonStyles}
              fontType="semi-bold"
            />
          </TouchableOpacity>
          <Heading
            title={'INFORMATION'}
            passedStyle={[
              styles.buttonStyles,
              {backgroundColor: themeLightPurple},
            ]}
            fontType="semi-bold"
          />

          <Heading
            title={'SETUP'}
            passedStyle={[styles.buttonStyles, {backgroundColor: themeYellow}]}
            fontType="semi-bold"
          />
          <Heading
            title={'FACILIATOR INSTRUCTIONS'}
            passedStyle={[styles.buttonStyles, {backgroundColor: themePink}]}
            fontType="semi-bold"
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default RunAssessment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  headingStyles: {
    width: width * 0.55,
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
    marginBottom: height * 0.1,
  },
  buttonStyles: {
    width: width * 0.9,
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.04,
    borderRadius: 25,
    paddingVertical: height * 0.02,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // marginTop: height * 0.02,
    marginVertical: height * 0.02,
    // marginBottom: height * 0.1,
  },
  assessmentListStyle: {
    position: 'absolute',
    bottom: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // left: width * 0.05,
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
  },
  {
    id: 2,
    name: 'Sprinting',
    image: require('../assets/images/sprinting.png'),
  },
  {
    id: 3,
    name: 'Shot Put',
    image: require('../assets/images/shot-put.png'),
  },
  {
    id: 4,
    name: 'Hurdles',
    image: require('../assets/images/hurdles.png'),
  },
];
