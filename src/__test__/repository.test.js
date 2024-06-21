import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { RepositoryListContainer } from "../component/RepositoryList";
import { numberPrecision } from "./helperFunction";
import { SignInContainer } from "../component/SignIn";
import { NativeRouter } from "react-router-native";

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
            totalCount: 8,
            pageInfo: {
                hasNextPage: true,
                endCursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            edges: [
                {
                node: {
                    id: 'jaredpalmer.formik',
                    fullName: 'jaredpalmer/formik',
                    description: 'Build forms in React, without the tears',
                    language: 'TypeScript',
                    forksCount: 1619,
                    stargazersCount: 21856,
                    ratingAverage: 88,
                    reviewCount: 3,
                    ownerAvatarUrl:
                    'https://avatars2.githubusercontent.com/u/4060187?v=4',
                },
                cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                {
                node: {
                    id: 'async-library.react-async',
                    fullName: 'async-library/react-async',
                    description: 'Flexible promise-based React data loader',
                    language: 'JavaScript',
                    forksCount: 69,
                    stargazersCount: 1760,
                    ratingAverage: 72,
                    reviewCount: 3,
                    ownerAvatarUrl:
                    'https://avatars1.githubusercontent.com/u/54310907?v=4',
                },
                cursor:
                    'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                },
            ],
            };
    
            render(
                <NativeRouter>
                    <RepositoryListContainer repositories={repositories}/>
                </NativeRouter>
            );
            const repositoryItems = screen.getAllByTestId('repositoryItem');
            const [ firstRepositoryItem, secondRepositoryItem ] = repositoryItems;

            const repositoriesItems = repositories.edges.map(edge => edge.node);

            // eslint-disable-next-line no-unused-vars
            const repositoriesItemsToTest = repositoriesItems.map(({ id, ownerAvatarUrl, ...rest }) => rest);
            const [ firstItemTotest, secondItemTotest ] = repositoriesItemsToTest;
            const repositoriesKey = Object.keys(repositoriesItemsToTest[0]);

            for (let i = 0; i < repositoriesKey.length; i++) {
                const item = repositoriesKey[i];
                if (item === 'stargazersCount' || item === 'forksCount') {
                    continue;
                }

                // tests for other values except forksCount and stargazersCount. This is because, they ae rendered different
                expect(firstRepositoryItem).toHaveTextContent(firstItemTotest[item]);
                expect(secondRepositoryItem).toHaveTextContent(secondItemTotest[item]);
            }

            // tests for forksCount and stargazersCount with a helper function

            expect(firstRepositoryItem).toHaveTextContent(numberPrecision(firstItemTotest.stargazersCount));
            expect(firstRepositoryItem).toHaveTextContent(numberPrecision(firstItemTotest.forksCount));
            
            expect(secondRepositoryItem).toHaveTextContent(numberPrecision(secondItemTotest.stargazersCount));
            expect(secondRepositoryItem).toHaveTextContent(numberPrecision(secondItemTotest.forksCount));
        });
    });
});


describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        // render the SignInContainer component, fill the text inputs and press the submit button
        const onSubmit = jest.fn();
        render(<SignInContainer onSubmit={onSubmit} />);

        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');


        fireEvent.changeText(username, "kalle");
        fireEvent.changeText(password, "password");
        fireEvent.press(screen.getByText('Sign in'));

  
        await waitFor(() => {
          // expect the onSubmit function to have been called once and with a correct first argument
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit.mock.calls[0][0]).toEqual(
            { username: 'kalle', password: 'password' }
          );
        });
      });
    });
  });