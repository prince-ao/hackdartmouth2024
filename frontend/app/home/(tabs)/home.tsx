import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FlatList } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const columnWidth = windowWidth / 3;

const generateData = (page: number) => {
  // Generate 20 items for each page
  return Array.from({ length: 20 }, (_, i) => ({
    id: `item-${page}-${i}`,
    text: `Item ${page}-${i}`,
  }));
};

export default function Screen() {
  const [data, setData] = useState(generateData(0));
  const [page, setPage] = useState(1);

  const renderItem = ({ item }: { item: { id: string, text: string } }) => (
    <View style={styles.item}>
      <Text>{item.text}</Text>
    </View>
  );

  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: windowWidth,
    
  },
  item: {
    width: columnWidth - 20, // Subtract padding
    padding: 10,
    margin: 5,
    backgroundColor: '#ccc',
  },
});