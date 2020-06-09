import React, {useRef, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import api from '../../services/api';
import Background from '../../components/Background';

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Container, Title, BackToSignIn, BackToSignInText} from './styles';
import logo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const telefoneInputRef = useRef<TextInput>(null);
  const cidadeInputRef = useRef<TextInput>(null);

  // funcao de validacao de cadastro
  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Obrigatório'),
          email: Yup.string().required('Obrigatório').email('Inválido'),
          password: Yup.string()
            .required('Obrigtória')
            .min(6, 'Minimo de 6 digitos'),
        });
        // valida validacao
        await schema.validate(data, {
          abortEarly: false,
        });
        // eviar pra api
        await api.post('/users', data);
        // cria alerta de suceeso
        Alert.alert(
          'Cadastro realizado!',
          'Você já pode realizar login com seus dados',
        );
        // volta pra pagina de login
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente',
        );
      }
    },
    [navigation],
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
              <View>
                <Title>Realize seu cadastro</Title>
              </View>

              <Form ref={formRef} onSubmit={handleSignUp}>
                <Input
                  name="name"
                  icon="user"
                  placeholder="Nome"
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    emailInputRef.current?.focus();
                  }}
                />

                <Input
                  ref={emailInputRef}
                  name="email"
                  icon="mail"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    telefoneInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={telefoneInputRef}
                  name="telefone"
                  icon="phone"
                  placeholder="Telefone"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    cidadeInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={cidadeInputRef}
                  name="cidade"
                  icon="home"
                  placeholder="Cidade"
                  autoCapitalize="none"
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
                  textContentType="newPassword"
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />
                <Button onPress={() => formRef.current?.submitForm()}>
                  CADASTRAR
                </Button>
              </Form>
            </Container>
          </ScrollView>
          <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para Login</BackToSignInText>
          </BackToSignIn>
        </KeyboardAvoidingView>
      </Background>
    </>
  );
};
export default SignUp;
