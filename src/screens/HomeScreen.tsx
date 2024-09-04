import React from 'react';
import { useState } from 'react';

import { useQuery } from '@apollo/client';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import DisplayCards from '../components/displayCards';
import Header from '../components/header';
import { GET_POSTS } from '../gql/gql';
import { Characters, GetPostsVariables, HomeProps } from '../types/types';

const HomeScreen = ({ navigation }: HomeProps) => {
  const [page] = useState(1);

  const viewCharacter = (id: number) => {
    navigation.navigate('Character', { userid: id });
  };

  const { loading, error, data, fetchMore } = useQuery<Characters, GetPostsVariables>(GET_POSTS,
    { variables: { page }, notifyOnNetworkStatusChange: true });

  if (!data && loading) {
    return <Text testID="progress">Loading...</Text>;
  }
  if (error) {
    return <Text testID="error">Error : {error.message}</Text>;
  }
  if (!data) {
    return <Text>Sorry, there is no data to show  </Text>
  }

  return (
    <SafeAreaView>
      <Header
        count={data.characters.info.count}
        results={data.characters.results}
      />

      <DisplayCards viewCharacter={viewCharacter} data={data} fetchMore={fetchMore} loading={loading} />

    </SafeAreaView>
  );
};

export default HomeScreen;
