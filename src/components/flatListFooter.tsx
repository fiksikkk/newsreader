import React from 'react';
import {Text} from 'react-native';
import {Loading, NoMoreCharacters} from './status';

export const FlatListFooter = (loading: boolean, isNextPage: boolean) => {
  if (loading) return Loading();
  if (!isNextPage) return NoMoreCharacters();
  return null;
};
