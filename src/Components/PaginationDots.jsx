import { View, StyleSheet } from 'react-native';

const PaginationDots = ({ total, current }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            current === index && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};

export default PaginationDots;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DADADA',
  },
  activeDot: {
    width: 16,
  },
});
