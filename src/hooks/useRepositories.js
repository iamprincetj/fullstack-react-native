import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useSearchedValue } from "../reducer/SearchedReducer";

const useRepositories = (selectedView) => {
    const [variables, setVariable] = useState();
    const searchedValue = useSearchedValue();

    useEffect(() => {
        switch(selectedView) {
            case 'Lowest rated repositories':
                setVariable({ orderBy: 'RATING_AVERAGE',  orderDirection: 'ASC'});
                break;
            case 'Highest rated repositories':
                setVariable({ orderBy: 'RATING_AVERAGE',  orderDirection: 'DESC'});
                break;
            default:
                setVariable(null);
        }
    }, [selectedView]);
    const [ repositories, setRepository ] = useState();
    const { loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { ...variables, searchKeyword: searchedValue },
        onCompleted: (data) => {
            setRepository(data.repositories);
        },
    });

    return { repositories, loading };
};

export default useRepositories;