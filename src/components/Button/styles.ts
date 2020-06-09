import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #fff;
  border: 0;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 1);

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: Roboto_500Medium;
  color: #1cb970;
  font-size: 18px;
`;
