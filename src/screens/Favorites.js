import * as React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { globalStyles } from '../../styles/global';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { Appbar, IconButton, Badge, Snackbar } from 'react-native-paper';
import { colors } from '../../styles/global';
import { addToCart, addToFavorites, removeFromFavorites } from '../store/dataSlice';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.data.favorites);
  const navigation = useNavigation();
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
    console.log(`Added to Cart: ${item}`);
    onToggleSnackBar();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0)',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <IconButton
          icon="chevron-left"
          iconColor="black"
          size={24}
          onPress={() => navigation.goBack()}
          mode="contained"
          containerColor="#F8F9FB"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View>
            <Badge
              visible={cartItems.length > 0}
              size={20}
              color="primary"
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                zIndex: 100,
                backgroundColor: colors.secondary,
              }}>
              {cartItems.length}
            </Badge>
            <Appbar.Action icon="shopping-outline" iconColor="#1E222B" size={24} />
          </View>
        </TouchableOpacity>
      </Appbar.Header>
      <Text style={[styles.productContainHead, globalStyles.productContainerHead]}>Favorites</Text>
      <View style={styles.productsContain}>
        <FlatList
          data={favorites}
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
  productsContain: {
    padding: 20,
    flex: 1,
  },
  productContainHead: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default Favorites;
