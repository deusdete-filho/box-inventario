import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StatusBar, Alert } from 'react-native';
import {
  Wrapper,
  Header,
  Title,
  Content,
  BackButton,
  EditButton,
  Input,
} from './styles';
import { useNavigation } from '@react-navigation/native';

import { Feather as Icon } from '@expo/vector-icons';
import api from '../../../services/api';
import Button from '../../../components/Button';
interface RouteParams {
  id: string;
}

const CategoryAdd: React.FC = () => {
  const { goBack } = useNavigation();
  const [name, setNomeCategory] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmitCategory() {
    try {
      if (name == '') return;
      setLoading(true);
      const responde = api.post('productcategory', { name });
      setLoading(false);
      Alert.alert('Cadastro realizado!');
      goBack();
    } catch {
      Alert.alert('Erro no cadastro!');
    }
  }
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#dc7121"
        translucent
      />
      <Wrapper>
        <Header>
          <BackButton
            onPress={() => {
              goBack();
            }}
          >
            <Icon name="chevron-left" size={24} color="#fff"></Icon>
          </BackButton>
          <Title>Nova Categoria</Title>
          <EditButton onPress={() => {}}></EditButton>
        </Header>
      </Wrapper>

      <Content>
        <Input
          value={name}
          onChangeText={setNomeCategory}
          placeholder="Digite o nome"
        ></Input>

        <Button loading={loading} onPress={() => handleSubmitCategory()}>
          CADASTRAR
        </Button>
      </Content>
    </>
  );
};
export default CategoryAdd;
