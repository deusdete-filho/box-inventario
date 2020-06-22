import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import {
  Wrapper,
  Header,
  Title,
  Content,
  Device,
  AmountContnetItem,
  ProductTitle,
  AmountPlus,
  BackButton,
  EditButton,
  AmountQtdItem,
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
  product: {
    id: number;
    name: string;
    amount: number;
    category: { name: string };
  };
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
  const [amount, setAmount] = useState(0);
  const [loadingamount, setLoadingamount] = useState(false);

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
        goBack();
      });
  }, [id]);
  useEffect(() => {
    setAmount(products?.product.amount);
  }, [products]);
  const navigateToProductEdit = useCallback(
    (id: string, idproductdeposit: string) => {
      navigate('ProductEdit', { id, idproductdeposit });
    },
    [navigate],
  );
  function productadd() {
    setLoadingamount(true);
    api
      .patch(`product/${products?.product.id}/amountadd`)
      .then((response) => {
        setAmount(amount + 1);
        setLoadingamount(false);
      })
      .catch(function (error: string): any {
        Alert.alert('Erro de conexão', 'Ocorreu um erro ao fazer requisição');
      });
  }
  function productless() {
    setLoadingamount(true);
    api
      .patch(`product/${products?.product.id}/amountless`)
      .then((response) => {
        setAmount(amount - 1);
        setLoadingamount(false);
      })
      .catch(function (error: string): any {
        Alert.alert('Erro', 'Ocorreu um erro ao fazer requisição');
        setLoadingamount(false);
      });
  }
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
          <Title>{products?.product.name}</Title>
          <EditButton
            onPress={() => {
              navigateToProductEdit(products?.product.id, products?.id);
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
              <AmountContnet>
                <AmountPlus
                  onPress={() => {
                    productless();
                  }}
                >
                  <Icon name="minus" size={30} color="#dc7121"></Icon>
                </AmountPlus>
                {loadingamount ? (
                  <ActivityIndicator size="large"></ActivityIndicator>
                ) : (
                  <AmountQtd>{amount}</AmountQtd>
                )}

                <AmountPlus onPress={() => productadd()}>
                  <Icon name="plus" size={30} color="#dc7121"></Icon>
                </AmountPlus>
              </AmountContnet>
              <ContentTitile>Categoria</ContentTitile>
              <AmountContnetItem>
                <Amount>{products.product.category.name}</Amount>
              </AmountContnetItem>
              <ContentTitile>Localização</ContentTitile>
              <AmountContnetItem>
                <Amount>Depósito</Amount>
                <AmountQtdItem>{products.deposit.prefix}</AmountQtdItem>
              </AmountContnetItem>
              <AmountContnetItem>
                <Amount>Estante</Amount>
                <AmountQtdItem>{products.shelf.name}</AmountQtdItem>
              </AmountContnetItem>
              <AmountContnetItem>
                <Amount>Prateleira</Amount>
                <AmountQtdItem>{products.plate.name}</AmountQtdItem>
              </AmountContnetItem>
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
