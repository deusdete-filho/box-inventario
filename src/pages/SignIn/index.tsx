import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';
import Background from '../../components/Background';

import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Container, ContainerLogo } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { signIn, user } = useAuth();
  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('Obrigatório').email('Email inválido'),
          password: Yup.string().required('Obrigatória'),
        });
        // realizando validacao de dados
        await schema.validate(data, {
          abortEarly: false,
        });
        setLoading(true);

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        setLoading(false);

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as suas credenciais',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      <Background>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Container>
              <ContainerLogo>
                <Icon name="box" size={100} color="#dc7121"></Icon>
              </ContainerLogo>
              <Form ref={formRef} onSubmit={handleSignIn}>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  name="email"
                  icon="mail"
                  placeholder="Email"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={passwordInputRef}
                  name="password"
                  icon="lock"
                  placeholder="Senha"
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
                <Button
                  loading={loading}
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  ENTRAR
                </Button>
              </Form>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    </>
  );
};
export default SignIn;
