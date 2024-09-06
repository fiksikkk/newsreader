import * as React from 'react';

import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {apolloClient} from './src/apollo/apolloClient';
import CharacterScreen from './src/screens/CharacterScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateNewCharacterScreen from './src/screens/CreateNewCharacterScreen';
import {StackParamList} from './src/types/types';

const Stack = createNativeStackNavigator<StackParamList>();

const App = (): React.JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="Character"
            component={CharacterScreen}
            options={{title: 'About'}}
          />
          <Stack.Screen
            name="CreateNewCharacter"
            component={CreateNewCharacterScreen}
            options={{title: 'Create new character'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
