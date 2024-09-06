import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  Home: undefined;
  Character: { userid: number | string };
  CreateNewCharacter: { createCharacter: boolean};
};

export type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;
export type CharacterProps = NativeStackScreenProps<StackParamList,'Character'>;
export type CreacteCharacterProps = NativeStackScreenProps<StackParamList, 'CreateNewCharacter'>;

export interface Character {
  name: string;
  image: string;
  id: number;
}

interface Info {
  next: number;
  prev: number;
  pages: number;
  count: number;
}

export interface Characters {
  characters: { results: Character[]; info: Info };
}

export interface GetPostsVariables {
  page: number
}