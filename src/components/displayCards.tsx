import React, {useRef, useState} from 'react';

import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import {Character, Characters, GetPostsVariables} from '../types/types';
import {
  FetchMoreFunction,
  RefetchFunction,
} from '@apollo/client/react/hooks/useSuspenseQuery';
import {FlatListFooter} from './flatListFooter';

interface DisplayCardsProps {
  viewCharacter: (id: number) => void;
  data: Characters;
  fetchMore: FetchMoreFunction<Characters, GetPostsVariables>;
  loading: boolean;
  refetch: RefetchFunction<Characters, GetPostsVariables>;
}

interface ItemProps {
  item: Character;
  onPress: (id: number) => void;
}

const DisplayCards = ({
  viewCharacter,
  data,
  fetchMore,
  loading,
  refetch,
}: DisplayCardsProps) => {
  const [isNextPage, setIsNextPage] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 400;

  const Item = ({item, onPress}: ItemProps) => (
    <View testID="card" style={styles.container} key={item.id}>
      <TouchableOpacity
        testID="touch"
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

  const onUpdate = (
    prev: Characters,
    options: {
      fetchMoreResult: Characters;
      variables: GetPostsVariables;
    },
  ) => {
    const results = [
      ...prev.characters.results,
      ...options.fetchMoreResult.characters.results,
    ];
    const newData = {
      characters: {...options.fetchMoreResult.characters, results},
    };
    return newData;
  };

  const handleOnEndReached =
    (fetchMore: FetchMoreFunction<Characters, GetPostsVariables>) => () => {
      if (loading) return;
      if (data.characters.info.next)
        return fetchMore({
          variables: {
            page: data.characters.info.next,
          },
          updateQuery: onUpdate,
        });
      setIsNextPage(false);
    };

  const renderItem = ({item}: {item: Character}) => {
    return <Item item={item} onPress={() => viewCharacter(item.id)} />;
  };
  return (
    <>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.box}
        testID="container"
        data={data.characters.results}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        getItemLayout={(data, index) => ({
          length: 300,
          offset: 300 * index,
          index,
        })}
        onEndReached={handleOnEndReached(fetchMore)}
        ListFooterComponent={FlatListFooter(loading, isNextPage)}
        refreshing={loading}
        onRefresh={refetch}
        onScroll={event => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
      />
      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <TouchableOpacity
          style={styles.scrollTopButton}
          onPress={() => {
            flatListRef.current?.scrollToIndex({index: 0, animated: true});
          }}>
          <Image source={require('../images/arrow-up.png')} />
        </TouchableOpacity>
      )}
    </>
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
    height: 280,
  },
  name: {
    fontSize: 24,
    width: 200,
    color: 'black',
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 200,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    borderRadius: 50,
  },
});

export default DisplayCards;
