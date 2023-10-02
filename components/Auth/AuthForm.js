import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import MyButton from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;

      case 'password':
        setEnteredPassword(enteredValue);
        break;

      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;

      case 'gender':
        setSelectedGender(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      gender: selectedGender,
    });
  }

  return (
    <View style={styles.form}>
      <View style={styles.formBox}>
        <Input
          label="Адрес электронной почты"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          placeholder="Введите вашу почту"
          icon="mail-open-outline"
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Пароль"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          placeholder="Введите ваш пароль"
          icon="key-outline"
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Подтверждение пароля"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            placeholder="Введите ваш пароль"
            icon="key-outline"
            isInvalid={passwordsDontMatch}
          />
        )}
        {!isLogin && (
          <View>
          <Text style={styles.genderLabel}>Выберите свой пол:</Text>
          <View style={styles.genderButtonsContainer}>
            <TouchableOpacity
              onPress={updateInputValueHandler.bind(this, 'gender', 'male')}
              style={[
                styles.genderButton,
                selectedGender === 'male' && styles.selectedGenderButton,
              ]}
            >
              <Text style={[
                selectedGender === 'male'
                  ? styles.smallText
                  : styles.largeText,
              ]}>Мужчина</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={updateInputValueHandler.bind(this, 'gender', 'female')}
              style={[
                styles.genderButton,
                selectedGender === 'female' && styles.selectedGenderButton,
              ]}
            >
              <Text style={[
                selectedGender === 'female'
                  ? styles.smallText
                  : styles.largeText,
              ]}>Женщина</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.buttons}>
        <MyButton onPress={submitHandler}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </MyButton>
      </View>
    </View>
  </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    // borderColor: 'green',
    // borderWidth: 3,
  },
  formBox: {
    // borderColor: 'red',
    // borderWidth: 2,
  },
  buttons: {
    alignItems: 'center',
    marginVertical: 12,
  },
  genderLabel: {
    fontSize: 16,
    marginBottom: 8,

    // borderColor: 'red',
    // borderWidth: 2,
  },
  genderButton: {
    marginTop: 5,
    borderRadius: 10,
    paddingVertical: 12,
    // marginHorizontal: 100,
    backgroundColor: 'lightgray',

    // borderColor: 'red',
    // borderWidth: 2,
  },
  selectedGenderButton: {
    marginHorizontal: 100,
    backgroundColor: 'green',
  },
  smallText: {
    textAlign: 'center',
    color: 'white'
  },
  largeText: {
    textAlign: 'center',
    color: 'black'
  },
  genderButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Sağa hizalama
    // marginRight: 100, // Buttonlar arasındaki boşluk
  },
});