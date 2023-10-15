import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface IUseApi {
  api: (method: 'get' | 'post' | 'delete' | 'patch', url: string, body?: object) => Promise<any>
}

const useApi = (): IUseApi => {

  const api = async (method: 'get' | 'post' | 'delete' | 'patch', url: string, body?: object): Promise<any> => {
    const token = await AsyncStorage.getItem('token');
    const client = axios.create(
      {
        baseURL: 'https://cev-v1.azurewebsites.net/', headers: {
          'Authorization': `Bearer ${token}`
        }
      },

    );
    return await client[method](url, body);
  }

  return {
    api
  };
};

export default useApi;
