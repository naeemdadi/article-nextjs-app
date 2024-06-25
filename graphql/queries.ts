import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetArticles($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
        name
      }
    }
  }
`;
