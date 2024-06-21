import { FlatList, StyleSheet, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { ItemSeparator } from './ItemSeparator';
import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useState } from 'react';
import RepoViewContext from '../context/SelectedRepoViewContext';
import { useRepoViewValue } from '../reducer/SelectedRepoViewReducer';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import { useSearchedDispatch } from '../reducer/SearchedReducer';
import Text from './Text';


export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];



  const renderItem = ({ item }) => <RepositoryItem item={item}/>;

  const noRepo = () => (<View style={{border: '1px solid red'}}><Text> No Repository Found! </Text></View>);


  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      scrollEnabled
      renderItem={repositoryNodes.length < 1 ? noRepo : renderItem}
      ListHeaderComponent={RepoSelection}
    />
  );
};

const RepositoryList = () => {
  const selectedView = useRepoViewValue();
  const { repositories } = useRepositories(selectedView);
  return <RepositoryListContainer repositories={repositories}/>;
};

const RepoSelection = () => {
  const [selectedView, selectedViewDispatch] = useContext(RepoViewContext);
  return (
    <>
      <SearchRepo />
      <Picker
          selectedValue={selectedView}
          onValueChange={(itemValue, itemIndex) => {
            selectedViewDispatch({ type:  'SELECTEDVIEW', payload: itemValue});
          }}
          style={{ height: 48, border: 'none', fontSize: 15, padding: 10, backgroundColor: '#e1e4e8', marginBottom: 20 }}
      >
          <Picker.Item label='Select an Item...' value='' enabled={false} style={{ color: 'grey' }} />
          <Picker.Item label='Latest repositories' value='Latest repositories'/>
          <Picker.Item label='Highest rated repositories' value='Highest rated repositories'/>
          <Picker.Item label='Lowest rated repositories' value='Lowest rated repositories'/>
      </Picker>
    </>
  );
};

const SearchRepo = () => {
    const [ searchedValue, setSearchedValue ] = useState('');
    const [value] = useDebounce(searchedValue, 500);
    const dispatch = useSearchedDispatch();

    useEffect(() => {
      dispatch({ type: 'SET_VALUE', payload: value });
    }, [value]);
    return (
      <Searchbar
        style={searchStyle.searchBar}
        placeholder='Search'
        onChangeText={setSearchedValue}
        value={searchedValue}
      />
    );
};

const searchStyle = StyleSheet.create({
    searchBar: {
      width: '95%',
      margin: 'auto',
      borderRadius: 5,
      backgroundColor: '#fff',
      marginBottom: 10,
      marginTop: 20,
      lineHeight: 40
    }
 });

export default RepositoryList;