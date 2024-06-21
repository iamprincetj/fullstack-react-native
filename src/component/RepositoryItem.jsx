import { View, StyleSheet, Pressable } from "react-native";
import RepositoryItemHeader from "./RepositoryItemHeader";
import RepositoryItemFooter from "./RepositoryItemFooter";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import * as Linking from 'expo-linking';

const RepositoryItem = ({ item, showRepoButton }) => {
    const navigate = useNavigate();
    const onNavigate = (id) => {
        navigate(`/repository/${id}`);
    };

    const onOpenUrl = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error('Unable to open Url', url);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <View style={styles.repositoryContainer} testID="repositoryItem">
            <Pressable onPress={() =>onNavigate(item.id)}>
                <RepositoryItemHeader item={item} />
                <RepositoryItemFooter item={item}/>
            </Pressable>
            { showRepoButton && (
                <Pressable style={{ marginBottom: 10, marginTop: 10 }} onPress={() => onOpenUrl(item.url)}>
                    <Text fontWeight='bold' style={styles.repositoryLink}> Open in GitHub </Text>
                </Pressable>
            ) }
        </View>
    );
};

const styles = StyleSheet.create({
    repositoryContainer: {
        backgroundColor: 'white',
        marginBottom: 5,
        padding: 15,
    },

    repositoryLink: {
        color: '#fff',
        backgroundColor: theme.colors.primary,
        height: 50,
        lineHeight: 50,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: 17,
    },
});

export default RepositoryItem;