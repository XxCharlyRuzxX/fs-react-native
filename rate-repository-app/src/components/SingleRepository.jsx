import {
  FlatList,
  View,
  StyleSheet,
} from 'react-native';

import {useRepository} from '../hooks/useRepositories';
import { useParams } from 'react-router-native';
import { RepositoryItem } from '../RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    marginBottom: 5
  }
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const RepositoryHeader = ({ repository }) => (
  <View style={styles.container}>
  <RepositoryItem
    item={repository}
    showGitHubButton
    />
  </View>
);

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return null;
  }

  if (error || !repository) {
    return null;
  }

  const reviews = repository.reviews.edges.map(
    (edge) => edge.node
  );

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<RepositoryHeader repository={repository} />}
    />
  );
};

export default SingleRepository;