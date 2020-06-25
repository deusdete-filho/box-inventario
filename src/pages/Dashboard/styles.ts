import styled from 'styled-components/native';
import { FlatList, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Product } from './index';
export const Wrapper = styled.View`
  background: #dc7121;
`;
export const Header = styled.SafeAreaView`
  padding: 0px;
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
export const ProductList = styled(FlatList as new () => FlatList<Product>)`
  width: 100%;
  flex: 1;
`;

export const Device = styled(RectButton)`
  padding: 20px;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 1px;

  border-bottom-color: #ccc;
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
export const BackButton = styled.TouchableOpacity`
  padding: 14px;
`;
export const EditButton = styled.TouchableOpacity`
  padding: 14px;
`;
export const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
  background: #fff;
  font-size: 18px;
  padding-left: 16px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #f1f1f1;
  color: #464646;
  font-family: Roboto_400Regular;
`;
export const TitleContentList = styled.Text`
  flex: 1;
  font-size: 20px;
  color: #666;
  font-family: Roboto_400Regular;
  align-self: center;
  padding: 30px;
`;
