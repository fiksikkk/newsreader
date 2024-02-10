import {gql} from '@apollo/client';

export const GET_POSTS = gql`
  query {
    characters {
      info {
        count
      }
      results {
        id
        name
        image
      }
    }
  }
`;

export const GET_CHARACTER = (id: number | string) => {
  return gql`
    query {
      character(id: ${id}) {
        name
        status
        species
        type
        gender
        image
      }      
    }
  `;
};
