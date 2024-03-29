import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {Characters} from '../types/types';

const DisplayCards = ({
  viewCharacter,
  data,
}: {
  viewCharacter: (id: number) => void;
  data: Characters;
}) => {
  return (
    <View testID="container" style={styles.box}>
      {data.characters.results.map(({name, image, id}) => (
        <View style={styles.container} key={id}>
          <TouchableOpacity
            onPress={() => {
              viewCharacter(id);
            }}>
            <Image style={styles.image} src={image} />
            <Text numberOfLines={1} style={styles.name}>
              {name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
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
    borderWidth: 2,
    borderColor: '#841584',
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    width: 200,
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default DisplayCards;
