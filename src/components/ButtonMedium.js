import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/global';

const ButtonMedium = ({ type, onPress, label }) => {
  const buttonStyle = type === 'contained' ? styles.containedButton : styles.outlinedButton;
  const textColor = type === 'contained' ? 'white' : colors.primary; // Set text color based on button type

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '47%',
    paddingVertical: 18,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  containedButton: {
    backgroundColor: colors.primary,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonMedium;
