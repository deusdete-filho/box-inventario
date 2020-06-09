import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;
export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: Roboto_500Medium;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #43c5a8;
  border-top-width: 1px;
  border-color: #43c5a8;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-left: 16px;

  font-family: Roboto_500Medium;
`;
