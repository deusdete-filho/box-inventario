import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, Alert, ActivityIndicator } from 'react-native';
import {
  Wrapper,
  Header,
  Title,
  Content,
  ProductList,
  Device,
  TitleItem,
  TitleContent,
  BackButton,
  TitleContentList,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather as Icon } from '@expo/vector-icons';
import api from '../../../services/api';
import { Input } from '../../Dashboard/styles';
export interface Product {
  id: string;
  deposit: { id: number; prefix: string };
  product: { id: number; name: string; amount: number };
  shelf: { id: number; name: string };
  plate: { id: number; name: string };
}
interface RouteParams {
  id: string;
  nameCategory: string;
}
const CategoryShow: React.FC = () => {
  const { navigate } = useNavigation();
  const naviagtion = useNavigation();
  const { goBack } = useNavigation();

  const route = useRoute();
  const { id, nameCategory } = route.params as RouteParams;

  const [product, setProduct] = useState<Product[]>([]);
  const [productotal, setProductTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  useEffect(() => {
    api
      .get(`productdeposit/${id}/category`)
      .then((response) => {
        setProduct(response.data);
        setSearchResults(response.data);
        setProductTotal(response.data.length);
        setRefreshing(false);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
  }, [id, refreshing]);

  const navigateToProduct = useCallback(
    (id: string) => {
      navigate('Product', { id });
    },
    [navigate],
  );
  function handlerrefreshing() {
    setRefreshing(true);
  }

  function minuscula(name: string) {
    var string = name.toUpperCase();
    return setName(string);
  }

  useEffect(() => {
    minuscula(name);
    const results = product.filter((product: Product) =>
      product.product.name.toUpperCase().includes(name),
    );
    setSearchResults(results);
    setProductTotal(results.length);
  }, [name]);

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

          <Title>{nameCategory}</Title>
          <BackButton
            onPress={() => {
              naviagtion.navigate('ProductAdd');
            }}
          >
            <Icon name="plus" size={24} color="#fff"></Icon>
          </BackButton>
        </Header>
      </Wrapper>
      {searchResults ? (
        <Content>
          <ProductList
            data={searchResults}
            refreshing={refreshing}
            onRefresh={handlerrefreshing}
            ListHeaderComponent={
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Digite para pesquisar"
              ></Input>
            }
            ListFooterComponent={
              <TitleContentList>
                {productotal === 0
                  ? 'Nenhum produto encontrado'
                  : `${productotal} produtos encontrados`}
              </TitleContentList>
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Device onPress={() => navigateToProduct(item.id)}>
                <TitleItem>{item.product.name}</TitleItem>

                <TitleItem>
                  {item.deposit.prefix}
                  {item.shelf.name}
                  {item.plate.name} - {item.product.amount}
                </TitleItem>
              </Device>
            )}
          />
        </Content>
      ) : (
        <ActivityIndicator style={{ flex: 1 }} color="#000" />
      )}
    </>
  );
};
export default CategoryShow;
