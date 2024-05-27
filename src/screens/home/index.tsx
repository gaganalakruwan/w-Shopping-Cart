import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import MainContainer from '@components/mainContailner';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductDetails} from '../../redux/features/productDataSlice';
import {RootState} from '../../redux/store/store';
import {addCartItem, removeCartItem} from '../../redux/features/cartSlice';
import {productDataType} from 'type';
import ProductItem from '@components/productItems';

const Home = ({navigation, route}) => {
  const dispatch = useDispatch<any>();
  const {allProductData} = useSelector(
    (state: RootState) => state.allProductData,
  );
  const {cartItems} = useSelector((state: RootState) => state.cartData);

  useEffect(() => {
    loadProductData();
  }, []);
  useEffect(() => {
    console.log('allProductData', cartItems);
  }, [cartItems]);

  const loadProductData = () => {
    dispatch(getAllProductDetails());
  };

  const nativagionItem = (item: productDataType) => {
    navigation.navigate('SINGLEITEM', {productData: item});
  };
  return (
    <MainContainer
      isheader={true}
      title="Products"
      onPressCart={() => navigation.navigate('CART')}>
      <View className="py-0 px-2">
        <FlatList
          data={allProductData}
          ListFooterComponent={() => <View style={{height: 100}} />}
          renderItem={({item}) => (
            <ProductItem
              productName={item?.name}
              brand={item.brandName}
              price={item.price.amount + '(' + item.price.currency + ')'}
              color={item.colour}
              onPress={() => nativagionItem(item)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </MainContainer>
  );
};

export default Home;
