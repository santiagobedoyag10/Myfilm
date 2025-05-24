import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video, Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';


const VideoPlayerComponent = ({route}) => {
  const navigation =useNavigation()
  const { item } = route.params;
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    const setup = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
      });

      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    };

    setup();

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  const onPlaybackStatusUpdate = (status) => {
    setIsPaused(!status.isPlaying);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: route.params.uri}}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        useNativeControls
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        style={{ width: '100%', height: '100%' }}
      />

      {isPaused && (
        <View style={styles.closeButton} onTouchEnd={handleClose}>
          <Text style={styles.closeText}>✖</Text>
        </View>
      )}

      {isPaused && (
        <View style={styles.TitleContainer}>
        <Text style={styles.TitleText}>{item}</Text>
        </View>
      )}

    </View>
  );
};

VideoPlayerComponent.propTypes = {
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  closeText: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
  },

  TitleContainer: {
    position: 'absolute',
    top: '5%',
    alignSelf:'center',
    borderRadius: 20,
    zIndex: 1,
  },

  TitleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default VideoPlayerComponent;
