import {
  VStack,
  Modal,
  Button,
  HStack,
  Text,
  Box,
  Input,
  Select,
} from 'native-base';
import { useEffect, useState } from 'react';
import { IProduct, IProductForm, ISale } from '../../types';
import useProducts from '../../hooks/use-products';
import useUsers from '../../hooks/use-users';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  save: (sales: ISale[]) => Promise<boolean>;
}

export default function NewSaleModal({ isOpen, onClose, save }: Props) {
  const { products } = useProducts();
  const { users } = useUsers();

  const [sales, setSales] = useState<ISale[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [selectedUser, setSelectedUser] = useState<string>();

  const remove = (index: number): void => {
    setSales((old) => old.filter((sale, i) => i !== index));
  };

  const add = (): void => {
    if (!selectedProduct) return;
    const user = users?.find((u) => u.id.toString() === selectedUser);
    if (!user) return;

    setSales((old) => [...old, { product: selectedProduct, user }]);
  };

  useEffect(() => {
    setSelectedProduct(undefined);
    setSales([]);
  }, [isOpen]);

  const [submiting, setSubmiting] = useState(false);
  const handleSubmit = async (): Promise<void> => {
    setSubmiting(true);
    const success = await save(sales);
    if (success) {
      setSales([]);
      setSelectedProduct(undefined);
      setSelectedUser(undefined);
    }
    setSubmiting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.CloseButton />
        <Modal.Header>Cadastrar Venda</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <Box mb='24px'>
              <Text mb='8px'>Vendedor</Text>
              <Select
                defaultValue={selectedUser}
                onValueChange={(val) => setSelectedUser(val)}
                isDisabled={!!sales.length}
                h='40px'
              >
                <Select.Item label='Selecione' value='' />
                {users?.map((user) => (
                  <Select.Item label={user.nome} value={user.id.toString()} />
                ))}
              </Select>
            </Box>
            <Box>
              <Text mb='8px'>Produto</Text>
              <Select
                defaultValue={selectedProduct?.id as string}
                onValueChange={(val) =>
                  setSelectedProduct(
                    products?.find((p) => p.id.toString() === val)
                  )
                }
                h='40px'
              >
                <Select.Item label='Selecione' value='' />
                {products?.map((product) => (
                  <Select.Item
                    label={`${product.descricao} - R$${product.valor
                      .toFixed(2)
                      .replace('.', ',')}`}
                    value={product.id.toString()}
                  />
                ))}
              </Select>
            </Box>
            <Button
              colorScheme='blue'
              onPress={add}
              isDisabled={!selectedProduct || !selectedUser}
              w='100%'
              mb='32px'
            >
              Adicionar
            </Button>
          </VStack>

          <VStack space={2}>
            {sales.map((sale, index) => (
              <Box p='8px' borderRadius='8px' bg='gray.100'>
                <Text>Produto: {sale.product.descricao}</Text>
                <Text>
                  Valor: R${sale.product.valor.toFixed(2).replace('.', ',')}
                </Text>
                <Text>Vendedor: {sale.user.nome}</Text>

                <Button
                  colorScheme={'red'}
                  flex='1'
                  onPress={() => remove(index)}
                  mt='8px'
                >
                  Remover
                </Button>
              </Box>
            ))}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button isLoading={submiting} flex='1' onPress={handleSubmit}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
