import React from "react";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const translateY = new Animated.Value(0);

  const keyboardDidShow = () => {
    Animated.timing(translateY, {
      toValue: Platform.OS === "ios" ? -60 : -10, // Adjust these values as needed
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const keyboardDidHide = () => {
    Animated.timing(translateY, {
      toValue: Platform.OS === "ios" ? -60 : -10, // Adjust these values as needed
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!passwordsAreEqual))
    ) {
      Alert.alert(
        "Неверный ввод",
        "Пожалуйста, проверьте введенные учетные данные."
      );
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={styles.container}
      >
        <KeyboardAvoidingView
          showsVerticalScrollIndicator={false}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboard}
        >
          <Animated.View
            style={[
              styles.authContent,
              { transform: [{ translateY: translateY }] },
            ]}
          >
            <View style={styles.centeredContent}>
              {isLogin && (
                <React.Fragment>
                  <View style={styles.imageBox}>
                    <Image
                      source={require("../../assets/icon2.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>Мир Вам! Palomniki</Text>
                    <Text style={styles.subText}>
                      {`Чтобы войти в аккаунт, введите
ваш email и пароль, который вы указали
при регистрации.`}
                    </Text>
                  </View>
                </React.Fragment>
              )}
              <AuthForm
                style={styles.buttons}
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsInvalid={credentialsInvalid}
              />
              <View style={styles.buttons}>
                <FlatButton onPress={switchAuthModeHandler}>
                  {isLogin ? (
                    <Text>
                      У вас нет аккаунта?{" "}
                      <Text style={{ color: Colors.button, fontWeight: "500" }}>
                        Зарегистрироваться
                      </Text>
                    </Text>
                  ) : (
                    <Text style={{ color: Colors.button, fontWeight: "500" }}>
                      У меня есть аккаунт!
                    </Text>
                  )}
                </FlatButton>
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    backgroundColor: "#f5f5f5",

    // borderColor: "blue",
    // borderWidth: 2,
  },
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  keyboard: {
    width: '100%',
    height: '100%',

    // borderColor: "black",
    // borderWidth: 4,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  centeredContent: {
    justifyContent: "center",
    paddingHorizontal: 20,
    height: '100%',

    // borderColor: "red",
    // borderWidth: 4,
  },
  textContainer: {
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "black",
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  buttons: {
    marginTop: 8,
  },
});

export default AuthContent;







// import React from "react";
// import { useState } from "react";
// import {
//   Alert,
//   StyleSheet,
//   View,
//   ScrollView,
//   Text,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   Keyboard,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import FlatButton from "../ui/FlatButton";
// import AuthForm from "./AuthForm";
// import { Colors } from "../../constants/styles";

// function AuthContent({ isLogin, onAuthenticate }) {
//   const navigation = useNavigation();

//   const [credentialsInvalid, setCredentialsInvalid] = useState({
//     email: false,
//     password: false,
//     confirmEmail: false,
//     confirmPassword: false,
//   });

//   const translateY = new Animated.Value(0);

//   const keyboardDidShow = () => {
//     Animated.timing(translateY, {
//       toValue: Platform.OS === "ios" ? -150 : -120,
//       duration: 250,
//       useNativeDriver: false,
//     }).start();
//   };

//   const keyboardDidHide = () => {
//     Animated.timing(translateY, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: false,
//     }).start();
//   };

//   React.useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       "keyboardDidShow",
//       keyboardDidShow
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       "keyboardDidHide",
//       keyboardDidHide
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   function switchAuthModeHandler() {
//     if (isLogin) {
//       navigation.navigate("Signup");
//     } else {
//       navigation.navigate("Login");
//     }
//   }

//   function submitHandler(credentials) {
//     let { email, confirmEmail, password, confirmPassword } = credentials;

//     email = email.trim();
//     password = password.trim();

//     const emailIsValid = email.includes("@");
//     const passwordIsValid = password.length > 6;
//     const emailsAreEqual = email === confirmEmail;
//     const passwordsAreEqual = password === confirmPassword;

//     if (
//       !emailIsValid ||
//       !passwordIsValid ||
//       (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
//     ) {
//       Alert.alert(
//         "Неверный ввод",
//         "Пожалуйста, проверьте введенные учетные данные."
//       );
//       setCredentialsInvalid({
//         email: !emailIsValid,
//         confirmEmail: !emailIsValid || !emailsAreEqual,
//         password: !passwordIsValid,
//         confirmPassword: !passwordIsValid || !passwordsAreEqual,
//       });
//       return;
//     }
//     onAuthenticate({ email, password });
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         scrollEnabled={true}
//         showsVerticalScrollIndicator={false}
//       >
//         <Animated.View
//           style={[
//             styles.authContent,
//             { transform: [{ translateY: translateY }] },
//           ]}
//         >
//           <View style={styles.contentBox}>
//             <AuthForm
//               style={styles.buttons}
//               isLogin={isLogin}
//               onSubmit={submitHandler}
//               credentialsInvalid={credentialsInvalid}
//             />
//             <View style={styles.buttons}>
//               <FlatButton
//                 onPress={switchAuthModeHandler}
//               >
//                 {isLogin ? (
//                   <Text>
//                     У вас нет аккаунта?{" "}
//                     <Text style={{ color: Colors.button }}>Зарегистрироваться</Text>
//                   </Text>
//                 ) : (
//                   <Text style={{ color: Colors.button }}>У меня есть аккаунт!</Text>
//                 )}
//               </FlatButton>
//             </View>
//           </View>
//         </Animated.View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   authContent: {
//     flex: 1,
//     marginBottom: 15,
//   },
//   contentBox: {
//     paddingHorizontal: 25,
//   },
//   buttons: {
//     marginTop: 8,
//   },
// });

// export default AuthContent;