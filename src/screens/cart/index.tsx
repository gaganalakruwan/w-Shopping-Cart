import {View, Text, FlatList, Alert} from 'react-native';
import React from 'react';
import MainContainer from '@components/mainContailner';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import ProductItem from '@components/productItems';
import ActionButton from '@components/ActionButton';
import {cartDataType} from 'type';
import {removeCartItem} from '../../redux/features/cartSlice';

const Cart = ({navigation, route}) => {
  const {cartItems} = useSelector((state: RootState) => state.cartData);
  const dispatch = useDispatch<any>();
  const total = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat(item.price.amount) * parseInt(item.quantity),
    0,
  );

  const removeItemFromCart = (Item: cartDataType) => {
    Alert.alert('Warning', 'Do you want to remove this item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(removeCartItem(Item.id))},
    ]);
  };

  return (
    <MainContainer
      onPressBack={() => navigation.goBack()}
      isheader={true}
      title="Cart"
      onPressCart={() => navigation.navigate('CART')}>
      <View className="py-0 px-2 flex-1">
        <FlatList
          data={cartItems}
          ListFooterComponent={() => <View style={{height: 100}} />}
          renderItem={({item}) => (
            <ProductItem
              productName={item?.name}
              price={item.price.amount + '(' + item.price.currency + ')'}
              color={item.colour}
              quantity={item?.quantity}
              onPressDelete={() => removeItemFromCart(item)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View>
        <Text>Total: {total}</Text>
      </View>
      <ActionButton title="Submit" />
    </MainContainer>
  );
};

export default Cart;
