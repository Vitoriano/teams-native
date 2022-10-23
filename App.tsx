
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { StyleSheet, Text, View } from 'react-native';

import theme from './src/theme';

import Groups from '@screens/Groups';

import { Loading } from '@components/Loading';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';


export default function App() {

  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    // <SafeAreaView style={[styles.container]}>
      <ThemeProvider theme={theme}>
        
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      
        { fontsLoaded ? <Players />: <Loading />}
      </ThemeProvider>
    // </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202024"
  }
});
