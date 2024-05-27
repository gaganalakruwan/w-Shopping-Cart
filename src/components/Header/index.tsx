import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
    <View className="h-14 w-full bg-yellow-600 justify-between flex-row items-center px-4">
      {onPressBack ? (
        <TouchableOpacity onPress={onPressBack} style={{}}>
          <Icon name="chevron-left" size={30} color={'white'} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>
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
          <Icon name="shopping-cart" size={20} color={'white'} />
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: 100,
              width: 15,
              height: 15,
              alignItems: 'center',
              justifyContent: 'center',
              right: 1,
              top: 1,
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
