import React from 'react';

import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react-native";
import { GET_CHARACTER } from "../gql/gql";
import CharacterScreen from "./CharacterScreen";
import { CharacterProps } from '../types/types';

describe('Should render CharacterScreen', () => {
  const navigation = { navigate: jest.fn() } as unknown as CharacterProps['navigation'];
  const route = { route: jest.fn(), params: { userid: 7 } } as unknown as CharacterProps['route'];

  it('Shold render and show progress on loading', () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[mock(7)]}>
        <CharacterScreen navigation={navigation} route={route} />
      </MockedProvider>
    );
    expect(utils.queryByTestId('progress')).toBeTruthy();
    expect(utils.toJSON()).toMatchSnapshot();
  });

  it('shold render and show an error', async () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[errorMock(7)]}>
        <CharacterScreen navigation={navigation} route={route} />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(utils.queryByTestId('progress')).toBeFalsy()
    });
    expect(utils.queryByTestId('error')).toBeTruthy();
    expect(utils.toJSON()).toMatchSnapshot();
  })

  it('should render without data', async () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[emptyMock(7)]}>
        <CharacterScreen navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(utils.queryByTestId('noData')).toBeTruthy()
    })
    expect(utils.toJSON()).toMatchSnapshot();
  })

  it('Should render a cards when loading is done', async () => {
    const utils = render(
      <MockedProvider addTypename={false} mocks={[mock(7)]}>
        <CharacterScreen navigation={navigation} route={route} />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(utils.queryByTestId('progress')).toBeFalsy()
    });
    expect(utils.queryByTestId('container')?.children.length).toBe(6);
    expect(utils.toJSON()).toMatchSnapshot();
  });
});

const mock = (id: number) => {
  return {
    request: {
      query: GET_CHARACTER, variables: { id }
    },
    result: {
      data: {
        "character": {
          "name": "Abradolf Lincler",
          "status": "unknown",
          "species": "Human",
          "type": "Genetic experiment",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg"

        }
      }
    }
  }
}

const emptyMock = (id: number) => {
  return {
    request: {
      query: GET_CHARACTER, variables: { id },
    },
    result: {
      data: {
        character: null
      }
    }
  }
}

const errorMock = (id: number) => {
  return {
    request: {
      query: GET_CHARACTER, variables: { id }
    },
    result: {
      errors: [
        {
          message: "Syntax Error: Expected Name, found <EOF>",
          locations: [
            {
              line: 4,
              column: 6
            }
          ],
          extensions: {
            code: "GRAPHQL_PARSE_FAILED"
          }
        }
      ]
    }
  }
}