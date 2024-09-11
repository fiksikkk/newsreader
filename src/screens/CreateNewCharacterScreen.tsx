import React from 'react';
import {Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {CreacteCharacterProps, SignUpFormSchema} from '../types/types';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  GENDER_OPTIONS,
  signUpFormSchema,
  STATUS_OPTIONS,
} from '../schemas/CreateNewCharacterSchema';
import {TextController} from '../components/textController';
import DropDownController from '../components/dropDownController';
import {useMutation} from '@apollo/client';
import {ADD_CHARACTER} from '../gql/gql';

const CreateNewCharacterScreen = ({route}: CreacteCharacterProps) => {
  const methods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onBlur',
  });

  const [addCharacter] = useMutation(ADD_CHARACTER);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Create New Character Form</Text>
      <View style={styles.view}>
        <FormProvider {...methods}>
          <TextController methods={methods} name="name" />

          <View style={styles.spacing} />

          <DropDownController
            methods={methods}
            name="status"
            options={STATUS_OPTIONS}
          />

          <View style={styles.spacing} />

          <TextController methods={methods} name="species" />
          <View style={styles.spacing} />

          <TextController methods={methods} name="type" />
          <View style={styles.spacing} />

          <DropDownController
            methods={methods}
            name="gender"
            options={GENDER_OPTIONS}
          />
          <View style={styles.spacing} />

          <TextController methods={methods} name="origin_name" />
          <View style={styles.spacing} />

          <TextController methods={methods} name="origin_url" />
          <View style={styles.spacing} />

          <TextController methods={methods} name="location_name" />
          <View style={styles.spacing} />

          <TextController methods={methods} name="location_url" />
          <View style={styles.spacing} />

          <TextController methods={methods} name="image" />
          <View style={styles.spacing} />

          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <Button
            onPress={() => {
              const currFormValues = methods.getValues();
              const result = signUpFormSchema.safeParse(currFormValues);

              if (!result.success) {
                methods.trigger();
                return;
              }
              Alert.alert('Congratulations! New Character was created!');

              addCharacter({variables: result.data});
            }}
            title="Create character"
            color={'#007BFF'}
          />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
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
  spacing: {
    marginBottom: 24,
  },
});

export default CreateNewCharacterScreen;
