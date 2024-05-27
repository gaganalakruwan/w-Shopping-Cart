import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {productDataType} from 'type';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  itemContainer: {
    width: Dimensions.get('window').width / 2.3,
    margin: 10,
    padding: 16,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignText: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '400',
    color: '#4d4f4e',
  },
  brandPriceContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  priceStyle: {
    color: '#0da825',
    fontSize: 32,
    fontWeight: 'bold',
  },
  brandStyle: {
    top: 10,
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: '800',
  },
  imageStyle: {
    height: 175,
    width: 150,
    top: 20,
  },
  currencyStyle: {
    bottom: 4,
    left: 2,
    fontSize: 16,
    color: 'black',
    fontWeight: '300',
  },
  absoluteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

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
      style={styles.itemContainer}
      disabled={onPress ? false : true}>
      {onPressDelete && (
        <TouchableOpacity
          onPress={onPressDelete}
          style={{position: 'absolute', right: 52, top: 5}}>
          <Icon name="highlight-remove" size={25} color={'red'} />
        </TouchableOpacity>
      )}
      <FastImage
        style={styles.imageStyle}
        source={{
          uri: item.mainImage,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View style={styles.brandPriceContainer}>
        <Text style={styles.brandStyle}>{item.brandName}</Text>
        <View style={styles.absoluteContainer}>
          <Text style={styles.currencyStyle}>{setItemCurrency()}</Text>
          <Text style={styles.priceStyle}>
            {Math.trunc(parseFloat(item.price.amount))}
          </Text>
        </View>
      </View>
      <Text style={styles.alignText}>
        {removeBrandNameFromTitle(item.name)}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductItem;
