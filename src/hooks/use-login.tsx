import { api } from './use-fetch';
import { useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUseLogin {
  login: (user: string, password: string) => Promise<boolean>;
}

const useLogin = (id?: string): IUseLogin => {
  const toast = useToast();

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await api.post(
        `/auth?username=${username}&password=${password}`
      );
      await AsyncStorage.setItem('token', data.token);

      return true;
    } catch (error: any) {
      toast.show({
        title: 'Usuário ou senha incorreto',
      });
      return false;
    }
  };

  return {
    login,
  };
};

export default useLogin;
