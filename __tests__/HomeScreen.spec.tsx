import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import {GET_POSTS} from '../src/gql/gql';
import HomeScreen from '../src/screens/HomeScreen';

describe('Should render HomeScreen', () => {
  const navigation = {navigate: () => {}};
  const route = {route: () => {}};

  it('should render and show progress on loading', () => {
    const wrapper = render(
      <MockedProvider addTypename={false} mocks={[mock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );

    expect(wrapper.queryByTestId('progress')).toBeTruthy();
  });

  it('should render 20 cards when loading is done', async () => {
    const wrapper = render(
      <MockedProvider addTypename={false} mocks={[mock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );

    await waitFor(() => [
      expect(wrapper.queryByTestId('progress')).toBeFalsy(),
    ]);

    expect(wrapper.queryByTestId('container')?.children.length).toBe(20);
  });
});

const mock = (page: number) => {
  return {
    request: {
      query: GET_POSTS(page),
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
            },
            {
              id: '6',
              name: 'Abadango Cluster Princess',
              image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
            },
            {
              id: '7',
              name: 'Abradolf Lincler',
              image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
            },
            {
              id: '8',
              name: 'Adjudicator Rick',
              image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
            },
            {
              id: '9',
              name: 'Agency Director',
              image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
            },
            {
              id: '10',
              name: 'Alan Rails',
              image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
            },
            {
              id: '11',
              name: 'Albert Einstein',
              image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
            },
            {
              id: '12',
              name: 'Alexander',
              image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
            },
            {
              id: '13',
              name: 'Alien Googah',
              image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg',
            },
            {
              id: '14',
              name: 'Alien Morty',
              image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
            },
            {
              id: '15',
              name: 'Alien Rick',
              image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
            },
            {
              id: '16',
              name: 'Amish Cyborg',
              image: 'https://rickandmortyapi.com/api/character/avatar/16.jpeg',
            },
            {
              id: '17',
              name: 'Annie',
              image: 'https://rickandmortyapi.com/api/character/avatar/17.jpeg',
            },
            {
              id: '18',
              name: 'Antenna Morty',
              image: 'https://rickandmortyapi.com/api/character/avatar/18.jpeg',
            },
            {
              id: '19',
              name: 'Antenna Rick',
              image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
            },
            {
              id: '20',
              name: 'Ants in my Eyes Johnson',
              image: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
            },
          ],
        },
      },
    },
  };
};
