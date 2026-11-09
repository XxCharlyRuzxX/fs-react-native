import Text from "./Text";
import { StyleSheet, View, Pressable } from "react-native";
import theme from "../theme";
import useSignOut from "../hooks/useSignOut";
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



const SignOut = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleSubmit = async () => {
    try {
      await signOut();
      console.log("Sesión cerrada correctamente");
      navigate("/");
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign-out</Text>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: "white" }}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default SignOut;
