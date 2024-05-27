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
      <Text
        style={{
          color: 'white',
          fontWeight: '700',
          fontSize: 16,
        }}>
        {title}
      </Text>
      {cartItems.length > 0 ? (
        <TouchableOpacity
          onPress={onPressCart}
          style={{
            height: 40,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="cart-outline" size={30} color={'white'} />
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: 100,
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              left: 15,
              bottom: 20,
            }}>
            <Text style={{color: 'white', fontSize: 12}}>
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
