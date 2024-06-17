import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

const SignIn = () => {
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
    const onSubmit = (values) => {
        console.log(values);
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
  return (
    <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <View style={styles.inputFieldContainer}>
            <TextInput
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                style={[styles.inputField, { borderColor: formik.touched.username && formik.errors.username && theme.colors.error }]}
            />
            { formik.touched.username && formik.errors.username && (
                <Text style={{ color: '#d73a4a' }}> { formik.errors.username } </Text>
            ) }
        </View>
        <View style={styles.inputFieldContainer}>
            <TextInput
                placeholder='Password'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry
                style={[styles.inputField, { borderColor: formik.touched.password && formik.errors.password && theme.colors.error }]}
            />
                { formik.touched.password && formik.errors.password && (
                <Text style={{ color: theme.colors.error }}> { formik.errors.password } </Text>
            ) }
        </View>

        <Pressable style={styles.buttonField} onPress={formik.handleSubmit}>
            <Text fontWeight='bold' style={{ color: '#fff' }}> Sign in </Text>
        </Pressable>
        
    </View>
  );
};

const styles = StyleSheet.create({
    inputFieldContainer: {
        marginBottom: 10,
    },
    inputField: {
        width: theme.width.fullWidth,
        height: '3rem',
        border: '1px solid black',
        padding: '10px',
        margin: 'auto',
        borderRadius: 5,
    },
    buttonField: {
        backgroundColor: theme.colors.primary,
        width: theme.width.fullWidth,
        height: '3rem',
        borderRadius: 5,
        marginBottom: 10,
        lineHeight: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default SignIn;