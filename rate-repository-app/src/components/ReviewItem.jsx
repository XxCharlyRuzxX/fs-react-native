import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    gap: 12,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    color: '#0366d6',
  },
  content: {
    flex: 1,
    gap: 5,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} fontWeight="bold">
          {review.rating}
        </Text>
      </View>

      <View style={styles.content}>
        <Text fontWeight="bold">
          {review.user.username}
        </Text>

        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'dd MMM yyyy')}
        </Text>

        <Text>
          {review.text}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;