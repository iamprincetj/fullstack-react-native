import { gql } from "@apollo/client";

export const REPO_ITEM = gql`
    fragment RepoItem on Repository {
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
`;

export const REVIEW_ITEM = gql`
    fragment ReviewItem on Review {
        id
        text
        rating
        createdAt
    }
`;