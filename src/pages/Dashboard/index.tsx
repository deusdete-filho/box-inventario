import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {Wrapper, Header, Title, Content} from './styles';

import {useAuth} from '../../hooks/auth';
import Button from '../../components/Button';
import Card from '../../components/Card';

const Dashboard: React.FC = () => {
  const {signOut} = useAuth();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1CB970" />
      <Wrapper>
        <Header>
          <Title>Home</Title>
        </Header>
      </Wrapper>

      <Content>
        <Card />
      </Content>
      <Button onPress={signOut}>Sair</Button>
    </>
  );
};
export default Dashboard;
