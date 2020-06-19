import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import api from '../services/api';
import { AsyncStorage } from 'react-native';
interface AuthState {
  token: string;
  user: object;
}
interface LoginCredentials {
  email: string;
  password: string;
}
interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: LoginCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(' useAuth erro');
  }
  return context;
}
const AuthProvider: React.FC = ({ children }) => {
  // salvar dados do login no contexto
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@mina:token',
        '@mina:user',
      ]);
      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
        api.defaults.headers.Authorization = `Bearer ${token[1]}`;
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);
  // funcao de realizar login na sessao
  const signIn = useCallback(async ({ email, password }) => {
    // evia os dados para a api
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    // salva os dados no storage do navegador
    await AsyncStorage.multiSet([
      ['@mina:token', token],
      ['@mina:user', JSON.stringify(user)],
    ]);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  // funcao de fazer logof
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@mina:token', '@mina:user']);

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
