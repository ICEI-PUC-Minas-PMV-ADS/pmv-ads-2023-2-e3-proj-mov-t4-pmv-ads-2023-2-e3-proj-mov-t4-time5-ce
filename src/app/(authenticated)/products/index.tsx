import { Box, Button, HStack, Spinner, Text, useDisclose } from 'native-base';
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

  const [removing, setRemoving] = useState<number>();
  const handleRemove = async (id: number): Promise<void> => {
    setRemoving(id);
    await removeProduct(id.toString());
    setRemoving(undefined);
  };

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
            <Box
              py='8px'
              borderBottomColor={'#cecece'}
              borderBottomWidth={'1px'}
              borderBottomStyle={'solid'}
              px='8px'
            >
              <Text>{product.descricao}</Text>
              <HStack mt='8px' space={2} justifyContent={'space-between'}>
                <Button
                  colorScheme={'red'}
                  isLoading={removing === product.id}
                  onPress={() => handleRemove(product.id as number)}
                  // mt='8px'
                >
                  Remover
                </Button>
                <Button onPress={() => setActiveProduct(product)} flex={1}>
                  Editar
                </Button>
              </HStack>
            </Box>
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
