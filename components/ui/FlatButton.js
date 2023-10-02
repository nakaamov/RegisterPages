import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

function FlatButton({ children, onPress }) {
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

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,

    // borderColor: 'red',
    // borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
  },
});