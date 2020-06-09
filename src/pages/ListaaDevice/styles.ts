import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #474747;
  font-family: Roboto_500Medium;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Icon = styled(FeatherIcon)`
  margin-left: 10px;
  color: #eee;
  align-items: center;
`;
export const Device = styled.View`
  padding: 20px;
  width: 380px;
  background: #fff;
  border: 1px solid #dededf;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  max-width: 500px;
`;
export const TitleItem = styled.Text`
  font-size: 22px;
  color: #474747;
  font-family: Roboto_500Medium;
  align-self: center;
`;
export const Header = styled.View`
  background: #fff;
  border-bottom: 1px solid #dededf;
  height: 80px;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  color: #474747;
`;
