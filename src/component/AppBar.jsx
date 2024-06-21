import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import Text from './Text';
import { useApolloClient, useQuery } from '@apollo/client';
import { USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 100,
    backgroundColor: '#24292e',
    opacity: 0.9,
    flexDirection: 'row',
    padding: 10,
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  const signOut = async () => {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      navigate('/')
  };


  const authToShow = () => {
    if (data?.me) {
      return (
          <>
              <Link to='/create-review' style={{ marginLeft: 10 }}>
                <Text style={{ lineHeight: 100, color: '#fff' }}  fontWeight='bold'> Create a review </Text>
              </Link>
              <Link to='/user-reviews' style={{ marginLeft: 10 }}>
                <Text style={{ lineHeight: 100, color: '#fff' }}  fontWeight='bold'> My reviews </Text>
              </Link>
              <Pressable onPress={signOut} style={{ marginLeft: 10 }}>
                  <Text style={{ lineHeight: 100, color: '#fff' }} fontWeight='bold'> Sign out </Text>
              </Pressable>
          </>
      );
    }

    return (
      <>
        <Link to='/sign-in' style={{ marginLeft: 10 }}>
            <Text style={{ lineHeight: 100, color: '#fff' }} fontWeight='bold'> Sign in </Text>
        </Link>
        <Link to='/sign-up' style={{ marginLeft: 10 }}>
            <Text style={{ lineHeight: 100, color: '#fff' }} fontWeight='bold'> Sign up </Text>
        </Link>
      </>
    );
  };
  return(
    <View style={styles.container}>
        <ScrollView horizontal>
            <Link to='/'>
                <Text style={{ lineHeight: 100, color: '#fff' }}  fontWeight='bold'> Repositories </Text>
            </Link>
            { authToShow() }       
        </ScrollView>
    </View>
  );
};

export default AppBar;