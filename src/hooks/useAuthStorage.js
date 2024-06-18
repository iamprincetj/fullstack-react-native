import { useContext } from "react";
import AuthStorageContext from "../context/AsyncStorageContext";

const useAuthStorage = () => {
    return useContext(AuthStorageContext);
};

export default useAuthStorage;