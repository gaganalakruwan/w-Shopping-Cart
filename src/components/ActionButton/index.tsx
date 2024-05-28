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
      style={[containerStyle]}
      className="items-center justify-start p-2 rounded-md bg-[#fc9803]">
      <Text style={[textStyle]} className={'text-white font-semibold text-lg'}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
