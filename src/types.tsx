import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type StackParamList = {
  Home: undefined;
  Character: {userid: number | string};
};

export type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;
export type CharacterProps = NativeStackScreenProps<
  StackParamList,
  'Character'
>;
