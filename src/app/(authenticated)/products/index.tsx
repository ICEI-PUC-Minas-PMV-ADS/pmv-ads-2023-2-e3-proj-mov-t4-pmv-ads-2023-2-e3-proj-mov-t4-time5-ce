import { Box, Button, Spinner, Text, useDisclose } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useProducts from '../../../hooks/use-products';
import ProductModal from '../../../components/ProductModal';
import { useState } from 'react';
import { IProduct } from '../../../types';
import NewProductModal from '../../../components/NewProductModal';

export default function Products() {
  const { products, createProduct, updateProduct, removeProduct } =
    useProducts();

  const [activeProduct, setActiveProduct] = useState<IProduct>();
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box>
      <Text fontSize='24px' fontWeight={'bold'} mb='24px'>
        Produtos
      </Text>

      <Button h='40px' mb='24px' onPress={onOpen}>
        Cadastrar produto
      </Button>
      <NewProductModal isOpen={isOpen} onClose={onClose} save={createProduct} />

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
          products.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => setActiveProduct(product)}
            >
              <Box
                py='8px'
                borderBottomColor={'#cecece'}
                borderBottomWidth={'1px'}
                borderBottomStyle={'solid'}
                px='8px'
              >
                <Text>{product.descricao}</Text>
              </Box>
            </TouchableOpacity>
          ))
        )}
      </Box>

      <ProductModal
        isOpen={!!activeProduct}
        onClose={() => setActiveProduct(undefined)}
        save={updateProduct}
        product={activeProduct}
        remove={removeProduct}
      />
    </Box>
  );
}
