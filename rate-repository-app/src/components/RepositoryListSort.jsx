import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  picker: {
    backgroundColor: 'white',
  },
});

const RepositoryListSort = ({ orderBy, orderDirection, onSortChange }) => {
  let selectedValue = 'lowest';

  if (orderBy === 'CREATED_AT') {
    selectedValue = 'latest';
  } else if (orderDirection === 'DESC') {
    selectedValue = 'highest';
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onSortChange}
        style={styles.picker}
      >
        <Picker.Item label="Más recientes" value="latest" />
        <Picker.Item label="Mejor valorados" value="highest" />
        <Picker.Item label="Menor calificación" value="lowest" />
      </Picker>
    </View>
  );
};

export default RepositoryListSort;