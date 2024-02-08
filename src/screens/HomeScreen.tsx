import DisplayPosts from '../displayPosts';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const HomeScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <DisplayPosts navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
