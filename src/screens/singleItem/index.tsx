import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import MainContainer from '@components/mainContailner';
import {cartDataType, productDataType} from 'type';
import ActionButton from '@components/ActionButton';
import {useDispatch, useSelector} from 'react-redux';
import {addCartItem, removeCartItem} from '../../redux/features/cartSlice';
import {RootState} from '../../redux/store/store';
import ProductItem from '../../components/productItems/index';

const SingleItem = ({navigation, route}: {navigation: any; route: any}) => {
  const productData: productDataType = route.params.productData;
  const allData: productDataType[] = route.params.allProductData;
  const {cartItems} = useSelector((state: RootState) => state.cartData);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

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

  const nativagionItem = (item: productDataType) => {
    navigation.navigate('SINGLEITEM', {
      productData: item,
      allProductData: allData,
    });
  };

  const onPressSize = (size: string) => {
    setSelectedSize(size);
  };

  const renderItem = ({item}: {item: productDataType}) => {
    return <ProductItem item={item} onPress={() => nativagionItem(item)} />;
  };

  return (
    <MainContainer
      isheader={true}
      title={productData.brandName}
      onPressBack={() => navigation.goBack()}>
      <ScrollView className="m-6" showsVerticalScrollIndicator={false}>
        <FastImage
          className="h-[200px] w-[300px] self-start"
          source={{
            uri: productData.mainImage,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View className="absolute flex-row items-center right-0">
          <Text className="text-base bottom-3 text-black font-semibold">
            {productData.price.currency}
          </Text>
          <Text className="text-[#0da825] text-[50px] font-bold">
            {productData.price.amount}
          </Text>
        </View>
        <Text className="mt-1 text-left text-lg font-medium text-black">
          {productData.name}
        </Text>
        <Text className="mt-2 text-justify text-[#4f4f4d] font-light">
          {productData.description}
        </Text>

        <View className="mt-1 flex-row items-center">
          <Text className="text-black">Select Preferred Size</Text>
          <View style={{flex: 1}} />
          {productData.sizes.map((size, index) => {
            return (
              <TouchableOpacity
                key={index}
                className={`w-10 h-[35px] border rounded-sm m-1 items-center justify-center ${
                  size === selectedSize
                    ? ' border-[#000000]'
                    : ' border-[#dbdbdb]'
                }`}
                onPress={() => onPressSize(size)}>
                <Text
                  className={`text-base
                    ${
                      size === selectedSize ? 'text-black' : 'text-[#dbdbdb]'
                    }`}>
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View className="my-3 flex-row items-center justify-between">
          <Text className="text-black">Select Quantity</Text>
          <TextInput
            onChangeText={text => setQuantity(text)}
            value={quantity}
            className="text-black h-10 w-12 border border-[#dbdbdb] text-center rounded-md"
            keyboardType="numeric"
          />
        </View>
        <ActionButton title="Add To Cart" onPress={() => addItemToCart()} />
        <Text className="mx-1 my-3 text-base font-bold text-[#696865]">
          You Might Also Like
        </Text>
        <FlatList
          data={allData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <View className="h-24" />}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </MainContainer>
  );
};

export default SingleItem;
