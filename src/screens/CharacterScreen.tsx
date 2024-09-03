import React from 'react';

import {useQuery} from '@apollo/client';
import {Image, StyleSheet, Text, View} from 'react-native';

import {GET_CHARACTER} from '../gql/gql';
import {CharacterProps} from '../types/types';

const CharacterScreen = ({route}: CharacterProps) => {
  const {loading, error, data} = useQuery(GET_CHARACTER(route.params.userid));

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error : {error.message}</Text>;
  }

  return (
    <View style={styles.container} key={data.character.id}>
      <Image style={styles.image} src={data.character.image} />
      <Text style={styles.name}>Name: {data.character.name}</Text>
      <Text style={styles.name}>Gender: {data.character.gender}</Text>
      <Text style={styles.name}>Status: {data.character.status}</Text>
      <Text style={styles.name}>Species: {data.character.species}</Text>
      <Text style={styles.name}>Type: {data.character.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
  },
  container: {
    padding: 25,
    margin: 10,
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
  },
});

export default CharacterScreen;
