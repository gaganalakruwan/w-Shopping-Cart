import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store/store';

type Props = {
  onPressBack?: () => {};
  onPressCart?: () => {};
  title: string;
};
const Header = ({onPressBack, onPressCart, title}: Props) => {
  const {cartItems} = useSelector((state: RootState) => state.cartData);
  return (
    <View className="h-14 w-full bg-yellow-700 justify-between flex-row items-center px-3">
      {onPressBack ? (
        <TouchableOpacity onPress={onPressBack} style={{}}>
          <Icon name="arrow-back" size={25} color={'white'} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      <Text className="text-white font-bold text-base">{title}</Text>
      {cartItems.length > 0 ? (
        <TouchableOpacity
          onPress={onPressCart}
          className="h-10 w-8 items-center justify-center">
          <Icon name="cart-outline" size={30} color={'white'} />
          <View className=" absolute bg-red-600 rounded-full w-5 h-5 items-center justify-center left-4 bottom-5">
            <Text className="text-white text-xs font-bold">
              {cartItems.length}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Header;
