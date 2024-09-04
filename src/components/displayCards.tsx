import React from 'react';

import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import { Character, Characters } from '../types/types';

interface DisplayCardsProps {
  viewCharacter: (id: number) => void;
  data: Characters;
}

type ItemProps = {
  item: Character;
  onPress: (id: number) => void;
};

const Item = ({ item, onPress }: ItemProps) => (
  <View testID='card' style={styles.container} key={item.id}>
    <TouchableOpacity
      onPress={() => {
        onPress(item.id);
      }}>
      <Image style={styles.image} src={item.image} />
      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  </View>
);

const DisplayCards = ({ viewCharacter, data }: DisplayCardsProps) => {
  const renderItem = ({ item }: { item: Character }) => {
    return <Item item={item} onPress={() => viewCharacter(item.id)} />;
  };

  return (
    <FlatList
      contentContainerStyle={styles.box}
      testID="container"
      data={data.characters.results}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
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
    color: 'black',
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default DisplayCards;
