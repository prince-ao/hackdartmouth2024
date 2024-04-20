import React from 'react';
import { View, StyleSheet } from 'react-native';

const Frame: React.FC<Readonly<{
  children?: React.ReactNode
}>> = ({
  children
}) => {
  return (
    <View
      style={styles.frame}
    >
      {children}
    </View>
  );
};

export const styles = StyleSheet.create({
  frame: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    // borderWidth: 4,
    // borderRightColor: '#8B4513',
    // borderLeftColor: '#8B4513',
    // borderTopColor: '#8B4513',
    borderStyle: 'solid',
    backgroundColor: 'antiquewhite'
  }
});

export default Frame;
