import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import {TextInputProps} from 'react-native';
import {Container, TextInput, Icon, Error, Text} from './styles';
import {useField} from '@unform/core';
import Icon2 from 'react-native-vector-icons/Feather';

interface InputValueReference {
  value: string;
}
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}
interface InputRef {
  focus(): void;
}
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {name, icon, ...rest},
  ref,
) => {
  const inputEelementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlurFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlurBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputEelementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputEelementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputEelementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#fff' : '#B8E9D7'}
      />
      <TextInput
        ref={inputEelementRef}
        placeholderTextColor="#B8E9D7"
        defaultValue={defaultValue}
        onFocus={handleInputBlurFocus}
        onBlur={handleInputBlurBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
      {error && (
        <Error>
          <Icon2 name="alert-circle" color="#C74F4F" size={14} />
          <Text>{error}</Text>
        </Error>
      )}
    </Container>
  );
};
export default forwardRef(Input);
