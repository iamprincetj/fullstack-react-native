import { useContext, useReducer } from "react";
import RepoViewContext from "../context/SelectedRepoViewContext";

const RepoViewReducer = (state, action) => {
    switch (action.type) {
        case 'SELECTEDVIEW':
            return action.payload;
        default:
            return state;
    }
};

export const useRepoViewValue = () => {
    const repoView = useContext(RepoViewContext);
    return repoView[0];
};

export const useRepoViewDispatch = () => {
    const repoView = useContext(RepoViewContext);
    return repoView[1];
};

const RepoViewProvider = ({ children }) => {
    const [selectedView, selectedViewDispatch] = useReducer(RepoViewReducer, '');

    return (
        <RepoViewContext.Provider value={[selectedView, selectedViewDispatch]}>
            {children}
        </RepoViewContext.Provider>
    );
};

export default RepoViewProvider;