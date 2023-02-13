import { StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default function TourVideo({uri,done}) {
    console.log(uri)
  return (
    <View style={{flex:1,backgroundColor:'green'}}>
      <Video
      resizeMode="cover"
      controls={false}
      onEnd={done}
      style={{width:responsiveWidth(100),height:responsiveHeight(100)}}
    //   controls={true}
      source={{uri:'https://webprojectmockup.com/custom/spectrum-8-v2/public/images/logo/samplevideo_1280x720_1mb%20(1)_1675928081.mp4'}}
      />
    </View>
  )
}

const styles = StyleSheet.create({})