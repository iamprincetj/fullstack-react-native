import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    id
                    description
                    fullName
                    ownerAvatarUrl
                    language
                    stargazersCount
                    ratingAverage
                    reviewCount
                    forksCount
                }
            }
        }
    }
`;

export const USER = gql`
    query {
        me {
            id
            username
        }
    }
`;