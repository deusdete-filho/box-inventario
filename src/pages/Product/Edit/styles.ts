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
  font-size: 14px;
  font-family: Roboto_400Regular;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding-left: 16px;
  margin-bottom: 16px;
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
