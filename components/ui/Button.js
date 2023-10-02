import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

function Button({ children, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={styles.button}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.button,
  },
  buttonText: {
    textAlign: "center",
    marginHorizontal: 20,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
