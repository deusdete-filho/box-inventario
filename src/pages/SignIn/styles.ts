import styled from 'styled-components/native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 0px;
`;

export const ContainerLogo = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 30px 70px;
`;
