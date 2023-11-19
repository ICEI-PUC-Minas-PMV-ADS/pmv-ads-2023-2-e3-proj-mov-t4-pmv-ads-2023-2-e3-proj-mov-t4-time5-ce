import useFetch from './use-fetch';
import { IUser, IUserForm, IUseFetch } from '../types';
import { useToast } from 'native-base';
import useApi from './use-api';

interface IUseUser {
  user: IUser | undefined;
  updateUser: (form: IUserForm, productId?: string) => Promise<boolean>;
  removeUser: (id: string) => Promise<boolean>;
}

interface IFetch extends IUseFetch {
  data: IUser | undefined;
}

const useUser = (id?: string): IUseUser => {
  const { data: user, mutate }: IFetch = useFetch(
    id ? `/vendedor/${id}` : null
  );
  const toast = useToast();
  const { api } = useApi();

  const updateUser = async (
    form: IUserForm,
    productId?: string
  ): Promise<boolean> => {
    try {
      await api('patch', `/vendedor/${productId || id}?nome=${form.nome}`);
      await mutate();
      toast.show({
        title: 'Vendedor editado com sucesso',
      });
      return true;
    } catch (error) {
      toast.show({
        title: 'Algo de errado aconteceu',
      });
      return false;
    }
  };

  const removeUser = async (): Promise<boolean> => {
    try {
      await api('delete', `/vendedor/${id}`);
      await mutate();
      toast.show({
        title: 'Vendedor removido com sucesso',
      });
      return true;
    } catch (error) {
      toast.show({
        title: 'Algo de errado aconteceu',
      });
      return false;
    }
  };

  return {
    user,
    updateUser,
    removeUser,
  };
};

export default useUser;
