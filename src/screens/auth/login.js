import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../app/reducers/auth';
import { ROUTES } from '../../utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isError, errorMessage, data } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      Alert.alert('Login failed', errorMessage || 'Please check your credentials.');
    }
  }, [isError, errorMessage]);

  useEffect(() => {
    if (data) {
      navigation.reset({ index: 0, routes: [{ name: ROUTES.HOME }] });
    }
  }, [data, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Carpe Diem</Text>
        <Text style={styles.subtitle}>Coffee Shop</Text>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a0856c"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputFlex}
            placeholder="Password"
            placeholderTextColor="#a0856c"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(userLogin({ email, password }))}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Not registered yet? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6b3f2a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0856c',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b3f2a',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d4b8a8',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#3d2314',
    marginBottom: 15,
    backgroundColor: '#fdf8f5',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d4b8a8',
    borderRadius: 8,
    backgroundColor: '#fdf8f5',
    marginBottom: 15,
    paddingRight: 10,
  },
  inputFlex: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: '#3d2314',
  },
  eyeIcon: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#7c5c47',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#888',
    fontSize: 13,
  },
  registerLink: {
    color: '#7c5c47',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default Login;