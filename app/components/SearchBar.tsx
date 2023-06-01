import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  products: Product[];
  onSearch: (filteredProducts: Product[]) => void;
}
const SearchBar = ({products, onSearch}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowercase().includes(searchQuery.toLowerCase()),
    );
    onSearch(filteredProducts);
  };
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a product..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="Search" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
