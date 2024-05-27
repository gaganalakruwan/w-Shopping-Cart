import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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

const styles = StyleSheet.create({
  sizeContainer: {
    width: 40,
    height: 35,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 3,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  absoluteContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
  },
  currencyStyle: {
    bottom: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  priceStyle: {
    color: '#0da825',
    fontSize: 50,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 300,
    height: 200,
    alignSelf: 'flex-start',
  },
  desc: {
    marginVertical: 10,
    textAlign: 'justify',
    fontWeight: '300',
    color: '#4f4f4d',
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'medium',
    color: '#000000',
  },
  sizeText: {
    fontSize: 16,
    color: '#dbdbdb',
  },
  qtyRow: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qty: {
    height: 40,
    width: 50,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
});

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
      <ScrollView style={{margin: 25}} showsVerticalScrollIndicator={false}>
        <FastImage
          style={styles.imageStyle}
          source={{
            uri: productData.mainImage,
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.absoluteContainer}>
          <Text style={styles.currencyStyle}>{productData.price.currency}</Text>
          <Text style={styles.priceStyle}>{productData.price.amount}</Text>
        </View>
        <Text style={styles.title}>{productData.name}</Text>
        <Text style={styles.desc}>{productData.description}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Select Preferred Size</Text>
          <View style={{flex: 1}} />
          {productData.sizes.map((size, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  size === selectedSize
                    ? [styles.sizeContainer, {borderColor: 'black'}]
                    : styles.sizeContainer,
                ]}
                onPress={() => onPressSize(size)}>
                <Text
                  style={[
                    size === selectedSize
                      ? [styles.sizeText, {color: 'black'}]
                      : styles.sizeText,
                  ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.qtyRow}>
          <Text>Select Quantity</Text>
          <TextInput
            onChangeText={text => setQuantity(text)}
            value={quantity}
            style={styles.qty}
            keyboardType="numeric"
          />
        </View>
        <ActionButton title="Add To Cart" onPress={() => addItemToCart()} />
        <Text style={{marginVertical: 10, fontSize: 15, fontWeight: 'bold'}}>
          You Might Also Like
        </Text>
        <FlatList
          data={allData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <View style={{height: 100}} />}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </MainContainer>
  );
};

export default SingleItem;
