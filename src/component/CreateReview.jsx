import { Pressable, TextInput, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from 'yup';
import { inputStyles } from './SignIn';
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";


const CreateReviewContainer = ({ onSubmit }) => {
    const validationSchema = yup.object().shape({
        repositoryName: yup
            .string()
            .required('Repository Name is required!'),
        ownerName: yup
            .string()
            .required("Repository Owner's name is required!"),
        rating: yup
            .number()
            .min(0, 'Rating must be at least 0!')
            .max(100, 'Rating cannot exceed 100!')
            .required('Rating is required!'),
        text: yup
            .string()
            .optional(),
    });
    const initialValues = {
        repositoryName: '',
        ownerName: '',
        rating: '',
        text: '',
    };
    const formik =useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    return(
        <View style={[inputStyles.container]}>
            <View style={inputStyles.inputFieldContainer}>
                <TextInput
                    placeholder="Repository owner name"
                    value={formik.values.ownerName}
                    onChangeText={formik.handleChange('ownerName')}
                    style={[inputStyles.inputField, { borderColor: formik.touched.ownerName && formik.errors.ownerName && theme.colors.error }]}
                />
                { formik.touched.ownerName && formik.errors.ownerName && (
                    <Text style={{ color: theme.colors.error }}> {formik.errors.ownerName} </Text>
                ) }
            </View>
            <View style={inputStyles.inputFieldContainer}>
                <TextInput
                    placeholder="Repository name"
                    value={formik.values.repositoryName}
                    onChangeText={formik.handleChange('repositoryName')}
                    style={[inputStyles.inputField, { borderColor: formik.touched.repositoryName && formik.errors.repositoryName && theme.colors.error }]}
                />
                { formik.touched.repositoryName && formik.errors.repositoryName && (
                    <Text style={{ color: theme.colors.error }}> {formik.errors.repositoryName} </Text>
                ) }
            </View>
            <View style={inputStyles.inputFieldContainer}>
                <TextInput
                    placeholder="Rating between 0 and 100"
                    value={formik.values.rating}
                    onChangeText={formik.handleChange('rating')}
                    style={[inputStyles.inputField, { borderColor: formik.touched.rating && formik.errors.rating && theme.colors.error }]}
                />
                { formik.touched.rating && formik.errors.rating && (
                    <Text style={{ color: theme.colors.error }}> {formik.errors.rating} </Text>
                ) }
            </View>
            <View style={inputStyles.inputFieldContainer}>
                <TextInput
                    placeholder="Review"
                    value={formik.values.text}
                    onChangeText={formik.handleChange('text')}
                    multiline
                    style={[inputStyles.inputField, { borderColor: formik.touched.text && formik.errors.text && theme.colors.error }]}
                />
            </View>
            <Pressable onPress={formik.handleSubmit} style={inputStyles.buttonField}>
                <Text fontWeight='bold' style={inputStyles.buttonText}> Create a review </Text>
            </Pressable>
        </View>
    );
};

const CreateReview = () => {
    const navigate = useNavigate();
    const [ mutate ] = useMutation(CREATE_REVIEW, {
        onError: (error) => {
            console.log(JSON.parse(JSON.stringify(error)));
        },
    });
    const onSubmit = async (values) => {
        const { data } = await mutate({ variables: {review: {...values, rating: Number(values.rating)}} });
        if (data) {
            const id = data.createReview?.repositoryId;
            navigate(`/repository/${id}`);
        }
    };

    return <CreateReviewContainer onSubmit={onSubmit}/>;

};

export default CreateReview;