import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';
import { formatDate } from '../utils/formatDate';

export default function CustomTextInput({
  imageSource,
  onChangeText,
  value,
  style,
  label,
  onPressIcon,
  isDate,
  ...rest
}) {
  return (
    <TouchableOpacity
    disabled={onPressIcon ? false : true}
      onPress={() => onPressIcon()}
      style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.image} />
        {!onPressIcon ? (
          <TextInput
            value={value}
            {...rest}
            onChangeText={onChangeText}
            style={styles.TextInput}
          />
        ) : (
          <Text style={styles.date}>{value && formatDate(value?.toString())}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: colors.white,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  TextInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  date:{
    fontSize:11,
    fontWeight:'700',
    color:colors.black
  }
});
