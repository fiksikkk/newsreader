import React from 'react';
import { useState } from 'react';

import { useQuery } from '@apollo/client';
import { SafeAreaView, Text } from 'react-native';

import DisplayCards from '../components/displayCards';
import Header from '../components/header';
import { GET_POSTS } from '../gql/gql';
import { Characters, GetPostsVariables, HomeProps } from '../types/types';
import { Loading, NoData, StatusError } from '../components/status';

const HomeScreen = ({ navigation }: HomeProps) => {
  const [page] = useState(1);

  const viewCharacter = (id: number) => {
    navigation.navigate('Character', { userid: id });
  };

  const { loading, error, data, fetchMore, refetch } = useQuery<Characters, GetPostsVariables>(GET_POSTS,
    { variables: { page }, notifyOnNetworkStatusChange: true });

  if (!data?.characters?.results?.length && loading) {
    return Loading();
  }
  if (error) {
    return StatusError(error.message);
  }
  if (!data?.characters?.results?.length) {
    return NoData();
  }

  return (
    <SafeAreaView>
      <Header
        count={data.characters.info.count}
        results={data.characters.results}
      />

      <DisplayCards viewCharacter={viewCharacter} data={data} fetchMore={fetchMore} loading={loading} refetch={refetch} />

    </SafeAreaView>
  );
};

export default HomeScreen;
