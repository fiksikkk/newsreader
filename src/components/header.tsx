import {View, Text, StyleSheet} from 'react-native';

const Header = ({count, results}: any) => {
  return (
    <View style={styles.header}>
      <Text>Here is {count} characters</Text>
      <Text>Displayed: {Object.keys(results).length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
});

export default Header;
