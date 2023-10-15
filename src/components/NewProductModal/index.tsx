import { VStack, Modal, Button, HStack, Text, Box, Input } from 'native-base';
import { useState } from 'react';
import { IProductForm } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  save: (form: IProductForm) => Promise<boolean>;
}

export default function NewProductModal({ isOpen, onClose, save }: Props) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [estoque, setEstoque] = useState('');

  const [submiting, setSubmiting] = useState(false);

  const handleSave = async (): Promise<void> => {
    setSubmiting(true);
    const success = await save({
      descricao,
      valor: parseFloat(valor),
      estoque: parseInt(estoque),
    });

    if (success) {
      setDescricao('');
      setEstoque('');
      setValor('');
      onClose();
    }
    setSubmiting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.CloseButton />
        <Modal.Header>Cadastrar Produto</Modal.Header>
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
                h='40px'
                value={valor}
                onChangeText={(val) => setValor(val)}
              />
            </Box>
            <Box>
              <Text mb='8px'>Estoque inicial</Text>
              <Input
                h='40px'
                value={estoque}
                onChangeText={(val) => setEstoque(val)}
              />
            </Box>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button isLoading={submiting} flex='1' onPress={handleSave}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
