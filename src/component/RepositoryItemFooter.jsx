import { StyleSheet, View } from "react-native";
import Text from "./Text";

const RepositoryItemFooter = ({ item }) => {
    const numberPrecision = (value) => {
        if (value >= 1000) {
            const number = value / 1000;
            if (number.toString().includes('.0')) {
                return Math.floor(number);
            }
            return number.toFixed(1);
        }
        return value;
    };
    return (
        <View style={styles.repositoryFooter}>
            <View style={styles.footerItems}>
                <Text fontWeight='bold'>{numberPrecision(item.stargazersCount)}k</Text>
                <Text>Stars</Text>
            </View>

            <View style={styles.footerItems}>
                <Text fontWeight='bold'>{numberPrecision(item.forksCount)}k</Text>
                <Text>Forks</Text>
            </View>

            <View style={styles.footerItems}>
                <Text fontWeight='bold'>{item.reviewCount} </Text>
                <Text>Reviews</Text>
            </View>

            <View style={styles.footerItems}>
                <Text fontWeight='bold'>{item.ratingAverage} </Text>
                <Text>Rating</Text>
            </View>
    </View>
    );
};

const styles = StyleSheet.create({
    repositoryFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    footerItems: {
        alignItems: 'center',
    },
});


export default RepositoryItemFooter;