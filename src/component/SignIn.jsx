import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const SignIn = () => {
    const [ signIn ] = useSignIn();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signIn({ username, password });
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };
  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export const SignInContainer = ({ onSubmit }) => {
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required'),
    });

    const initialValues = {
        username: '',
        password: '',
    };
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

            <Pressable style={inputStyles.buttonField} onPress={formik.handleSubmit}>
                <Text fontWeight='bold' style={inputStyles.buttonText}> Sign in </Text>
            </Pressable>
            
        </View>
    );
};

export const inputStyles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    inputFieldContainer: {
        marginBottom: 15,
    },
    inputField: {
        width: theme.width.fullWidth,
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        margin: 'auto',
        borderRadius: 5,
        opacity: 0.7,
    },
    buttonField: {
        backgroundColor: theme.colors.primary,
        width: theme.width.fullWidth,
        height: 60,
        borderRadius: 3,
        marginBottom: 10,
        lineHeight: 48,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: theme.fontWeights.bold,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20
    },
});


export default SignIn;