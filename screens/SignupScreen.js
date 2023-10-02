import { useState, useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Warning', 'Пожалуйста, введите адрес электронной почты и пароль');
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Аккаунт создается..."/>
  }
  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;