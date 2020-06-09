import React, {useState, useEffect} from 'react';
import {FlatList, Image, Alert, TextInput} from 'react-native';

import {useAuth} from '../../hooks/auth';
import Button from '../../components/Button';
import {Title, Device, Header, Container, TitleItem} from './styles';
import api from '../../services/api';
interface DeviceType {
  id: number;
  name: string;
  icon: string;
}
const ListaaDevice: React.FC = () => {
  const [device, setDevice] = useState<DeviceType | null>(null);
  const [searchResults, setSearchResults] = useState<DeviceType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loaddevicetype() {
      await api
        .get('device/')
        .then((response) => {
          setDevice(response.data);
          setSearchResults(response.data);
        })
        .catch(function (error: string): any {
          Alert.alert(
            'Erro de conexão',
            'Ocorreu um erro ao fazer requisição ao banco de dados',
          );
        });
    }
    loaddevicetype();
  }, []);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  const handleChange = (e: {target: {value: React.SetStateAction<string>}}) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {}, [searchTerm]);

  return (
    <>
      <Container>
        <Title>Equipamentos</Title>
        <TextInput
          size="big"
          icon="search"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleChange}
        />

        <FlatList
          data={device}
          keyExtractor={(item) => String(item)}
          renderItem={({item}) => (
            <Device>
              <TitleItem>{item.name}</TitleItem>
            </Device>
          )}
        />

        {/* <Button onPress={signOut}>Sair</Button> */}
      </Container>
    </>
  );
};
export default ListaaDevice;
