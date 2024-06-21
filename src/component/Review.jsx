import { useQuery } from "@apollo/client";
import { ReviewItem } from "./Repository";
import Text from "./Text";
import { USER } from "../graphql/queries";
import { FlatList } from "react-native";
import { ItemSeparator } from "./ItemSeparator";

const Review = () => {
    const { data, loading, refetch } = useQuery(USER, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true },
    });
    if (loading) {
        return <Text> Loading... </Text>;
    }

    if (!data.me.reviews) {
        return null;
    }

    const review = data.me.reviews.edges?.map(edge => edge.node);
    
    if (review.length > 1) {
        return <FlatList
            ItemSeparatorComponent={ItemSeparator}
            data={review}
            scrollEnabled
            renderItem={({item}) => <ReviewItem review={item} refetch={refetch}/>}
        />;
    }

    return (
        <Text> No reviews yet </Text>
    );
};

export default Review;