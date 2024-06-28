import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';

export default function CustomButton({label, style, onPress}) {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button, style]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 5,
  },
  label: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
