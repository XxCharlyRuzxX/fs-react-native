import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useState } from 'react';
import { RepositoryItem } from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import {useRepositories} from "./hooks/useRepositories";
import RepositoryListSort from "./components/RepositoryListSort"
import RepositoryListSearch from "./components/RepositoryListSearch"
import { useDebounce } from 'use-debounce';


const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
  container: {
    margin: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  orderBy,
  orderDirection,
  onSortChange,
  searchKeyword,
  onSearchChange,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
  <View>
    <RepositoryListSearch
      searchKeyword={searchKeyword}
      onSearchChange={onSearchChange}
    />

    <RepositoryListSort
      orderBy={orderBy}
      orderDirection={orderDirection}
      onSortChange={onSortChange}
    />
  </View>
}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories(
    orderBy,
    orderDirection,
    debouncedSearchKeyword
  );

  const onSortChange = (value) => {
    switch (value) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;

      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;

      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
    }
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      orderDirection={orderDirection}
      onSortChange={onSortChange}
      searchKeyword={searchKeyword}
      onSearchChange={setSearchKeyword}
    />
  );
};

export default RepositoryList;