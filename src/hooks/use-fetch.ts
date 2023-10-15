import axios from 'axios';
import useSWR from 'swr';
import useApi from './use-api';

export interface IUseFetch {
  data: any,
  mutate: (data?: any, options?: any) => Promise<void>,
  error: any,
  isValidating: boolean,
}

export const api = axios.create(
  { baseURL: 'https://cev-v1.azurewebsites.net/' },
);

const useFetch = (
  url: string | null,
  disableRevalidation?: boolean,
): IUseFetch => {
  // const handleErrors = useHandleErrors();

  const { api: authApi } = useApi();

  const options = disableRevalidation ? {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  } : {};

  const {
    data, mutate, error, isValidating,
  } = useSWR(url, async (u: string) => {
    const response = await authApi('get', u);

    return response.data;
  }, options);

  if (error) {
    // handleErrors(error.response.data);
  }

  return {
    data, mutate, error, isValidating,
  };
};

export default useFetch;
