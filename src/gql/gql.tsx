import {gql} from '@apollo/client';

export const GET_POSTS = (page: number | string) => {
  return gql`
    query {
      characters(page: ${page}) {
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
};

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
