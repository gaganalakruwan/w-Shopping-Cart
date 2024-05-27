import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  productName: string;
  brand: string;
  price: string;
  color: string;
  quantity: string;
  onPress: () => void;
  containerStyle?: any;
  onPressDelete: () => void;
};
const ProductItem = ({
  productName,
  brand,
  price,
  color,
  quantity,
  onPress,
  containerStyle,
  onPressDelete,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={onPress ? false : true}>
      <View
        style={[
          {
            marginTop: 10,
            marginHorizontal: 20,
            padding: 10,
            elevation: 5,
            backgroundColor: 'white',
          },
          containerStyle,
        ]}>
        {productName && (
          <View style={{flexDirection: 'row', padding: 5}}>
            <Text style={{width: 100}}>Product Name</Text>
            <Text style={{flex: 1}}>: {productName}</Text>
          </View>
        )}
        {brand && (
          <View style={{flexDirection: 'row', padding: 5}}>
            <Text style={{width: 100}}>Brand</Text>
            <Text>: {brand}</Text>
          </View>
        )}
        {color && (
          <View style={{flexDirection: 'row', padding: 5}}>
            <Text style={{width: 100}}>Color</Text>
            <Text>: {color}</Text>
          </View>
        )}
        {price && (
          <View style={{flexDirection: 'row', padding: 5}}>
            <Text style={{width: 100}}>Price</Text>
            <Text>: {price}</Text>
          </View>
        )}
        {quantity && (
          <View style={{flexDirection: 'row', padding: 5}}>
            <Text style={{width: 100}}>Quantity</Text>
            <Text>: {quantity}</Text>
          </View>
        )}
        {onPressDelete && (
          <TouchableOpacity
            onPress={onPressDelete}
            style={{position: 'absolute', right: 10, bottom: 50}}>
            <Icon name="closecircle" size={20} color={'red'} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
