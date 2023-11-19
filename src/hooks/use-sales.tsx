import useFetch from '../hooks/use-fetch';
import { ISale, ISaleItem, IUseFetch } from '../types';
import { useToast } from 'native-base';
import moment from 'moment';
import useApi from './use-api';

interface IUseSales {
  sales: ISaleItem[] | undefined;
  createSale: (sales: ISale[]) => Promise<boolean>;
  removeSale: (id: string) => Promise<boolean>;
  filter: (startDate: string, endDate: string) => Promise<void>;
}

interface IFetch extends IUseFetch {
  data: ISaleItem[] | undefined;
}

const useSales = (): IUseSales => {
  const { data: sales, mutate }: IFetch = useFetch('/venda', true);
  const toast = useToast();

  const { api } = useApi();

  const createSale = async (newSales: ISale[]): Promise<boolean> => {
    try {
      await api('post', '/venda', {
        dataVenda: moment().toISOString(),
        formaPagamento: 1,
        vendedorId: newSales?.[0].user.id,
        produtos: newSales.map((sale) => ({
          produtoId: sale.product.id,
          quantidade: 1,
        })),
      });
      await mutate();
      toast.show({
        title: 'Venda cadastrada com sucesso',
      });
      return true;
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Algo de errado aconteceu',
      });
      return false;
    }
  };

  const removeSale = async (id: string): Promise<boolean> => {
    try {
      await api('delete', `/venda/${id}`);
      await mutate();
      toast.show({
        title: 'Venda removida com sucesso',
      });
      return true;
    } catch (error) {
      toast.show({
        title: 'Algo de errado aconteceu',
      });
      return false;
    }
  };

  const filter = async (startDate: string, endDate: string): Promise<void> => {
    try {
      const { data } = await api(
        'get',
        `/venda?startDate=${startDate}&endDate=${endDate}`
      );
      mutate(data, false);
    } catch (error) {
      // toast({
      //   status: 'error',
      //   title: 'Algo de errado aconteceu',
      // });
      mutate([], false);
    }
  };

  return {
    sales: sales?.sort((a, b) => {
      const dataA = new Date(a.dataVenda);
      const dataB = new Date(b.dataVenda);
      return dataA.getTime() - dataB.getTime();
    }),
    createSale,
    removeSale,
    filter,
  };
};

export default useSales;
