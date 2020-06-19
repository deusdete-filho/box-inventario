import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  background: #fbfbfb;
  padding-left: 15px;
  padding-right: 15px;
  height: 50px;
  border-radius: 3px;
  margin-bottom: 15px;
  border: 1px solid #fff;
  color: #464646;
  border: 1px solid #dededf;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #ff4040;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #dc7121;
    `}
`;
export const TextInput = styled.TextInput`
  flex: 1;
  font-family: Roboto_500Medium;
  color: #474747;
  font-size: 16px;
`;

export const Icon = styled(Feather)`
  margin-right: 10px;

  align-items: center;
`;
export const Error = styled.View`
  font-family: Roboto_500Medium;
  color: #ff4040;
  font-size: 14px;
  flex-direction: row;
  align-items: center;
`;
export const Text = styled.Text`
  font-family: Roboto_500Medium;
  color: #ff4040;
  font-size: 14px;
  margin-left: 5px;
`;
