import {
  Box,
  Button,
  ScrollView,
  Spinner,
  Text,
  useDisclose,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useProducts from '../../../hooks/use-products';
import ProductModal from '../../../components/ProductModal';
import { useState } from 'react';
import { IProduct } from '../../../types';
import NewProductModal from '../../../components/NewProductModal';
import CreateProductEntriesModal from '../../../components/CreateProductEntriesModal';

export default function Stock() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { products, updateStock } = useProducts();

  return (
    <Box>
      <Text fontSize='24px' fontWeight={'bold'} mb='24px'>
        Estoque
      </Text>

      <Button h='40px' mb='24px' onPress={onOpen}>
        Cadastrar entrada
      </Button>

      <CreateProductEntriesModal
        isOpen={isOpen}
        onClose={onClose}
        submit={updateStock}
        products={products || []}
      />

      <Box
        borderRadius={'5px'}
        borderColor={'#cecece'}
        borderWidth={'1px'}
        borderStyle={'solid'}
      >
        {!products ? (
          <Spinner />
        ) : !products?.length ? (
          <Text p='10px' textAlign={'center'}>
            Nenhum produto cadastrado
          </Text>
        ) : (
          products.map((product, index) => (
            <Box
              py='8px'
              borderBottomColor={'#cecece'}
              borderBottomWidth={'1px'}
              borderBottomStyle={'solid'}
              px='8px'
              key={`${product.id}${index}`}
            >
              <Text mb='4px'>{product.descricao}</Text>
              <Text>Quantidade: {product.estoque}</Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
