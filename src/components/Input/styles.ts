import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  background: #43c5a8;
  padding-left: 15px;
  padding-right: 15px;
  height: 50px;
  border-radius: 3px;
  margin-bottom: 15px;
  border: 2px solid #43c5a8;
  color: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c74f4f;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #fff;
    `}
`;
export const TextInput = styled.TextInput`
  flex: 1;
  font-family: Roboto_500Medium;
  color: #fff;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;

  align-items: center;
`;
export const Error = styled.View`
  font-family: Roboto_500Medium;
  color: #c74f4f;
  font-size: 14px;
  flex-direction: row;
  align-items: center;
`;
export const Text = styled.Text`
  font-family: Roboto_500Medium;
  color: #c74f4f;
  font-size: 14px;
  margin-left: 5px;
`;
