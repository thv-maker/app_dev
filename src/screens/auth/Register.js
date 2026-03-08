import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { userRegister } from '../../app/reducers/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <CustomTextInput
          label={'Email'}
          placeholder={'Email'}
          value={email}
          onChangeText={val => setEmail(val)}
          containerStyle={{ width: '100%', marginBottom: 15 }}
          labelStyle={{ fontSize: 20, fontWeight: '500' }}
          textStyle={{ fontSize: 20 }}
        />
        <CustomTextInput
          label={'Password'}
          placeholder={'Password'}
          value={password}
          onChangeText={val => setPassword(val)}
          containerStyle={{ width: '100%' }}
          labelStyle={{ fontSize: 20, fontWeight: '500' }}
          textStyle={{ fontSize: 20 }}
        />
      </View>

      <CustomButton
        label={'REGISTER'}
        containerStyle={{
          marginVertical: 20,
          width: '80%',
          backgroundColor: 'blue',
          borderRadius: 10,
        }}
        textStyle={{
          color: '#ffffff',
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 20,
        }}
        loading={isLoading}
        onPress={() => {
          dispatch(userRegister({ email, password }));
        }}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        >
          <Text style={{ color: 'red', fontWeight: '800' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;