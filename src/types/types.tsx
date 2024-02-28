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

interface Character {
  name: string;
  image: string;
  id: number;
}

interface Info {
  next: number;
  prev: number;
  pages: number;
}

export interface Characters {
  characters: {results: Character[]; info: Info};
}
