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
import { IEntry, IProduct, IProductForm } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submit: (id: string, qtd: number) => Promise<boolean>;
  products: IProduct[];
}

export default function CreateProductEntriesModal({
  isOpen,
  onClose,
  submit,
  products,
}: Props) {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [selectedQtd, setSelectedQtd] = useState('');

  const remove = (index: number): void => {
    setEntries((old) => old.filter((sale, i) => i !== index));
  };

  const add = (): void => {
    if (!selectedProduct) return;

    setEntries((old) => [
      ...old,
      {
        id: selectedProduct.id as string,
        name: selectedProduct.descricao,
        qtd: selectedQtd,
      },
    ]);
    setSelectedQtd('');
  };

  useEffect(() => {
    setSelectedProduct(undefined);
    setEntries([]);
  }, [isOpen]);

  const [submiting, setSubmiting] = useState(false);
  const handleSubmit = async (): Promise<void> => {
    if (!selectedProduct) {
      return;
    }

    setSubmiting(true);

    const promises = entries.map((entry) =>
      submit(entry.id, parseInt(entry.qtd, 10))
    );

    await Promise.all(promises);

    setSelectedProduct(undefined);
    setEntries([]);
    setSelectedQtd('');

    onClose();
    setSubmiting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.CloseButton />
        <Modal.Header>Novas entradas</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <Box>
              <Text mb='8px'>Produto</Text>
              <Select
                selectedValue={selectedProduct?.id.toString()}
                onValueChange={(val) =>
                  setSelectedProduct(
                    products.find((p) => p.id.toString() === val.toString())
                  )
                }
                h='40px'
              >
                {products.map((product) => (
                  <Select.Item
                    label={`${product.descricao} - R$${product.valor
                      .toFixed(2)
                      .replace('.', ',')}`}
                    value={product.id.toString()}
                  />
                ))}
              </Select>
            </Box>
            <Box>
              <Text mb='8px'>Quantidade</Text>
              <Input
                h='40px'
                value={selectedQtd}
                onChangeText={(val) => setSelectedQtd(val)}
                type='number'
                keyboardType='numeric'
              />
            </Box>

            <Button
              colorScheme={'info'}
              isDisabled={!selectedProduct && !selectedQtd}
              flex='1'
              onPress={add}
            >
              Adicionar
            </Button>
          </VStack>

          <Box mt='32px'>
            {entries.map((entry, index) => (
              <Box p='8px' borderRadius='8px' bg='gray.100' key={index}>
                <Text mb='4px'>{entry.name}</Text>
                <Text>Quantidade: {entry.qtd}</Text>

                <Button
                  flex={1}
                  colorScheme={'red'}
                  onPress={() => remove(index)}
                  mt='8px'
                >
                  Remover
                </Button>
              </Box>
            ))}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            isDisabled={!entries.length}
            isLoading={submiting}
            flex='1'
            onPress={handleSubmit}
          >
            Cadastrar Entradas
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
