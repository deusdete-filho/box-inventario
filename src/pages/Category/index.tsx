import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, Alert } from 'react-native';
import { AppLoading } from 'expo';

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
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import { Feather as Icon } from '@expo/vector-icons';
import api from '../../services/api';
export interface Product {
  id: string;
  name: string;
}
const Category: React.FC = () => {
  const { navigate } = useNavigation();
  const naviagtion = useNavigation();
  const { goBack } = useNavigation();

  const [product, setProduct] = useState<Product[]>([]);
  const [productotal, setProductTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(false);
    api
      .get('productcategory/')
      .then((response) => {
        setProduct(response.data);
        setProductTotal(response.data.length);
        setLoading(true);
        setRefreshing(false);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
  }, [refreshing]);

  const navigateToCategoryId = useCallback(
    (id: string, nameCategory: string) => {
      naviagtion.navigate('CategoryShow', { id, nameCategory });
    },
    [],
  );
  function handlerrefreshing() {
    setRefreshing(true);
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

          <Title>Categorias</Title>
          <BackButton
            onPress={() => {
              naviagtion.navigate('CategoryAdd');
            }}
          >
            <Icon name="plus" size={24} color="#fff"></Icon>
          </BackButton>
        </Header>
      </Wrapper>

      {product ? (
        <Content>
          <ProductList
            data={product}
            refreshing={refreshing}
            onRefresh={handlerrefreshing}
            ListFooterComponent={
              <TitleContentList>
                {productotal === 0
                  ? ''
                  : `${productotal} categorias cadastrados`}
              </TitleContentList>
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Device onPress={() => navigateToCategoryId(item.id, item.name)}>
                <TitleItem>{item.name}</TitleItem>
              </Device>
            )}
          />
        </Content>
      ) : (
        <AppLoading />
      )}
    </>
  );
};
export default Category;
