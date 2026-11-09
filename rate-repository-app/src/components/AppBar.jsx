import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { AppBarTab } from "./AppBarTab";
import useMe from "../hooks/useMe";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    height: 80,
    backgroundColor: "#222222",
  },
});

const AppBar = () => {
  const { me, loading } = useMe();

  if (loading) {
    return null;
  }

  if (me) {
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <AppBarTab text="Repositories" to={"/"} />
          <AppBarTab text="SignOut" to={"/signout"} />
          <AppBarTab text="Create a review" to={"/createreview"} />
          <AppBarTab text="My reviews" to={"myreviews"} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" to={"/"} />
        <AppBarTab text="SignIn" to={"/signin"} />
        <AppBarTab text="SignUp" to={"/signup"} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
