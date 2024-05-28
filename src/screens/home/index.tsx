import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';

import MainContainer from '@components/mainContailner';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductDetails} from '../../redux/features/productDataSlice';
import {RootState} from '../../redux/store/store';
import {addCartItem, removeCartItem} from '../../redux/features/cartSlice';
import {productDataType} from 'type';
import ProductItem from '@components/productItems';
const Home = ({navigation}: {navigation: any}) => {
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
    navigation.navigate('SINGLEITEM', {productData: item, allProductData});
  };

  const renderItem = ({item}: {item: productDataType}) => {
    return <ProductItem item={item} onPress={() => nativagionItem(item)} />;
  };

  return (
    <MainContainer
      isheader={true}
      title="Products"
      onPressCart={() => navigation.navigate('CART')}>
      <View className="py-0 px-2">
        <FlatList
          data={allProductData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View className="h-24" />}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </MainContainer>
  );
};

export default Home;
