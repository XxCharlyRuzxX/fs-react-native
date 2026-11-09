import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import Text from "./components/Text";
import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: 5,
    padding: 10,
    backgroundColor: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  language: {
    marginBottom: 5,
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
};

export const RepositoryItem = ({ item, showGitHubButton = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {item.fullName}
        </Text>
        <Text color="textSecondary">{item.description}</Text>
        <Text color="primary" style={styles.language}>
          {item.language}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{item.reviewCount}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{item.ratingAverage}</Text>
            <Text color="textSecondary">Rating</Text>
          </View>
          {showGitHubButton && (
            <View style={styles.statItem}>
            <Pressable onPress={() => Linking.openURL(item.url)}>
              <Text color="primary">Open in GitHub</Text>
            </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
