import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '@components/Header';

type Props = {
  children?: any;
  isheader?: boolean;
  onPressBack?: () => {};
  onPressCart?: () => {};
  title?: string;
};

const MainContainer = ({
  isheader,
  children,
  title,
  onPressBack,
  onPressCart,
}: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {isheader && (
        <Header
          title={title ? title : 'Home'}
          onPressBack={onPressBack}
          onPressCart={onPressCart}
        />
      )}
      {children}
    </SafeAreaView>
  );
};

export default MainContainer;
