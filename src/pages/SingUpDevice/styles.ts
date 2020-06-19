import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Wrapper = styled.View`
  background: #1cb970;
  padding: 8px 16px 0;
`;
export const Header = styled.SafeAreaView`
  padding: 16px;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 16px;
`;
export const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-family: Roboto_700Bold;
  padding-top: 20px;
`;
export const TitleSub = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: Roboto_500Medium;
  padding-top: 10px;
`;
export const Content = styled.View`
  padding: 8px 8px 0;
  justify-content: center;
  align-items: center;
`;
export const Device = styled.View`
  align-items: center;
  padding: 5px;
`;
export const DeviceButton = styled(TouchableOpacity)`
  width: 80px;
  height: 80px;
  background: #fff;
  border: 0;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;
export const DeviceText = styled.Text`
  color: #fff;
  margin-top: 8px;
  font-family: Roboto_700Bold;
`;
