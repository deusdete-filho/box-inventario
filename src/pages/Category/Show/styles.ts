import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Product } from './index';
export const Wrapper = styled.View`
  background: #dc7121;
`;
export const Header = styled.SafeAreaView`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-top: ${getStatusBarHeight()}px;
`;
export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: Roboto_500Medium;
`;

export const Content = styled.View`
  flex: 1;
`;
export const ProductList = styled(FlatList as new () => FlatList<Product>)``;

export const Device = styled(RectButton)`
  padding: 20px;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 1px;
  max-width: 500px;
`;
export const TitleItem = styled.Text`
  font-size: 16px;
  color: #474747;
  font-family: Roboto_500Medium;
  align-self: center;
  text-transform: uppercase;
`;
export const TitleContent = styled.Text`
  font-size: 14px;
  color: #666;
  font-family: Roboto_400Regular;
  align-self: center;
  padding-top: 10px;
`;
export const TitleContentList = styled.Text`
  flex: 1;
  font-size: 20px;
  color: #666;
  font-family: Roboto_400Regular;
  align-self: center;
  padding: 30px;
`;
export const BackButton = styled.TouchableOpacity`
  padding: 14px;
`;
export const EditButton = styled.TouchableOpacity`
  padding: 14px;
`;
