import { Pressable, TextInput, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from 'yup';
import { inputStyles } from "./SignIn";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";

const SignUpContainer = ({ onSubmit }) => {
    const initialValues = {
        username: '',
        password: '',
        passwordConfirm: '',
    };
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(5, 'Username must be a least 5 characters!')
            .max(30, 'Username can exceed 30 characters!')
            .required('Username is required!'),
        password: yup
            .string()
            .min(5, 'Password must be a least 5 characters!')
            .max(50, 'Password can exceed 50 characters!')
            .required('Password is required!'),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('Password confirmation is required!'),
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    return (
        <View style={inputStyles.container}>
            <View style={inputStyles.inputFieldContainer}>
                <TextInput
                    placeholder='Username'
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                    style={[inputStyles.inputField, { borderColor: formik.touched.username && formik.errors.username && theme.colors.error }]}
                />
                { formik.touched.username && formik.errors.username && (
                    <Text style={{ color: '#d73a4a' }}> { formik.errors.username } </Text>
                ) }
            </View>
            <View style={inputStyles.inputFieldContainer}>
                <TextInput
                    placeholder='Password'
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    secureTextEntry
                    style={[inputStyles.inputField, { borderColor: formik.touched.password && formik.errors.password && theme.colors.error }]}
                />
                    { formik.touched.password && formik.errors.password && (
                    <Text style={{ color: theme.colors.error }}> { formik.errors.password } </Text>
                ) }
            </View>

            <View style={inputStyles.inputFieldContainer}>
                <TextInput
                    placeholder='Password confirmation'
                    value={formik.values.passwordConfirm}
                    onChangeText={formik.handleChange('passwordConfirm')}
                    secureTextEntry
                    style={[inputStyles.inputField, { borderColor: formik.touched.passwordConfirm && formik.errors.passwordConfirm && theme.colors.error }]}
                />
                    { formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                    <Text style={{ color: theme.colors.error }}> { formik.errors.passwordConfirm } </Text>
                ) }
            </View>

            <Pressable style={inputStyles.buttonField} onPress={formik.handleSubmit}>
                <Text fontWeight='bold' style={inputStyles.buttonText}> Sign up </Text>
            </Pressable>
            
        </View>
    );
};

const SignUp = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();
    const [ mutate ] = useMutation(SIGN_UP, {
        onError: (error) => {
            console.log(JSON.parse(JSON.stringify(error)));
        },
    });


    const onSubmit = async ({ username, password }) => {
        const { data } = await mutate({ variables: { user: { username, password } } });
        if (data) {
            await signIn({ username, password });
            navigate('/');
        }
    };
    return <SignUpContainer onSubmit={onSubmit}/>;
};

export default SignUp;