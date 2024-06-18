import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';
import { useApolloClient, useQuery } from '@apollo/client';
import { USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: '5rem',
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (loading) {
    return null;
  }

  const signOut = async () => {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
  };


  const authToShow = () => {
    const { me } = data;
    if (me) {
      return (
          <Pressable onPress={signOut} style={{ marginLeft: 10 }}>
              <Text style={{ lineHeight: '6rem', color: '#fff' }} fontWeight='bold'> Sign out </Text>
          </Pressable>
      );
    }

    return (
        <Link to='/sign-in' style={{ marginLeft: 10 }}>
            <Text style={{ lineHeight: '6rem', color: '#fff' }} fontWeight='bold'> Sign in </Text>
        </Link>
    );
  };
  return(
    <View style={styles.container}>
        <ScrollView horizontal>
            <Link to='/'>
                <Text style={{ lineHeight: '6rem', color: '#fff' }}  fontWeight='bold'> Repositories </Text>
            </Link>
            { authToShow() }
        </ScrollView>
    </View>
  );
};

export default AppBar;