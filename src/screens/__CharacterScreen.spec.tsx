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
    });

    it('Should render a cards when loading is done', async () => {
        const utils = render(
            <MockedProvider addTypename={false} mocks={[mock(7)]}>
                <CharacterScreen navigation={navigation} route={route} />
            </MockedProvider>
        );

        await waitFor(() => [
            expect(utils.queryByTestId('progress')).toBeFalsy()
        ]);

        expect(utils.queryByTestId('container')?.children.length).toBe(6);

        expect(utils.toJSON()).toMatchSnapshot();
    });
});

const mock = (id: number | string) => {
    return {
        request: {
            query: GET_CHARACTER(id),
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