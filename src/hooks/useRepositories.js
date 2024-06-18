import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useState } from "react";

const useRepositories = () => {
    const [ repositories, setRepository ] = useState();
    const { loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setRepository(data.repositories);
        },
    });

    return { repositories, loading };
};

export default useRepositories;