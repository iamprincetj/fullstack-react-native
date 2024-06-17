import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../theme";

const RepositoryItemHeader = ({ item }) => {
    return (
        <View style={styles.repositoryHeader}>
            <Image style={{ width: 50, height: 50 }} source={item.ownerAvatarUrl}/>
            <View style={{ marginLeft: 10, flex: 1, flexWrap: 'wrap' }}>
                <Text style={{ fontWeight: theme.fontWeights.bold }}> {item.fullName} </Text>
                <Text> {item.description} </Text>
                <Text style={styles.lang}> {item.language} </Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    repositoryHeader: {
        flexDirection: 'row',
    },
    lang: {
        width: '5rem',
        backgroundColor: theme.colors.primary,
        color: '#fff',
        padding: 5,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default RepositoryItemHeader;