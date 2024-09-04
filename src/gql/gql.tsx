import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query Posts($page: Int){
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
    query Character($id: ID!){
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
  


