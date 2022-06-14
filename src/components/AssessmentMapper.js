import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Heading from './Heading';
import {themeLightPurple} from '../assets/colors/colors';
const {width, height} = Dimensions.get('window');

const AssessmentMapper = ({item, index, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={item?.image} resizeMode='contain' style={styles.imageStyles} />
        <Heading
          title={item?.name}
          passedStyle={styles.nameStyle}
          fontType="regular"
        />
      </View>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => {
          onPress(item);
        }}>
        <Heading
          title="Run Assessment"
          passedStyle={styles.textBtnStyle}
          fontType="semi-bold"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AssessmentMapper;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    zIndex: 999,
    //   marginTop:-100,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    height: height * 0.09,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnStyle: {
    height: height * 0.046,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeLightPurple,
    alignSelf: 'center',
    width: width * 0.43,
    borderRadius: 25,
  },
  nameStyle: {
    color: 'white',
    fontSize: width * 0.035,
    marginHorizontal: width * 0.02,
  },
  textBtnStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  imageStyles: {width: width * 0.072, height: height * 0.032},
});
