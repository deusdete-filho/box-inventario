import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #dc7121;
  border: 0;
  border-radius: 3px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: Roboto_700Bold;
  color: #f4ede8;
  font-size: 18px;
`;
