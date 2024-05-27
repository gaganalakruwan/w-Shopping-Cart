import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

type Props = {
  containerStyle?: any;
  title?: string;
  onPress: () => void;
  textStyle?: any;
};
const ActionButton = ({containerStyle, title, onPress, textStyle}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: 'orange',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          borderRadius: 5,
        },
        containerStyle,
      ]}>
      <Text
        style={[{color: 'white', fontWeight: '500', fontSize: 18}, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
