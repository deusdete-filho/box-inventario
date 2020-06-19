import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Text,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';

import {
  Wrapper,
  Header,
  Title,
  TitleSub,
  Content,
  DeviceButton,
  DeviceText,
  Device,
} from './styles';
import Background from '../../components/Background';
import { SvgUri } from 'react-native-svg';

import Button from '../../components/Button';
import Devices from '../../components/Devices';
import api from '../../services/api';
interface Item {
  id: number;
  name: string;
}

const SingUpDevice: React.FC = () => {
  const { user } = useAuth();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // useEffect(() => {
  //   api.get('devicetype').then((response) => {
  //     setItems(response.data);
  //   });
  // }, []);

  const { signOut } = useAuth();
  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Arcondicionado',
    },
    {
      id: '3ac68afc-c605-48d3-4f8-fbd91aa97f63',
      title: 'Notebook',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571ed72',
      title: 'SmarTV',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2d72',
      title: 'Celular',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-45571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-14571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f1f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-171e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1459d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2d72',
      title: 'Third Item',
    },
  ];
  function Item({ title }) {
    return (
      <View style={styles.itemsContainer}>
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
  return (
    <Background>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#1CB970" />

        <Wrapper>
          <Header>
            <Title>Olá, {user.name}.</Title>
            <TitleSub>Quais equipamentos você possui em casa?</TitleSub>
          </Header>
        </Wrapper>

        <Content>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Device>
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={String(item.id)}
                  style={[
                    styles.item,
                    selectedItems.includes(item.id) ? styles.selectedItem : {},
                  ]}
                  onPress={() => handleSelectItem(item.id)}
                >
                  <Icon name="camera" size={38} color="#1CB971" />
                </TouchableOpacity>
                <DeviceText>{item.title}</DeviceText>
              </Device>
            )}
            keyExtractor={(item) => item.id}
            numColumns={4}
          />
          <Button onPress={() => {}}>
            <Text>Salvar</Text>
          </Button>
        </Content>
      </ScrollView>
    </Background>
  );
};
const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
  },

  item: {
    backgroundColor: '#fff',
    height: 80,
    width: 80,
    borderRadius: 40,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderColor: '#fff',
    borderWidth: 3,
  },

  selectedItem: {
    borderColor: '#1CB98E',
    backgroundColor: '#7CD6B0',
    borderWidth: 3,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});
export default SingUpDevice;
