import { FlatList, View, StyleSheet, Alert, Button } from "react-native";
import { useNavigate } from "react-router-native";
import useMe from "../hooks/useMe";
import useDeleteReview from "../hooks/useDeleteReview";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  container: {
    display: "flex",
    margin: 10,
    padding: 10,
    backgroundColor: "white",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me, loading, error, refetch } = useMe(true);
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const onDelete = (review) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview(review.id);
              await refetch();
            } catch (error) {
              Alert.alert("Error", "Could not delete the review.", error);
            }
          },
        },
      ],
    );
  };

  if (loading || error || !me) {
    return null;
  }

  const reviews = me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <ReviewItem review={item} />

          <View style={styles.actions}>
            <Button
              title="View repository"
              onPress={() => navigate(`/repositories/${item.repository.id}`)}
            />

            <Button
              title="Delete review"
              color="red"
              onPress={() => onDelete(item)}
            />
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
