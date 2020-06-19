import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import {
  Wrapper,
  Header,
  Title,
  Content,
  Device,
  ProductTitle,
  BackButton,
  EditButton,
  Amount,
  AmountQtd,
  AmountContnet,
  ContentTitile,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import { Feather as Icon } from '@expo/vector-icons';
import api from '../../services/api';
interface RouteParams {
  id: string;
}
export interface Product {
  id: string;
  deposit: { id: number; name: string; prefix: string };
  product: { id: number; name: string; amount: number };
  shelf: { id: number; name: string };
  plate: { id: number; name: string };
}
const Dashboard: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const { navigate } = useNavigation();
  const naviagtion = useNavigation();
  const [products, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    api
      .get(`productdeposit/${id}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(true);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
  }, [id]);

  const navigateToProductEdit = useCallback(
    (id: string) => {
      navigate('ProductEdit', { id });
    },
    [navigate],
  );
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#dc7121" />
      <Wrapper>
        <Header>
          <BackButton
            onPress={() => {
              goBack();
            }}
          >
            <Icon name="chevron-left" size={24} color="#fff"></Icon>
          </BackButton>
          <Title>Produto</Title>
          <EditButton
            onPress={() => {
              navigateToProductEdit(products?.product.id);
            }}
          >
            <Icon name="edit" size={24} color="#fff"></Icon>
          </EditButton>
        </Header>
      </Wrapper>
      {loading ? (
        <>
          {products ? (
            <Content>
              <ProductTitle>{products.product.name}</ProductTitle>
              <AmountContnet>
                <Amount>Quantidade</Amount>
                <AmountQtd>{products.product.amount}</AmountQtd>
              </AmountContnet>
              <ContentTitile>Localização</ContentTitile>
              <AmountContnet>
                <Amount>{products.deposit.name}</Amount>
              </AmountContnet>
              <AmountContnet>
                <Amount>Estante</Amount>
                <AmountQtd>{products.shelf.name}</AmountQtd>
              </AmountContnet>
              <AmountContnet>
                <Amount>Prateleira</Amount>
                <AmountQtd>{products.plate.name}</AmountQtd>
              </AmountContnet>
            </Content>
          ) : (
            <>
              <Amount>Nenhum produto</Amount>
            </>
          )}
        </>
      ) : (
        <ActivityIndicator style={{ flex: 1 }} />
      )}
    </>
  );
};
export default Dashboard;
