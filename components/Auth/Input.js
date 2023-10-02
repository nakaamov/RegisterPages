import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

export default function Input({
  label,
  icon,
  placeholder,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
      <View style={[styles.inputWrapper, isInvalid && styles.inputInvalid]}>
        <Ionicons name={icon} size={26} color={Colors.button} style={[styles.icon, isInvalid && styles.iconInvalid]} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={!passwordVisible && secure} // Toggle secureTextEntry based on passwordVisible
          onChangeText={onUpdateValue}
          value={value}
        />
        {secure && ( // Show the eye icon only if secure is true
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons
              style={[styles.icon, isInvalid && styles.iconInvalid]}
              name={passwordVisible ? "eye" : "eye-off"}
              size={26}
              color={Colors.button}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.button,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: "black",
    marginBottom: 4,
  },
  labelInvalid: {
    color: "black",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: "#FFBEBE",
    borderColor: "red",
  },
  iconInvalid: {
    color: "#FF6666",
  },
});
