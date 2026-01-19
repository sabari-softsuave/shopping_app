import { View, Image, StyleSheet } from 'react-native';

const OnboardingImage = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image
        source={source}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default OnboardingImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 40,
  },
  image: {
    width: 300,
    height: 300,
  },
});
