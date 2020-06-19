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
}
interface Product {
  name: string;
  amount: string;
}
interface RouteParams {
  id: string;
}
const ProductEdit: React.FC = () => {
  const { goBack } = useNavigation();

  const [product, setProduct] = useState<Product | null>(null);

  const route = useRoute();
  const { id } = route.params as RouteParams;
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
      });
  }, [id]);

  function handleSubmitCategory() {
    try {
      if (product?.name == '') {
        Alert.alert('Digite o nome!');
        return;
      }
      if (product?.amount == '') {
        Alert.alert('Digite a quantidade!');
        return;
      }

      setLoading(true);
      const responde = api.post('productdeposit', {
        name,
        amount,
      });
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
            <EditButton onPress={() => {}}></EditButton>
          </Header>
        </Wrapper>
        {product ? (
          <Content>
            <Input
              keyboardType="decimal-pad"
              value={product.name}
              onChangeText={setProduct}
              placeholder="Digite o nome"
              autoCorrect={false}
            ></Input>
            <Input
              value={product.amount}
              onChangeText={setProduct}
              placeholder="Digite a quantidade"
              keyboardType="number-pad"
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
