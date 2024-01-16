import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Searchbar, Appbar, Badge, Snackbar } from 'react-native-paper';
import { colors, globalStyles } from '../../styles/global';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAsync, addToCart, addToFavorites, removeFromFavorites } from '../store/dataSlice';
import { TouchableOpacity } from 'react-native';

const Home = props => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.data);
  const favorites = useSelector(state => state.data.favorites);
  const cartItems = useSelector(state => state.data.cart.items);
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const handleFavoriteClick = item => {
    // Check if the item is already in favorites
    const isInFavorites = favorites.some(favoriteItem => favoriteItem.title === item.title);

    if (isInFavorites) {
      // If in favorites, remove it
      const itemToRemove = favorites.find(favoriteItem => favoriteItem.title === item.title);
      dispatch(removeFromFavorites(itemToRemove.id));
    } else {
      // If not in favorites, add it
      dispatch(addToFavorites(item));
      console.log('added to favorites');
    }
  };
  const handleAddToCart = item => {
    dispatch(addToCart(item));
    onToggleSnackBar();
  };

  // const filteredProducts = data.products.filter(item =>
  //   item.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  React.useEffect(() => {
    // Dispatch the fetchDataAsync thunk on component mount
    dispatch(fetchDataAsync());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header
          style={{ backgroundColor: 'rgba(52, 52, 52, 0)', justifyContent: 'space-between' }}>
          <Text style={globalStyles.homeGreetingText}>Hey, Rahul</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View>
              <Badge
                visible={cartItems.length > 0}
                size={20}
                color="primary"
                selectionColor={colors.primary}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  zIndex: 100,
                  backgroundColor: colors.secondary,
                }}>
                {cartItems.length}
              </Badge>
              <Appbar.Action icon="shopping-outline" iconColor="#fff" size={24} />
            </View>
          </TouchableOpacity>
        </Appbar.Header>

        <Searchbar
          placeholder="Search Products or Store"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <Text style={[styles.productContainHead, globalStyles.productContainerHead]}>
        Recommmended
      </Text>
      <View style={styles.productsContain}>
        <FlatList
          data={data.products}
          renderItem={({ item }) => {
            return (
              <ProductCard
                price={item.price}
                productName={item.title}
                imageURL={item.thumbnail}
                navigation={navigation}
                handleAddToCart={() => handleAddToCart(item)}
                handleFavoriteClick={() => handleFavoriteClick(item)}
                onPress={() => {
                  navigation.navigate('ProductDetails', { data: item });
                }}
              />
            );
          }}
          keyExtractor={item => item.id}
          numColumns={2}
          // contentContainerStyle={styles.container}
        />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            // Perform any action on undo press if needed
            setVisible(false);
          },
        }}>
        Added To Cart
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: '25%',
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 0,
  },
  productsContain: {
    padding: 20,
    flex: 1,
  },
  productContainHead: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

// const mapStateToProps = state => {
//   return {
//     items: state.items,
//   };
// };

// export default connect(mapStateToProps)(Home);
export default Home;
