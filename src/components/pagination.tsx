import {View, Button, Text, StyleSheet} from 'react-native';
import {Characters} from '../types/types';

const Pagination = ({
  setPage,
  page,
  data,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  data: Characters;
}) => {
  return (
    <View style={styles.container}>
      {data.characters.info.prev && (
        <>
          <Button
            onPress={() => {
              setPage(1);
            }}
            title="<<"
            color="#841584"
          />
          <Button
            onPress={() => {
              setPage(page - 1);
            }}
            title="<"
            color="#841584"
          />
        </>
      )}

      <Text style={{width: '60%'}}>Page: {page}</Text>
      {data.characters.info.next && (
        <>
          <Button
            onPress={() => {
              setPage(page + 1);
            }}
            title=">"
            color="#841584"
          />
          <Button
            onPress={() => {
              setPage(data.characters.info.pages);
            }}
            title=">>"
            color="#841584"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
  },
});

export default Pagination;
