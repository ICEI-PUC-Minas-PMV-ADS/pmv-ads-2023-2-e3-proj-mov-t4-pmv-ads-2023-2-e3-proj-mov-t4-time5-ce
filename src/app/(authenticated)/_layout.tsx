import { Link, Slot } from 'expo-router';
import { Box, NativeBaseProvider, Text, extendTheme } from 'native-base';

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
      </Box>
      <Box paddingRight={'20px'} paddingLeft={'20px'}>
        <Slot />
      </Box>
    </Box>
  );
};

export default Layout;
