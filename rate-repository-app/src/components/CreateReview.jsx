import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createReview({
          ...values,
          rating: Number(values.rating),
        });

        const repositoryId =
          response.data.createReview.repositoryId;

        formik.resetForm();

        navigate(`/repositories/${repositoryId}`);
      } catch (error) {
        console.log('Error creating review:', error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text fontSize="subheading">Create a review</Text>

      <Text>Owner name</Text>
      <TextInput
        style={styles.input}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && !!(formik.errors.ownerName) && (
        <Text color="error">{formik.errors.ownerName}</Text>
      )}

      <Text>Repository name</Text>
      <TextInput
        style={styles.input}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && !!(formik.errors.repositoryName) && (
        <Text color="error">{formik.errors.repositoryName}</Text>
      )}

      <Text>Rating (0-100)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
      />
      {formik.touched.rating && !!(formik.errors.rating) && (
        <Text color="error">{formik.errors.rating}</Text>
      )}

      <Text>Review</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
      />

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={{ color: "white" }}>Create review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;