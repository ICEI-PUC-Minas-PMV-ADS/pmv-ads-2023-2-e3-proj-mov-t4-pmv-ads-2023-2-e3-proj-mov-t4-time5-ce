import { Link, router } from 'expo-router';
import { Box, Button, Input, Text } from 'native-base';
import useLogin from '../hooks/use-login';
import { useState } from 'react';

export default function Login() {
  const { login } = useLogin();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [submiting, setSubmiting] = useState(false);
  const handleLogin = async (): Promise<void> => {
    setSubmiting(true);
    const success = await login(user, password);

    if (!success) {
      setSubmiting(false);
      return;
    }

    router.push('/products');
  };

  return (
    <Box
      paddingRight={'20px'}
      paddingLeft={'20px'}
      justifyContent={'center'}
      alignItems={'center'}
      flex={1}
    >
      <Text fontSize='24px' mb='16px' fontWeight='bold'>
        Faça login
      </Text>
      <Box mb='16px'>
        <Text mb='8px'>Usuário</Text>
        <Input
          value={user}
          onChangeText={(val) => setUser(val)}
          autoCapitalize={'none'}
          width='100%'
          h='40px'
        />
      </Box>
      <Box>
        <Text mb='8px'>Senha</Text>
        <Input
          value={password}
          onChangeText={(val) => setPassword(val)}
          type='password'
          width='100%'
          h='40px'
        />
      </Box>

      <Button
        h='40px'
        width='100%'
        mt='24px'
        isDisabled={!user || !password}
        isLoading={submiting}
        onPress={handleLogin}
      >
        Entrar
      </Button>
    </Box>
  );
}
