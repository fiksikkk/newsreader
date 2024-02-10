import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ApolloProvider} from '@apollo/client';
import {apolloClient} from './src/apollo/apolloClient';

import {HomeScreen} from './src/screens/HomeScreen';
import {CharacterScreen} from './src/screens/CharacterScreen';

import {StackParamList} from './src/types';

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
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
