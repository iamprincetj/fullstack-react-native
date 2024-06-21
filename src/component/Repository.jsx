import { useNavigate, useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import { useMutation, useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { ItemSeparator } from "./ItemSeparator";
import theme from "../theme";
import { format } from 'date-fns';
import { DELETE_REVIEW } from "../graphql/mutations";

const RepositoryInfo = ({ repository }) => {
    return (
        <View>
            <RepositoryItem item={repository} showRepoButton={true}/>
        </View>
    );
};
  
export const ReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate();
    const [mutate] = useMutation(DELETE_REVIEW);

    const onDelete = async (deleteReviewId) => {
        try {
            Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
                {
                    text: 'Cancel'
                },
                {
                    text: 'DELETE',
                    onPress: async () => {
                        await mutate({ variables: { deleteReviewId } });
                        refetch();
                    },
                }
            ],
            { cancelable: true }
            );
        } catch (e) {
            console.log(JSON.parse(JSON.stringify(e)));
        }
    };

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View style={ReviewStyles.reviewContainer}>
                <View style={ReviewStyles.ratingContainer}>
                    <Text style={ReviewStyles.rating} fontWeight='bold'> { review.rating } </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: theme.fontWeights.bold }}> {review.user? review.user.username : review.repository.fullName} </Text>
                    <Text style={{ marginBottom: 5 }}> { format(review.createdAt, "dd.MM.yyyy") } </Text>
                    <Text> {review.text} </Text>
                </View>
            </View>

            { !review.user && (
                <View style={ReviewStyles.buttonContainer}>
                    <Pressable onPress={() => navigate(`/repository/${review.repository.id}`)} style={[ReviewStyles.button, { backgroundColor: theme.colors.primary }]}>
                        <Text fontWeight='bold' style={ReviewStyles.buttonText}>
                            View repository
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => onDelete(review.id)} style={[ReviewStyles.button, { backgroundColor: theme.colors.error }]}>
                        <Text fontWeight='bold' style={ReviewStyles.buttonText}>Delete review
                        </Text>
                    </Pressable>
                </View>
            ) }

        </View>
    );
};

export const ReviewStyles = StyleSheet.create({
    reviewContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 2,
    },
    ratingContainer: {
        width: 50,
    },
    rating: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        width: 40,
        height: 40,
        borderRadius: 20,
        textAlign: 'center',
        lineHeight: 35,
        color: theme.colors.primary,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10,
    },

    button: {
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        color: '#fff',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
    },

});

const SingleRepository = () => {
    const { repositoryId } = useParams();
    const variables = { repositoryId, first: 5 };
    const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: 'cache-and-network',
    });
    if (loading) {
        return <Text> Loading </Text>;
    }

    const onEndReached = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                ...variables,
                after: data.repository.reviews.pageInfo.endCursor, 
            }
        });
    };
    const repository = data.repository;
    const reviews = data.repository.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        />
    );
};
  
export default SingleRepository;