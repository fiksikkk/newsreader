import React from 'react';
import {FieldError} from 'react-hook-form';
import {StyleSheet, Text} from 'react-native';

interface DisplayErrorProps {
  error: FieldError;
}

export const DisplayError = (props: DisplayErrorProps) => {
  const {error} = props;
  return <Text style={styles.errorMessage}>{error?.message}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 18,
    color: 'red',
    padding: 10,
  },
});
