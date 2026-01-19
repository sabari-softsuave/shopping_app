import { View, Text, Image, StyleSheet } from 'react-native';

export default function CategoryItem({ item }) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius:32,
    borderColor: 'black',
  },
  text: {
    marginTop: 6,
    fontSize: 16,
  },
});
