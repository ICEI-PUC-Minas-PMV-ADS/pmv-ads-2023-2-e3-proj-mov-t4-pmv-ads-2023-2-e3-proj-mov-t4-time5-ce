import { VStack, Modal, Button, HStack, Text, Box, Input } from 'native-base';
import { useEffect, useState } from 'react';
import { IProductForm, IUser, IUserForm } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submit: (form: IUserForm) => Promise<boolean>;
  isEdit?: boolean;
  user?: IUser | undefined;
}

export default function CreateOrUpdateUserModal({
  isOpen,
  onClose,
  submit,
  isEdit,
  user,
}: Props) {
  const [name, setName] = useState(user?.nome);

  useEffect(() => {
    if (user) {
      setName(user?.nome);
    }
  }, [user]);

  const [submiting, setSubmiting] = useState(false);
  const handleSubmit = async (): Promise<void> => {
    setSubmiting(true);
    if (name) {
      const success = await submit({ nome: name });
      if (success) {
        onClose();
      }
    }
    setSubmiting(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <Modal.Content maxWidth='350'>
        <Modal.CloseButton />
        <Modal.Header>
          {isEdit ? 'Editar usuário' : 'Cadastrar usuário'}
        </Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <Box>
              <Text mb='8px'>Nome</Text>
              <Input
                value={name}
                onChangeText={(val) => setName(val)}
                h='40px'
              />
            </Box>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button flex={1} onPress={onClose} mr={2} colorScheme={'gray'}>
            Cancelar
          </Button>
          <Button
            isDisabled={!name}
            onPress={handleSubmit}
            isLoading={submiting}
            flex={1}
          >
            {isEdit ? 'Salvar' : 'Cadastrar'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
