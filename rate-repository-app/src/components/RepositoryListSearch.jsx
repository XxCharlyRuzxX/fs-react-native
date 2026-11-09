import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
});

const RepositoryListSearch = ({ searchKeyword, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar repositorios..."
        value={searchKeyword}
        onChangeText={onSearchChange}
        autoCapitalize="none"
      />
    </View>
  );
};

export default RepositoryListSearch;