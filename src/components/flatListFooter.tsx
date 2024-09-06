import React from "react"
import { Text } from "react-native"
import { Loading, NoMoreCharacters } from "./status"

export const FlatListFooter = (loading: boolean, isNextPage: boolean) => {
    if (loading)
        return Loading();
    else if (!isNextPage)
        return NoMoreCharacters();
    else return null
}