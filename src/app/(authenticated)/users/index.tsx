import { Box, Button, HStack, Spinner, Text, useDisclose } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useProducts from '../../../hooks/use-products';
import ProductModal from '../../../components/ProductModal';
import { useState } from 'react';
import { IProduct, IUser } from '../../../types';
import NewProductModal from '../../../components/NewProductModal';
import useUsers from '../../../hooks/use-users';
import CreateOrUpdateUserModal from '../../../components/CreateOrUpdateUserModal';

export default function Products() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const {
    isOpen: createIsOpen,
    onOpen: createOnOpen,
    onClose: createOnClose,
  } = useDisclose();

  const { users, createUser, updateUser, removeUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState<IUser>();

  const [removing, setRemoving] = useState<number>();
  const handleRemove = async (id: number): Promise<void> => {
    setRemoving(id);
    await removeUser(id.toString());
    setRemoving(undefined);
  };

  return (
    <Box>
      <Text fontSize='24px' fontWeight={'bold'} mb='24px'>
        Usuários
      </Text>

      <Button h='40px' mb='24px' onPress={createOnOpen}>
        Cadastrar usuário
      </Button>

      <Box
        borderRadius={'5px'}
        borderColor={'#cecece'}
        borderWidth={'1px'}
        borderStyle={'solid'}
      >
        {!users ? (
          <Spinner />
        ) : !users?.length ? (
          <Text p='10px' textAlign={'center'}>
            Nenhum usuário cadastrado
          </Text>
        ) : (
          users.map((user) => (
            <Box
              py='8px'
              borderBottomColor={'#cecece'}
              borderBottomWidth={'1px'}
              borderBottomStyle={'solid'}
              px='8px'
              key={user.id}
            >
              <Text>{user.nome}</Text>

              <HStack space={2}>
                <Button
                  colorScheme={'red'}
                  isLoading={removing === user.id}
                  onPress={() => handleRemove(user.id)}
                  mt='8px'
                >
                  Remover
                </Button>
                <Button
                  mt='8px'
                  onPress={() => {
                    setSelectedUser(user);
                    onOpen();
                  }}
                  flex={1}
                >
                  Editar
                </Button>
              </HStack>
            </Box>
          ))
        )}
      </Box>

      {selectedUser && (
        <CreateOrUpdateUserModal
          isEdit
          isOpen={isOpen}
          onClose={onClose}
          submit={(form) => updateUser(selectedUser.id.toString(), form)}
          user={selectedUser}
        />
      )}
      <CreateOrUpdateUserModal
        isOpen={createIsOpen}
        onClose={createOnClose}
        submit={createUser}
      />
    </Box>
  );
}
