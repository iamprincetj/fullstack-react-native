import { useContext, useReducer } from "react";
import SearchedContext from "../context/SearchedContext";

const SearchedReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VALUE':
            return action.payload;
        default:
            return state;
    }
};

export const useSearchedValue = () => {
    const searchedValue = useContext(SearchedContext);
    return searchedValue[0];
};

export const useSearchedDispatch = () => {
    const searchedDispatch = useContext(SearchedContext);
    return searchedDispatch[1];
};

const SearchedProvider = ({ children }) => {
    const [searchedValue, setSearchedValue] = useReducer(SearchedReducer, '');

    return (
        <SearchedContext.Provider value={[searchedValue, setSearchedValue]}>
            {children}
        </SearchedContext.Provider>
    );
};

export default SearchedProvider;