import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {
  Wrapper,
  Header,
  Title,
  Content,
  Select,
  BackButton,
  EditButton,
  Input,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather as Icon } from '@expo/vector-icons';
import api from '../../../services/api';
import Button from '../../../components/Button';
interface RouteParams {
  id: string;
  idproductdeposit: string;
}
interface Product {
  name: string;
  amount: string;
}
interface RouteParams {
  id: string;
}
const ProductEdit: React.FC = () => {
  const { goBack, navigate } = useNavigation();

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');

  const route = useRoute();
  const { id, idproductdeposit } = route.params as RouteParams;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    api
      .get(`product/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
        goBack();
      });
  }, [id]);
  useEffect(() => {
    setName(product?.name);
  }, [product]);
  function handleSubmitCategory() {
    try {
      if (name == '') {
        Alert.alert('Digite o nome!');
        return;
      }
      setLoading(true);
      const responde = api.patch(`product/${id}/name`, {
        name,
      });
      setLoading(false);

      Alert.alert('Alteração realizada!');
    } catch {
      Alert.alert('Erro!');
    }
  }
  const productdelete = useCallback(() => {
    api
      .delete(`productdeposit/${idproductdeposit}`)
      .then((response) => {
        Alert.alert('Excluido');
        navigate('Dashboard');
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
  }, [product]);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#dc7121"
        translucent
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Wrapper>
          <Header>
            <BackButton
              onPress={() => {
                goBack();
              }}
            >
              <Icon name="chevron-left" size={24} color="#fff"></Icon>
            </BackButton>
            <Title>Editar Produto</Title>
            <BackButton
              onPress={() => {
                productdelete();
              }}
            >
              <Icon name="trash" size={24} color="#fff"></Icon>
            </BackButton>
          </Header>
        </Wrapper>
        {product ? (
          <Content>
            <Input
              keyboardType="decimal-pad"
              value={name}
              onChangeText={setName}
              placeholder="Digite o nome"
              autoCorrect={false}
            ></Input>
            <Button loading={loading} onPress={() => handleSubmitCategory()}>
              SALVAR
            </Button>
          </Content>
        ) : (
          <ActivityIndicator style={{ flex: 1 }}></ActivityIndicator>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default ProductEdit;
