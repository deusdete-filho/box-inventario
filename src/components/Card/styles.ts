import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;

  margin-top: 16px;
  margin-left: 16px;
`;
export const Content = styled.TouchableOpacity`
  background: ${({ bgColor }) => bgColor};
  width: 150px;
  height: 220px;
  border-radius: 5px;
  padding: 15px;
  margin-right: 16px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: Roboto_500Medium;
  color: #fff;
  font-size: 18px;
`;
export const Img = styled.Image`
  align-self: center;
`;
