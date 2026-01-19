import { View, TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, secureTextEntry = false }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    height: 48,
    fontSize: 14,
  },
});
