import React from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {CreacteCharacterProps, SignUpFormSchema} from '../types/types';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signUpFormSchema} from '../schemas/CreateNewCharacterSchema';

const CreateNewCharacterScreen = ({route}: CreacteCharacterProps) => {
  const methods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onBlur',
  });

  //   const onSubmit = data => {
  //     Alert.alert('Successful', JSON.stringify(data));
  //   };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Create New Character Form</Text>
      <View style={styles.view}>
        <FormProvider {...methods}>
          <Controller
            control={methods.control}
            name="name"
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => {
              return (
                <>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Name"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    //   errorMessage={error?.message}
                  />
                  {error && (
                    <Text style={styles.errorMessage}>{error?.message}</Text>
                  )}
                </>
              );
            }}
          />
          <Controller
            control={methods.control}
            name="status"
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => {
              return (
                <>
                  {/* <TextInput
                    style={styles.textInput}
                    placeholder="Status"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    //   errorMessage={error?.message}
                  />
                  {error && (
                    <Text style={styles.errorMessage}>{error?.message}</Text>
                  )} */}
                </>
              );
            }}
          />
          <Button
            onPress={() => {
              const currFormValues = methods.getValues();
              // https://zod.dev/?id=safeparse
              const result = signUpFormSchema.safeParse(currFormValues);

              if (!result.success) {
                const formattedError = result.error.format();
                console.log(JSON.stringify(formattedError));
                Alert.alert(JSON.stringify(formattedError));
              } else {
                Alert.alert('Validation is successful with zod');
              }
            }}
            title="Submit Form"
            color={'#007BFF'}
          />
        </FormProvider>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  view: {flex: 1, backgroundColor: 'transparent'},
  textInput: {
    borderBottomColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
    backgroundColor: 'white',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    padding: 10,
  },
});

export default CreateNewCharacterScreen;
