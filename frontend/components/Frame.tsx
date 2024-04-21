import React from 'react';
import { View, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
const GoldFrame = require("../assets/images/hack-dartmouth-24-camera-frame.png");

const Frame: React.FC<Readonly<{
  children?: React.ReactNode
}>> = ({
  children
}) => {
  return (
    <View
      style={styles.frame}
    >
      <Image 
        alt=""
        resizeMode="contain"
        style={styles.backgroundImage}
        source={GoldFrame}
        
      />
      {children}
    </View>
  );
};

export const styles = StyleSheet.create({
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: -1,
    borderColor: 'red',
    borderWidth: 1,
  },
  backgroundImage: {
    display: 'flex',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent',
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
export default Frame;
