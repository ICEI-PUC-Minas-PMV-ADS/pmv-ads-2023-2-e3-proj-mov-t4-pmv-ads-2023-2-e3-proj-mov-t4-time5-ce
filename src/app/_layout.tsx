import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Box, NativeBaseProvider, extendTheme } from 'native-base';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

const Layout: React.FC = function () {
  return (
    <NativeBaseProvider>
      <Box paddingTop={'40px'} position='relative' height='100%'>
        <Slot />
      </Box>
    </NativeBaseProvider>
  );
};

export default Layout;
