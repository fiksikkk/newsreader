import DisplayPosts from './Home-displayPosts';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {HomeProps} from '../../types/types';

const HomeScreen = ({navigation}: HomeProps) => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default HomeScreen;
