import { gql } from "@apollo/client";

export const SIGN_IN = gql`
    mutation Authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation createReview($review: CreateReviewInput) {
        createReview(review: $review) {
            repositoryId
        }
    }
`;

export const SIGN_UP = gql`
    mutation signUp($user: CreateUserInput) {
        createUser(user: $user) {
            username
        }
    }

`;


export const DELETE_REVIEW = gql`
    mutation DeleteReview($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`;