import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon, Error, Text } from './styles';
import { useField } from '@unform/core';
import { Feather } from '@expo/vector-icons';

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
  { name, ...rest },
  ref,
) => {
  const inputEelementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

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
        inputEelementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputEelementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <TextInput
        ref={inputEelementRef}
        placeholderTextColor="#b7b7b7"
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
          <Feather name="alert-circle" color="#C74F4F" size={14} />
        </Error>
      )}
    </Container>
  );
};
export default forwardRef(Input);
