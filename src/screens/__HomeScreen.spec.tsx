import React from 'react';
import {faker} from '@faker-js/faker';

import {MockedProvider} from '@apollo/client/testing';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

import {GET_POSTS} from '../gql/gql';
import HomeScreen from './HomeScreen';
import {HomeProps} from '../types/types';

describe('Should render HomeScreen', () => {
  const navigation = {
    navigate: jest.fn(),
  } as unknown as HomeProps['navigation'];
  const route = {route: jest.fn()} as unknown as HomeProps['route'];

  it('should render and show progress on loading', () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[mock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );
    expect(utils.queryByTestId('progress')).toBeTruthy();
    expect(utils.toJSON()).toMatchSnapshot();
  });

  it('shold render and show an error', async () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[errorMock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(utils.queryByTestId('progress')).toBeFalsy();
    });
    expect(utils.queryByTestId('error')).toBeTruthy();
    expect(utils.toJSON()).toMatchSnapshot();
  });

  it('should render without data', async () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[emptyMock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(utils.queryByTestId('noData')).toBeTruthy();
    });
    expect(utils.toJSON()).toMatchSnapshot();
  });

  it('should render 5 cards when loading is done', async () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[mock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(utils.queryByTestId('progress')).toBeFalsy();
    });
    const cards = utils.queryAllByTestId('card');
    expect(cards.length).toBe(5);
    expect(utils.toJSON()).toMatchSnapshot();
  });

  it('should call navigate after pressing on a card', async () => {
    const mocks = [mock(1)];
    const utils = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(utils.queryByTestId('progress')).toBeFalsy();
    });
    const touches = utils.getAllByTestId('touch');
    fireEvent.press(touches[0]);
    expect(navigation.navigate).toHaveBeenCalledWith('Character', {
      userid: mocks[0].result.data.characters.results[0].id,
    });
  });

  it('should render 5 more cards after calling endReached  ', async () => {
    const mocks = [mock(1), mock(2)];
    const utils = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(utils.queryByTestId('progress')).toBeFalsy();
    });
    const FlatList = utils.getByTestId('container');
    fireEvent(FlatList, 'endReached');
    await waitFor(() => {
      expect(utils.queryAllByTestId('card').length).toBe(10);
    });
    expect(utils.toJSON()).toMatchSnapshot();
  });

  it('should render last page, call endReached and show noMoreCharacters', async () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[lastPageMock(1)]}>
        <HomeScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(utils.queryByTestId('progress')).toBeFalsy();
    });
    const FlatList = utils.getByTestId('container');
    fireEvent(FlatList, 'endReached');
    expect(utils.queryByTestId('noMoreCharacters')).toBeTruthy();
    expect(utils.toJSON()).toMatchSnapshot();
  });
});

const emptyMock = (page: number) => {
  return {
    request: {
      query: GET_POSTS,
      variables: {page},
    },
    result: {
      data: {
        characters: {
          info: {
            count: null,
            next: null,
            prev: null,
            pages: null,
          },
          results: [],
        },
      },
    },
  };
};

const errorMock = (page: number) => {
  return {
    request: {
      query: GET_POSTS,
      variables: {page: 1},
    },
    result: {
      errors: [
        {
          message: 'Syntax Error: Expected Name, found <EOF>',
          locations: [
            {
              line: 4,
              column: 6,
            },
          ],
          extensions: {
            code: 'GRAPHQL_PARSE_FAILED',
          },
        },
      ],
    },
  };
};

// const createUsers = (amount: number = 5) => {
//   let result = [];
//   for (let i = 0; i < amount; i++) {
//     result.push({
//       id: faker.string.uuid(),
//       name: faker.internet.userName(),
//       image: faker.image.url(),
//     });
//   }
//   return result;
// };

// console.log(createUsers());

const lastPageMock = (page: number) => {
  return {
    request: {
      query: GET_POSTS,
      variables: {page},
    },
    result: {
      data: {
        characters: {
          info: {
            count: 826,
            next: null,
            prev: 41,
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
          ],
        },
      },
    },
  };
};

const mock = (page: number) => {
  const itemsPerPage = 5;
  const modificator = page == 1 ? 0 : (page - 1) * itemsPerPage;
  return {
    request: {
      query: GET_POSTS,
      variables: {page},
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
              id: (1 + modificator).toString(),
              name: 'Rick Sanchez',
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            },
            {
              id: (2 + modificator).toString(),
              name: 'Morty Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            },
            {
              id: (3 + modificator).toString(),
              name: 'Summer Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
            },
            {
              id: (4 + modificator).toString(),
              name: 'Beth Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
            },
            {
              id: (5 + modificator).toString(),
              name: 'Jerry Smith',
              image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
            },
          ],
        },
      },
    },
  };
};
