import Text from "./Text";
import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from 'react-router-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
    margin: 10,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    alignItems: "center",
    borderRadius: 5,
  },
});

const validationSchema = yup.object().shape({
  userName: yup.string().required("UserName is required"),
  password: yup.string().required("Password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <Text>Sign-in</Text>
      <Text>UserName</Text>
      <View>
        <TextInput
          testID="username"
          style={styles.input}
          onChangeText={formik.handleChange("userName")}
          onBlur={formik.handleBlur("userName")}
          value={formik.values.userName}
        />
        {Boolean(formik.touched.userName && formik.errors.userName) && (
          <Text style={{ color: "red" }}>{formik.errors.userName}</Text>
        )}
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          testID="password"
          style={styles.input}
          secureTextEntry
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          value={formik.values.password}
        />
        {Boolean(formik.touched.password && formik.errors.password) && (
          <Text style={{ color: "#d73a4a" }}>{formik.errors.password}</Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "white" }}>Submit</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await signIn({
        username: values.userName,
        password: values.password,
      });
      console.log("Token guardado correctamente");
      resetForm();
      navigate("/");
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  return <SignInContainer onSubmit={handleSubmit} />;
};

export default SignIn;
