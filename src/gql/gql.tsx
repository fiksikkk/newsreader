import {gql} from '@apollo/client';

export const GET_POSTS = gql`
  query Posts($page: Int) {
    characters(page: $page) {
      info {
        count
        next
        prev
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      image
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation AddCharacter(
    $name: String!
    $status: String!
    $species: String!
    $type: String!
    $gender: String!
    $origin_name: String!
    $originUrl: String!
    $location_name: String!
    $location_url: String!
    $image: String!
  ) {
    addCharacter(
      name: $name
      status: $status
      origin: {name: $origin_name, url: $origin_url}
      location: {name: $location_name, url: $location_url}
      image: $image
    ) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        url
      }
      location {
        name
        url
      }
      image
    }
  }
`;
