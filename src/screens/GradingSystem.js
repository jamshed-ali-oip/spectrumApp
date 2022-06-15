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
        <TouchableOpacity style={styles.jumpbtn}>
          <Text style={styles.jumpText}>LONG JUMP</Text>
        </TouchableOpacity>
  {/* <View 
        style={{
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderLeftWidth: 50,
          borderRightWidth: 50,
          borderBottomWidth: 100,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "red",
        }}
        
        >

        </View> */}
        {/* <View style={{width:100,height:20,
borderTopWidth:0,
borderBottomWidth:100,
borderLeftWidth:50,
borderRightWidth:50,
borderLeftColor:"transparent"
}}> */}
  
{/* </View> */}
        <Image
          resizeMode="contain"
          source={require('../assets/images/logo.png')}
          style={styles.bgimage}
        />
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.Text}>Grade-6 Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.Text}>Lalit Beahan</Text>
        </TouchableOpacity>
        <View
          style={styles.gradeContainer}>
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
        onPress={()=>{navigation.navigate("ScaleScreen")}}
        style={styles.savebtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      
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
  },
  saveText: {
    textAlign: 'center',
    fontSize: width * 0.038,
    fontWeight: '400',
    color: 'white',
  },
  gradeContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  }
});
