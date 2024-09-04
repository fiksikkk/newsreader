import React from 'react';

import { useQuery } from '@apollo/client';
import { Image, StyleSheet, Text, View } from 'react-native';

import { GET_CHARACTER } from '../gql/gql';
import { CharacterProps } from '../types/types';

const CharacterScreen = ({ route }: CharacterProps) => {
  const { loading, error, data } = useQuery(GET_CHARACTER,
    { variables: { id: route.params.userid } });
  console.log(loading, error, data)
  if (loading) {
    return <Text testID='progress'>Loading...</Text>;
  }
  if (error) {
    return <Text testID='error'>Error : {error.message}</Text>;
  }

  const { image, name, gender, status, species, type, id } = data.character;
  return (
    <View testID='container' style={styles.container} key={id}>
      <Image style={styles.image} src={image} />
      <Text style={styles.name}>Name: {name}</Text>
      <Text style={styles.name}>Gender: {gender}</Text>
      <Text style={styles.name}>Status: {status}</Text>
      <Text style={styles.name}>Species: {species}</Text>
      <Text style={styles.name}>Type: {type}</Text>
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
    color: 'black',
  },
});

export default CharacterScreen;
