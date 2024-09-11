import React from 'react';
import {Text} from 'react-native';

export const Loading = () => {
  return <Text testID="progress">Loading...</Text>;
};

interface StatusError {
  error: string;
}
export const StatusError = (props: StatusError) => {
  return <Text testID="error">Error : {props.error}</Text>;
};

export const NoData = () => {
  return <Text testID="noData">Sorry, there is no data to show</Text>;
};

export const NoMoreCharacters = () => {
  return <Text testID="noMoreCharacters">There is no more characters</Text>;
};
