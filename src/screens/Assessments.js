import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
  FlatList,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import {themeDarkBlue, themeFerozi} from '../assets/colors/colors';
import AssessmentMapper from '../components/AssessmentMapper';
import ColoredFlatlist from '../components/ColoredFlatlist';
import Heading from '../components/Heading';

const {width, height} = Dimensions.get('window');

const Assessments = ({navigation}) => {
  const _onPressRunAssessment = (item) => {
    navigation.navigate('runAssessment', {item: item});
  };

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
        {/* Colors  */}
        <ColoredFlatlist />

        {/* Assessments List */}
        <FlatList
          data={list}
          style={styles.assessmentListStyle}
          keyExtractor={({item, index}) => item?.id?.toString()}
          renderItem={({item, index}) => (
            <AssessmentMapper
              item={item}
              index={index}
              onPress={_onPressRunAssessment}
            />
          )}
        />
      </ImageBackground>
    </>
  );
};

export default Assessments;

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
  assessmentListStyle: {
    position: 'absolute',
    bottom: height * 0.35,
    left: width * 0.05,
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
