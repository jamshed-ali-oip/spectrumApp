import {StyleSheet, View, Dimensions, Image} from 'react-native';
import React from 'react';
import Heading from './Heading';

const {width, height} = Dimensions.get('window');

const ParticipantsMapper = ({item, index}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={item?.image} style={styles.imageStyles} />
        <Heading
          title={item?.name}
          passedStyle={styles.nameStyle}
          fontType="regular"
        />

        <Heading
          title={'21st April'}
          passedStyle={styles.nameStyle}
          fontType="regular"
        />
      </View>
      <View style={styles.colorsViewStyle}>
        {item?.colors?.map(ele => (
          <View key={ele.id} style={{
            backgroundColor: ele.color,
            borderRadius: 9,
            padding: 10,
            marginLeft: 3,
          }} />
        ))}
      </View>
    </View>
  );
};

export default ParticipantsMapper;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    zIndex: 999,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    height: height * 0.09,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyles: {
    width: width * 0.072,
    height: height * 0.032,
  },
  nameStyle: {
    color: 'white',
    fontSize: width * 0.033,
    marginHorizontal: width * 0.02,
  },
  colorsViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
