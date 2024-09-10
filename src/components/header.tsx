import React from 'react';

import {View, Text, StyleSheet, Touchable, Button} from 'react-native';

interface HeaderProps {
  count: number;
  results: any;
  createNewCharacter: () => void;
}

const Header = ({count, results, createNewCharacter}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Here is {count} characters</Text>
      <Text style={styles.text}>Displayed: {Object.keys(results).length}</Text>
      <Button onPress={createNewCharacter} title="Add" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    color: 'black',
  },
  text: {
    color: 'black',
  },
});

export default Header;
