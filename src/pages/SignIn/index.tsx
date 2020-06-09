import React, {useCallback, useRef, useState} from 'react';
import {StatusBar} from 'react-native';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {useAuth} from '../../hooks/auth';
import Background from '../../components/Background';

import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  ForgotPassword,
  ForgotPasswordText,
  Title,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import logo from '../../assets/logo.png';

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

  const {signIn, user} = useAuth();
  console.log(user);

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
      <StatusBar barStyle="light-content" backgroundColor="#1CB970" />
      <Background>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flex: 1}}>
            <Container>
              <Image source={logo} />

              <Title />

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
                  }}>
                  Entrar
                </Button>
              </Form>

              <ForgotPassword>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword>
            </Container>
          </ScrollView>
          <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
            <CreateAccountButtonText>CRIAR UMA CONTA</CreateAccountButtonText>
          </CreateAccountButton>
        </KeyboardAvoidingView>
      </Background>
    </>
  );
};
export default SignIn;
