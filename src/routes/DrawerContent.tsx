import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { Feather as Icon } from '@expo/vector-icons';
import api from '../services/api';
import { ProductList } from './styles';
import { useAuth } from '../hooks/auth';

export interface Category {
  id: string;
  name: string;
}
export function DrawerContent(
  props: JSX.IntrinsicAttributes &
    import('react-native').ScrollViewProps & { children: React.ReactNode },
) {
  const { signOut } = useAuth();
  const [product, setProduct] = useState<Category[]>([]);
  const [productotal, setProductTotal] = useState(0);

  useEffect(() => {
    api
      .get('productcategory/')
      .then((response) => {
        setProduct(response.data);
        setProductTotal(response.data.length);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {product ? (
          <ProductList
            data={product}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Drawer.Section>
                <DrawerItem
                  label={`${item.name}`}
                  onPress={() => {
                    props.navigation.navigate('Product');
                  }}
                ></DrawerItem>
              </Drawer.Section>
            )}
          />
        ) : (
          <ActivityIndicator style={{ flex: 1 }} color="#000" />
        )}
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          label="Sair"
          icon={({ color, size }) => <Icon name="log-out"></Icon>}
          onPress={() => {
            signOut();
          }}
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
}
