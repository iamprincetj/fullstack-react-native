import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import theme from '../theme';
import Repository from './Repository';
import SingleRepository from './Repository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import Review from './Review';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
    width: theme.width.fullWidth,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Routes>
            <Route path='/' element={<RepositoryList/>} />
            <Route path='sign-in' element={<SignIn />}/>
            <Route path='/repository/:repositoryId' element={<SingleRepository />}/>
            <Route path='/create-review' element={<CreateReview />}/>
            <Route path='/sign-up' element={<SignUp />}/>
            <Route path='/user-reviews' element={<Review />}/>
        </Routes>
    </View>
  );
};

export default Main;