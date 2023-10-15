import { VStack, Modal, Button, HStack, Text, Box, Input } from 'native-base';
import { useEffect, useState } from 'react';
import { IProduct, IProductForm } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  save: (id: string, form: IProductForm) => Promise<boolean>;
  product: IProduct | undefined;
  remove: (id: string) => Promise<boolean>;
}

export default function ProductModal({
  isOpen,
  product,
  onClose,
  save,
  remove,
}: Props) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    if (product) {
      setDescricao(product.descricao);
      setValor(product.valor.toString());
    }
  }, [product]);

  const [submiting, setSubmiting] = useState(false);

  const handleSave = async (): Promise<void> => {
    setSubmiting(true);
    const success = await save(product?.id as string, {
      descricao,
      valor: parseFloat(valor),
    });

    if (success) {
      setDescricao('');
      setValor('');
      onClose();
    }
    setSubmiting(false);
  };

  const [removing, setRemoving] = useState(false);
  const handleDelete = async (): Promise<void> => {
    if (product) {
      setRemoving(true);
      const success = await remove(product.id.toString());

      if (success) {
        onClose();
      }
      setRemoving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.CloseButton />
        <Modal.Header>Editar Produto</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <Box>
              <Text mb='8px'>Descrição</Text>
              <Input
                value={descricao}
                onChangeText={(val) => setDescricao(val)}
                h='40px'
              />
            </Box>
            <Box>
              <Text mb='8px'>Valor</Text>
              <Input
                value={valor}
                onChangeText={(val) => setValor(val)}
                h='40px'
              />
            </Box>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <VStack w='100%'>
            <Button
              w='100%'
              mb='8px'
              colorScheme={'red'}
              onPress={handleDelete}
              isLoading={removing}
            >
              Deletar produto
            </Button>
            <Button w='100%' onPress={handleSave} isLoading={submiting}>
              Salvar alterações
            </Button>
          </VStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
