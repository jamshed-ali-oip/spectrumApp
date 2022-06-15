import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
  FlatList,
  RefreshControl,
  Platform,
  Text,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import LottieView from 'lottie-react-native';
import {themeDarkBlue, themeFerozi} from '../assets/colors/colors';
import AssessmentMapper from '../components/AssessmentMapper';
import ColoredFlatlist from '../components/ColoredFlatlist';
import Heading from '../components/Heading';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
const {width, height} = Dimensions.get('window');

const Assessments = ({navigation, userReducer, getAssessments}) => {
  const accessToken = userReducer.accessToken;
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const _onPressRunAssessment = item => {
    navigation.navigate('runAssessment', {item: item});
  };

  useEffect(() => {
    getAllAssessments();
  }, []);

  useEffect(() => {
    setAssessments(userReducer?.assessments);
  }, [userReducer?.assessments]);

  const getAllAssessments = async () => {
    setIsLoading(true);
    await getAssessments(accessToken);
    setIsLoading(false);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      getAllAssessments();
    });
  }, []);
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {/* Assessments List */}
        {isLoading ? (
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/color-loader.json')}
          />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={
              <>
                <Heading
                  title={'ASSESSMENTS'}
                  passedStyle={styles.headingStyles}
                  fontType="semi-bold"
                />
                {/* Colors  */}
                <ColoredFlatlist />
              </>
            }
            data={assessments}
            keyExtractor={({item, index}) => item?.id?.toString()}
            renderItem={({item, index}) => (
              <AssessmentMapper
                item={item}
                index={index}
                onPress={_onPressRunAssessment}
              />
            )}
          />
        )}
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(Assessments);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeDarkBlue,
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: width * 0.07,
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
  // assessmentListStyle: {
  //   position: 'absolute',
  //   bottom: height * 0.25,
  //   left: width * 0.05,
  // },
});
