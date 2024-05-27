import {View, Text, Image, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import MainContainer from '@components/mainContailner';
import {cartDataType, productDataType} from 'type';
import DropDownPicker from 'react-native-dropdown-picker';
import ActionButton from '@components/ActionButton';
import {useDispatch, useSelector} from 'react-redux';
import {addCartItem, removeCartItem} from '../../redux/features/cartSlice';
import {RootState} from '../../redux/store/store';

const SingleItem = ({navigation, route}) => {
  const productData: productDataType = route.params.productData;
  const {cartItems} = useSelector((state: RootState) => state.cartData);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const sizeData = productData.sizes.map(size => ({
    label: size,
    value: size,
  }));
  const [quantity, setQuantity] = useState('0');

  const addItemToCart = () => {
    const itemIndex = cartItems.findIndex(
      (cartItem: cartDataType) => cartItem.id === productData.id,
    );
    if (itemIndex === -1) {
      const item = {...productData, quantity: quantity, size: value};
      if (quantity && quantity !== '0') {
        dispatch(addCartItem(item));
        setQuantity('0');
      } else {
        Alert.alert('Please enter quantity');
      }
    } else {
      Alert.alert(
        'Warning',
        'Item already added to cart. Do you want to remove it .?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => removeItemFromCart()},
        ],
      );
    }
  };

  const removeItemFromCart = () => {
    dispatch(removeCartItem(productData.id));
  };

  return (
    <MainContainer
      isheader={true}
      title={productData.name}
      onPressBack={() => navigation.goBack()}>
      <View style={{margin: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.6}}>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text>Id : </Text>
              <Text>{productData.id}</Text>
            </View>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text>Brand Name : </Text>
              <Text>{productData.brandName}</Text>
            </View>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text>Price : </Text>
              <Text>{`${productData.price.amount} (${productData.price.currency})`}</Text>
            </View>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text>SKU : </Text>
              <Text>{productData.SKU}</Text>
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
              <Text>Size : </Text>
              <DropDownPicker
                open={open}
                value={value}
                items={sizeData}
                placeholder="Select size"
                // searchPlaceholder="Search area...."
                setOpen={setOpen}
                setValue={setValue}
                // searchable={true}
                // listItemLabelStyle={{height: 20}}
                containerStyle={{
                  width: '60%',
                  alignSelf: 'center',
                  borderColor: 'white',
                }}
                // style={{borderColor: 'white',height:}}
              />
            </View>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text>Colour : </Text>
              <Text>{productData.colour}</Text>
            </View>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text>Description : </Text>
              <Text>{productData.description}</Text>
            </View>
            <View
              style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
              <Text>Quantity : </Text>
              <TextInput
                onChangeText={text => setQuantity(text)}
                value={quantity}
                style={{
                  height: 40,
                  width: 100,
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 0.4,
            }}>
            <Image
              source={{uri: productData.mainImage}}
              style={{width: 110, height: 150}}
              resizeMode="contain"
            />
          </View>
        </View>
        <ActionButton title="Add" onPress={() => addItemToCart()} />
      </View>
    </MainContainer>
  );
};

export default SingleItem;
