import React from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';
import {DisplayError} from './createNewCharacterComponents';
import {SignUpFormSchema} from '../schemas/CreateNewCharacterSchema';

interface TextControllerProps {
  methods: UseFormReturn<SignUpFormSchema>;
  name: keyof SignUpFormSchema;
}

export const TextController = (props: TextControllerProps) => {
  const {methods, name} = props;
  const placeholder = (name.charAt(0).toUpperCase() + name.slice(1)).replace(
    '_',
    ' ',
  );
  return (
    <Controller
      control={methods.control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        return (
          <>
            <TextInput
              style={styles.textInput}
              placeholder={placeholder}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
            {error && <DisplayError error={error} />}
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
    backgroundColor: 'white',
  },
});
