import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { TextInput } from 'react-native';
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
  padding: 16px;
`;

export const ProductTitle = styled.Text`
  font-size: 22px;
  color: #474747;
  font-family: Roboto_500Medium;
  padding: 16px;
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
export const Select = styled.View`
  width: 100%;
  height: 50px;
  background: #fff;
  font-size: 18px;
  font-family: Roboto_700Bold;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding-left: 16px;
`;
export const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
  background: #fff;
  font-size: 14px;
  padding-left: 16px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  margin-bottom: 16px;
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
