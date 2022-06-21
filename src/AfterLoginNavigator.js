import React, {Component, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ParticipantsScreen from './screens/ParticipantsScreen';
import ViewParticipants from './screens/ViewParticipants';

import Button from './components/Button';
import IconComp from './components/IconComp';
import {themeDarkBlue} from './assets/colors/colors';
import Assessments from './screens/Assessments';
import RunAssessment from './screens/RunAssessment';
import GroupsScreen from './screens/GroupsScreen';
import GradesScreen from './screens/GradesScreen';
import TimeAssessment from './screens/TimeAssessment';
import GradingSystem from './screens/GradingSystem';
import ScaleScreen from './screens/ScaleScreen';

const {width, height} = Dimensions.get('window');

const AfterLoginStack = createStackNavigator();

const AfterLoginNavigator = ({navigation}) => {
  return (
    <AfterLoginStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="home">
      <AfterLoginStack.Screen
        name="home"
        options={{headerShown: false}}
        component={HomeScreen}
      />

      <AfterLoginStack.Screen
        name="participants"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={ParticipantsScreen}
      />

      <AfterLoginStack.Screen
        name="viewParticipants"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={ViewParticipants}
      />

      <AfterLoginStack.Screen
        name="assessments"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={Assessments}
      />

      <AfterLoginStack.Screen
        name="runAssessment"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={RunAssessment}
      />

      <AfterLoginStack.Screen
        name="groups"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={GroupsScreen}
      />

      <AfterLoginStack.Screen
        name="grades"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={GradesScreen}
      />

      <AfterLoginStack.Screen
        name="timeAssessment"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={TimeAssessment}
      />

      <AfterLoginStack.Screen
        name="GradingSystem"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={GradingSystem}
      />

      <AfterLoginStack.Screen
        name="ScaleScreen"
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={require('./assets/images/round-icon.png')}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={ScaleScreen}
      />
    </AfterLoginStack.Navigator>
  );
};

export default AfterLoginNavigator;
