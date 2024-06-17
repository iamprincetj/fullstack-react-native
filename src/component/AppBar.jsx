import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: '5rem',
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return(
    <View style={styles.container}>
        <ScrollView horizontal>
            <Link to='/'>
                <Text style={{ lineHeight: '6rem', color: '#fff' }}  fontWeight='bold'> Repositories </Text>
            </Link>
            <Link to='/sign-in' style={{ marginLeft: 10 }}>
              <Text style={{ lineHeight: '6rem', color: '#fff' }} fontWeight='bold'> Sign in </Text>
            </Link>
        </ScrollView>
    </View>
  );
};

export default AppBar;