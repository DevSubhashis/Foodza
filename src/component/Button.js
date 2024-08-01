import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const Button = ({ title, onPress, style, textStyle, imageSource }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10, // Add margin to separate text from the image
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Button;
