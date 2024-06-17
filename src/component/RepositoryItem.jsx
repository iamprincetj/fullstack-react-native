import { View, StyleSheet } from "react-native";
import RepositoryItemHeader from "./RepositoryItemHeader";
import RepositoryItemFooter from "./RepositoryItemFooter";

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.repositoryContainer}>
            <RepositoryItemHeader item={item} />
            <RepositoryItemFooter item={item}/>
        </View>
    );
};

const styles = StyleSheet.create({
    repositoryContainer: {
        backgroundColor: 'white',
        marginBottom: 5,
        padding: 5,
    },
});

export default RepositoryItem;