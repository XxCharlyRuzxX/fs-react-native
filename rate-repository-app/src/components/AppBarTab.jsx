import Text from "./Text";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tab: {
    marginRight: 10,
  },
});
export const AppBarTab = ({ text, to }) => {
  return (
    <Link to={to} style={styles.tab}>
      <Text color={"textWhite"} fontWeight={"bold"}>
        {text}
      </Text>
    </Link>
  );
};
