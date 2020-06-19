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
import { useNavigation } from '@react-navigation/native';

import { Feather as Icon } from '@expo/vector-icons';
import api from '../../../services/api';
import Button from '../../../components/Button';
interface RouteParams {
  id: string;
}
interface Plate {
  label: string;
  value: string;
}

const ProductAdd: React.FC = () => {
  const { goBack } = useNavigation();

  const [plate, setPlate] = useState<Plate[]>([]);
  const [shelf, setShelf] = useState<Plate[]>([]);
  const [deposit, setDeposit] = useState<Plate[]>([]);
  const [category, setCategory] = useState<Plate[]>([]);

  const [plate_id, setSelectedPlate] = useState('');
  const [shelf_id, setSelectedShelf] = useState('');
  const [amount, setAmountProduct] = useState('');
  const [product_category_id, setSelectedCategory] = useState('');
  const [name, setNameProduct] = useState('');
  const [deposit_id, setSelectedDeposit] = useState('');
  const [selectedCity, setSelectedCity] = useState('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get('plate/selectform')
      .then((response) => {
        setPlate(response.data);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
    api
      .get('shelf/selectform')
      .then((response) => {
        setShelf(response.data);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
    api
      .get('deposit/selectform')
      .then((response) => {
        setDeposit(response.data);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
    api
      .get('productcategory/selectform')
      .then((response) => {
        setCategory(response.data);
      })
      .catch(function (error: string): any {
        Alert.alert(
          'Erro de conexão',
          'Ocorreu um erro ao fazer requisição ao banco de dados',
        );
      });
  }, []);

  const placeholderPlate = {
    label: 'Selecione a prateleira',
    value: null,
  };
  const placeholderDeposit = {
    label: 'Selecione o depósito',
    value: null,
  };
  const placeholderCategory = {
    label: 'Selecione a categoria',
    value: null,
  };
  const placeholderShelf = {
    label: 'Selecione a estante',
    value: null,
  };
  function handleSubmitCategory() {
    try {
      if (product_category_id == '') {
        Alert.alert('Selecione a categoria!');
        return;
      }
      if (name == '') {
        Alert.alert('Digite o nome!');
        return;
      }
      if (amount == '') {
        Alert.alert('Digite a quantidade!');
        return;
      }
      if (deposit_id == '') {
        Alert.alert('Selecione o depósito!');
        return;
      }
      if (shelf_id == '') {
        Alert.alert('Selecione a Estante!');
        return;
      }
      if (plate_id == '') {
        Alert.alert('Selecione a Prateleira!');
        return;
      }
      setLoading(true);
      const responde = api.post('productdeposit', {
        name,
        amount,
        product_category_id,
        deposit_id,
        shelf_id,
        plate_id,
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
            <Title>Novo Produto</Title>
            <EditButton onPress={() => {}}></EditButton>
          </Header>
        </Wrapper>

        <Content>
          <Select>
            <RNPickerSelect
              onValueChange={(value) => setSelectedCategory(value)}
              value={product_category_id}
              placeholder={placeholderCategory}
              items={category}
            />
          </Select>

          <Input
            value={name}
            onChangeText={setNameProduct}
            placeholder="Digite o nome"
            autoCorrect={false}
          ></Input>
          <Input
            value={amount}
            onChangeText={setAmountProduct}
            placeholder="Digite a quantidade"
            keyboardType="number-pad"
          ></Input>
          <Select>
            <RNPickerSelect
              onValueChange={(value) => setSelectedDeposit(value)}
              value={deposit_id}
              placeholder={placeholderDeposit}
              items={deposit}
            />
          </Select>
          <Select>
            <RNPickerSelect
              onValueChange={(value) => setSelectedShelf(value)}
              value={shelf_id}
              placeholder={placeholderShelf}
              items={shelf}
            />
          </Select>
          <Select>
            <RNPickerSelect
              onValueChange={(value) => setSelectedPlate(value)}
              value={plate_id}
              placeholder={placeholderPlate}
              items={plate}
            />
          </Select>
          <Button loading={loading} onPress={() => handleSubmitCategory()}>
            CADASTRAR
          </Button>
        </Content>
      </KeyboardAvoidingView>
    </>
  );
};

export default ProductAdd;
