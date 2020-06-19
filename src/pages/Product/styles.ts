import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
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

export const Content = styled.ScrollView`
  flex: 1;
`;

export const ProductTitle = styled.Text`
  font-size: 22px;
  color: #474747;
  font-family: Roboto_500Medium;
  padding: 16px;
  text-transform: uppercase;
`;
export const ContentTitile = styled.Text`
  font-size: 14px;
  color: #474747;
  font-family: Roboto_700Bold;
  padding: 16px;
`;
export const AmountContnet = styled.View`
  width: 100%;
  font-size: 20px;
  padding: 16px;
  background: #fff;
  font-family: Roboto_400Regular;
  align-self: center;
  justify-content: space-between;
  flex-direction: row;
`;
export const Amount = styled.Text`
  font-size: 20px;
  color: #474747;
  font-family: Roboto_400Regular;
  align-self: center;
`;
export const AmountQtd = styled.Text`
  font-size: 22px;
  color: #474747;
  font-family: Roboto_700Bold;
  align-self: center;
  background: #fff;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 14px;
`;
export const EditButton = styled.TouchableOpacity`
  padding: 14px;
`;
export const TitleContentList = styled.Text`
  flex: 1;
  font-size: 20px;
  color: #666;
  font-family: Roboto_400Regular;
  align-self: center;
  padding: 30px;
`;
