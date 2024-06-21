import { gql } from "@apollo/client";
import { REPO_ITEM, REVIEW_ITEM } from "./fragments";

export const GET_REPOSITORIES = gql`
    query Query($orderDirection: OrderDirection, $orderBy:      AllRepositoriesOrderBy, $searchKeyword: String) {
        repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
            edges {
                node {
                    ...RepoItem
                }
            }
        }
    }

    ${ REPO_ITEM }
`;

export const USER = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        ...ReviewItem
                        repository {
                            id
                            fullName
                        }
                    }
                }
            }
        }
    }
    
    ${ REVIEW_ITEM }
`;

export const GET_REPOSITORY = gql`
        query Query($repositoryId: ID!, $first: Int, $after: String) {
            repository(id: $repositoryId) {
                url
                ...RepoItem
                reviews(first: $first, after: $after) {
                    edges {
                        node {
                            ...ReviewItem
                            user {
                                id
                                username
                            }
                        }
                        cursor
                    }
                    pageInfo {
                        endCursor
                        startCursor
                        hasNextPage
                    }
                }
            }
        }

        ${ REPO_ITEM }
        ${ REVIEW_ITEM }
`;