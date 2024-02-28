import {SafeAreaView, ScrollView, Text} from 'react-native';
import {useState} from 'react';

import {useQuery} from '@apollo/client';
import {GET_POSTS} from '../gql/gql';

import {HomeProps} from '../types/types';

import Pagination from '../components/pagination';
import Header from '../components/header';
import DisplayCards from '../components/displayCards';

const HomeScreen = ({navigation}: HomeProps) => {
  const [page, setPage] = useState(1);

  const viewCharacter = (id: number) => {
    navigation.navigate('Character', {userid: id});
  };

  const {loading, error, data} = useQuery(GET_POSTS(page));

  if (loading) return <Text testID="progress">Loading...</Text>;
  if (error) return <Text testID="error">Error : {error.message}</Text>;

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          count={data.characters.info.count}
          results={data.characters.results}
        />

        <Pagination setPage={setPage} page={page} data={data} />

        <DisplayCards viewCharacter={viewCharacter} data={data} />

        <Pagination setPage={setPage} page={page} data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
