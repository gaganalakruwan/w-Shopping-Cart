import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {productDataType} from 'type';
import FastImage from 'react-native-fast-image';
type Props = {
  item: productDataType;
  onPress?: () => void;
  onPressDelete?: () => void;
};

const ProductItem = ({item, onPress, onPressDelete}: Props) => {
  const setItemCurrency = () => {
    return item.price.currency === 'GBP' ? '£ ' : '$ ';
  };

  const removeBrandNameFromTitle = (title: string) => {
    const brandRegex = new RegExp(`\\b${item.brandName}\\b`, 'gi');
    return title.replace(brandRegex, '').trim();
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{width: Dimensions.get('window').width / 2.3, elevation: 5}}
      className="m-2 p-4 bg-white rounded-lg justify-center items-center"
      disabled={onPress ? false : true}>
      {onPressDelete && (
        <TouchableOpacity
          onPress={onPressDelete}
          className="absolute right-12 top-2">
          <Icon name="highlight-remove" size={25} color={'red'} />
        </TouchableOpacity>
      )}
      <FastImage
        className="h-44 w-36 top-5"
        source={{
          uri: item.mainImage,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View className="absolute top-2 right-4">
        <Text className="self-end top-2 text-base font-extrabold">
          {item.brandName}
        </Text>
        <View className="flex-row items-center top-1">
          <Text className="bottom-1 left-[2px] text-base text-black font-light">
            {setItemCurrency()}
          </Text>
          <Text className="text-[#0da825] font-bold text-3xl">
            {Math.trunc(parseFloat(item.price.amount))}
          </Text>
        </View>
      </View>
      <Text
        className="self-start text-left text-base font-normal text-[#4d4f4e]"
        numberOfLines={1}>
        {removeBrandNameFromTitle(item.name)}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductItem;
