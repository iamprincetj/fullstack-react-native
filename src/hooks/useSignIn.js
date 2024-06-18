import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const [ mutate, result ] = useMutation(SIGN_IN);
    const authStorage = useAuthStorage();
    const apolloclient = useApolloClient();    

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { credentials: { username, password } } });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloclient.resetStore();
    };

    return [signIn, result];
};

export default useSignIn;