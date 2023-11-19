import { Link, Slot } from 'expo-router';
import {
  Box,
  Button,
  NativeBaseProvider,
  ScrollView,
  Text,
  extendTheme,
  useDisclose,
} from 'native-base';
import MenuModal from '../../components/MenuModal';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

const Layout: React.FC = function () {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box position='relative' height='100%'>
      <Box
        paddingRight={'20px'}
        paddingLeft={'20px'}
        flexDir={'row'}
        alignItems={'center'}
        h='50px'
        bg={'#ffffff'}
        mb='24px'
        borderBottomColor={'#cecece'}
        borderBottomWidth={'1px'}
        borderBottomStyle={'solid'}
      >
        <Link href='/' asChild>
          <Text>Sair</Text>
        </Link>

        <Button onPress={onOpen} marginLeft={'auto'}>
          Menu
        </Button>
        <MenuModal isOpen={isOpen} onClose={onClose} />
      </Box>
      <Box paddingRight={'20px'} paddingLeft={'20px'} paddingBottom={'150px'}>
        <ScrollView>
          <Slot />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Layout;
