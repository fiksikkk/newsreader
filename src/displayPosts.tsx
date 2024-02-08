import {useQuery, gql} from '@apollo/client';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const GET_POSTS = gql`
  query {
    characters {
      info {
        count
      }
      results {
        id
        name
        image
      }
    }
  }
`;

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

const DisplayPosts = ({navigation}: any) => {
  const {loading, error, data} = useQuery(GET_POSTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return data.characters.results.map(
    ({name, image, id}: {name: string; image: string; id: number}) => (
      <View style={styles.container} key={id}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Character', {id: id})}>
          <Image style={styles.image} src={image} />
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
      </View>
    ),
  );
};

export default DisplayPosts;
