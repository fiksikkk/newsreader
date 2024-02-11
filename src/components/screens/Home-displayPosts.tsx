import {useQuery} from '@apollo/client';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GET_POSTS} from '../../gql/gql';
import {HomeProps} from '../../types/types';

const DisplayPosts = ({navigation, route}: any) => {
  const {loading, error, data} = useQuery(GET_POSTS);

  if (loading) return <Text testID="progress">Loading...</Text>;
  if (error) return <Text testID="error">Error : {error.message}</Text>;

  return (
    <View testID="container">
      {data.characters.results.map(
        ({name, image, id}: {name: string; image: string; id: number}) => (
          <View style={styles.container} key={id}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Character', {userid: id})}>
              <Image style={styles.image} src={image} />
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
          </View>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  container: {
    padding: 25,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
  },
  name: {
    fontSize: 24,
  },
});

export default DisplayPosts;
