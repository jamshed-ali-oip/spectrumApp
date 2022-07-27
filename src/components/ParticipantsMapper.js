import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import React from 'react';
import Heading from './Heading';
import moment from 'moment';
import { imageUrl } from '../config';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');

const ParticipantsMapper = ({ item, index, userReducer }) => {
  // const colors_reversed = colors.reverse();

  // userReducer?.colors.map(ele => console.log(ele.id,"-"));
  // const colors_arr =
  //   userReducer?.colors[0]?.id == 1
  //     ? userReducer?.colors
  //     : userReducer?.colors.reverse();

  // console.log("assessment_scoring", item?.id, item?.assessment_id, item?.assessments[0]?.assessment_scoring);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: width * 0.5,
        }}>
        <Image
          source={{
            uri: `${imageUrl}/assessment_image/${item?.assessments?.length > 0 && item?.assessments[0]?.Image
              }`,
          }}
          resizeMode="contain"
          style={styles.imageStyles}
        />
        <Heading
          title={
            item?.assessments?.length > 0 && item?.assessments[0]?.Name?.length > 20
              ? `${item?.assessments?.length > 0 && item?.assessments[0]?.Name?.substring(0, 20)}...`
              : item?.assessments?.length > 0 && item?.assessments[0]?.Name
          }
          // title={item?.assessments?.length > 0 && item?.assessments[0]?.Name}
          passedStyle={styles.nameStyle}
          fontType="regular"
        />

        <Heading
          title={moment(item?.created_at).format('DD MMMM')}
          passedStyle={styles.dateStyle}
          fontType="regular"
        />
      </View>

      <View style={styles.colorsViewStyle}>
        {item?.assessments?.length > 0 &&
          item?.assessments[0]?.assessment_scoring?.map((ele, index) => {
            let color_id = ele?.color_id;
            let minValue = ele?.MinValue;
            let maxValue = ele?.MaxValue;
            let colorObj = userReducer?.colors.find((color) => color.id == color_id)

            // console.log(color_id, minValue, maxValue);
            return (
              <View
                key={index}
                style={{
                  // backgroundColor:'red',
                  // alignSelf:'flex-end',
                  backgroundColor:
                    parseInt(item?.Score) >= parseInt(minValue) &&
                    (parseInt(item?.Score) >= parseInt(maxValue) ||
                      parseInt(item?.Score) <= parseInt(maxValue))
                      ? colorObj?.WebColor
                      : 'white',
                  // backgroundColor: colorObj?.WebColor,
                  borderRadius: 9,
                  padding: width * 0.02,
                  marginLeft: 3,
                }}>
                {/* <Text>{color_id}</Text> */}
              </View>
            );
          })}
      </View>
    </View>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, null)(ParticipantsMapper);

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
    // backgroundColor: 'green',
    height: height * 0.032,
  },
  nameStyle: {
    color: 'white',
    fontSize: width * 0.033,
    marginHorizontal: width * 0.01,
    width: width * 0.25,
    // backgroundColor: 'purple',
  },
  dateStyle: {
    color: 'white',
    fontSize: width * 0.033,
    marginHorizontal: width * 0.01,
    width: width * 0.15,
    // backgroundColor: 'red',
  },
  colorsViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
});
