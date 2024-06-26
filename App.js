import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Main from './src/component/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloclient';
import AuthStorage from './src/utils/authStorage';
import AsyncStorageContext from './src/context/AsyncStorageContext';
import RepoViewProvider from './src/reducer/SelectedRepoViewReducer';
import SearchedProvider from './src/reducer/SearchedReducer';

const authStorage = new AuthStorage();

const client = createApolloClient(authStorage);


export default function App() {
  return (
    <View style={styles.container}>
      <NativeRouter>
          <ApolloProvider client={client}>
              <AsyncStorageContext.Provider value={authStorage}>
                  <RepoViewProvider>
                      <SearchedProvider>
                          <Main />
                      </SearchedProvider>
                  </RepoViewProvider>
              </AsyncStorageContext.Provider>
          </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
