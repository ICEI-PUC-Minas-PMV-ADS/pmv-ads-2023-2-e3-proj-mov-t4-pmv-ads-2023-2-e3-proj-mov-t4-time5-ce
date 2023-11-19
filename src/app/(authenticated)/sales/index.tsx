import {
  Box,
  Button,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import useProducts from '../../../hooks/use-products';
import useSales from '../../../hooks/use-sales';
import NewSaleModal from '../../../components/NewSaleModal';
import moment from 'moment';
import { useState } from 'react';

export default function Products() {
  const { sales, createSale } = useSales();
  const { products } = useProducts();

  const { isOpen, onOpen, onClose } = useDisclose();

  const [cut, setCut] = useState(99999999);

  return (
    <Box>
      <Text fontSize='24px' fontWeight={'bold'} mb='24px'>
        Vendas
      </Text>

      <Button h='40px' mb='24px' onPress={onOpen}>
        Cadastrar venda
      </Button>
      <NewSaleModal isOpen={isOpen} onClose={onClose} save={createSale} />

      {/* <Text mb='8px'>Período</Text>

      <Select
        selectedValue={cut.toString()}
        onValueChange={(val) => setCut(parseInt(val, 10))}
        mb='16px'
      >
        <Select.Item label='Todo período' value={'99999999'} />
        <Select.Item label='7 dias' value={'7'} />
        <Select.Item label='30 dias' value={'30'} />
        <Select.Item label='60 dias' value={'60'} />
      </Select> */}

      <Box
        borderRadius={'5px'}
        borderColor={'#cecece'}
        borderWidth={'1px'}
        borderStyle={'solid'}
      >
        {!sales ? (
          <Spinner />
        ) : !sales?.length ? (
          <Text p='10px' textAlign={'center'}>
            Nenhuma venda cadastrado
          </Text>
        ) : (
          sales?.slice(-1 * cut).map((sale) =>
            sale.produtos.map((product, index) => (
              <Stack
                py='8px'
                borderBottomColor={'#cecece'}
                borderBottomWidth={'1px'}
                borderBottomStyle={'solid'}
                px='8px'
                key={`${product.produtoId}-${sale.id}-${index}`}
                space='4px'
              >
                <Text>Data: {moment(sale.dataVenda).format('DD/MM/YYYY')}</Text>
                <Text>Vendedor: {sale.vendedor.nome}</Text>
                <Text>
                  Produto:{' '}
                  {products?.find((p) => p.id === product.produtoId)?.descricao}
                </Text>
                <Text>
                  Valor: R${product.produtoValor.toFixed(2).replace('.', ',')}
                </Text>
                <Text>Quantidade: {product.quantidade}</Text>
              </Stack>
            ))
          )
        )}
      </Box>
    </Box>
  );
}
