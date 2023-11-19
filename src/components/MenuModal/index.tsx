import { VStack, Modal, Text, Link, Button } from 'native-base';
import { IProduct, IProductForm } from '../../types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuModal({ isOpen, onClose }: Props) {
  const handleClick = (path: string): void => {
    onClose();
    router.push(path);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.Body>
          <VStack space={3}>
            <Button
              flex={1}
              variant='ghost'
              onPress={() => handleClick('products')}
            >
              Produtos
            </Button>
            <Button
              flex={1}
              variant='ghost'
              onPress={() => handleClick('users')}
            >
              Usuários
            </Button>
            <Button
              flex={1}
              variant='ghost'
              onPress={() => handleClick('stock')}
            >
              Estoque
            </Button>
            <Button
              flex={1}
              variant='ghost'
              onPress={() => handleClick('sales')}
            >
              Vendas
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
