import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
    margin: 10,
    backgroundColor: 'white',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must contain at least 5 characters')
    .max(30, 'Username cannot exceed 30 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must contain at least 5 characters')
    .max(50, 'Password cannot exceed 50 characters'),

  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createUser({
          username: values.username,
          password: values.password,
        });

        await signIn({
          username: values.username,
          password: values.password,
        });

        formik.resetForm();
        navigate('/');
      } catch (error) {
        console.log('Error registering user:', error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text fontSize="subheading">Sign up</Text>

      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        autoCapitalize="none"
      />
      {formik.touched.username && !!(formik.errors.username) && (
        <Text color="error">{formik.errors.username}</Text>
      )}

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && !!(formik.errors.password) && (
        <Text color="error">{formik.errors.password}</Text>
      )}

      <Text>Password confirmation</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation &&
        !!(formik.errors.passwordConfirmation) && (
          <Text color="error">
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text color="white">Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;