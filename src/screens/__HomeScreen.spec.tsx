import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react-native';

import { GET_POSTS } from '../gql/gql';
import HomeScreen from './HomeScreen';
import { HomeProps } from '../types/types';

describe('Should render HomeScreen', () => {
  const navigation = { navigate: jest.fn() } as unknown as HomeProps['navigation'];
  const route = { route: jest.fn() } as unknown as HomeProps['route'];

  it('should render and show progress on loading', () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[mock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );

    expect(utils.queryByTestId('progress')).toBeTruthy();
  });

  it('should render 5 cards when loading is done', async () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[mock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );

    await waitFor(() => [
      expect(utils.queryByTestId('progress')).toBeFalsy(),
    ]);

    expect(utils.queryAllByTestId('card').length).toBe(5);
    expect(utils.toJSON()).toMatchSnapshot();
  });
});

const mock = (page: number) => {
  return {
    request: {
      query: GET_POSTS, variables: { page },
    },
    result: {
      data: {
        characters: {
          info: {
            count: 826,
            next: 2,
            prev: null,
            pages: 42,
          },
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            },
            {
              id: '2',
              name: 'Morty Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            },
            {
              id: '3',
              name: 'Summer Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
            },
            {
              id: '4',
              name: 'Beth Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
            },
            {
              id: '5',
              name: 'Jerry Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
            }
          ],
        },
      },
    },
  };
};
