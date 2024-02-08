import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ApolloProvider, gql, useQuery} from '@apollo/client';

import {apolloClient} from './apolloClient';

const GET_POSTS = gql`
  query {
    characters(page: 2, filter: {name: "rick"}) {
      results {
        name
      }
    }
  }
`;

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={apolloClient}>
      <View>
        <Text>All works</Text>
        <DisplayLocations />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({});

export default App;

function DisplayLocations() {
  const {loading, error, data} = useQuery(GET_POSTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return data.characters.results.map(({name}: {name: string}) => (
    <Text>{name}</Text>
  ));
}
