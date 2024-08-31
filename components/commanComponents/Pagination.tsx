import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = () => {
  // Initialize state with the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle page changes
  const changePage = (direction:any) => {
    // Increase or decrease the page number based on direction
    if (direction === 'next') {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => changePage('prev')}>
        <Text style={styles.arrow}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.pageText}>{`Page ${currentPage}`}</Text>

      <TouchableOpacity onPress={() => changePage('next')}>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  arrow: {
    fontSize: 18,
    color: '#B0B0B0',
    paddingHorizontal: 10,
  },
  pageText: {
    fontSize: 16,
    color: '#283093',
    fontWeight: '600',
    marginHorizontal: 5,
  },
});

export default Pagination;
