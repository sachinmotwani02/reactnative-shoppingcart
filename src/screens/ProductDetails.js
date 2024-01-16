import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Appbar, IconButton, Icon, Chip, Badge } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import ButtonMedium from '../components/ButtonMedium';
import { colors } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, addToFavorites, removeFromFavorites } from '../store/dataSlice';

const ProductDetails = () => {
  const route = useRoute();
  const receivedData = route.params?.data || 'No data received';
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.data.favorites);
  const cartItems = useSelector(state => state.data.cart.items);

  // Handle click on the favorite icon
  const handleFavoriteClick = item => {
    // Check if the item is already in favorites
    const isInFavorites = favorites.some(favoriteItem => favoriteItem.title === receivedData.title);

    if (isInFavorites) {
      // If in favorites, remove it
      const itemToRemove = favorites.find(
        favoriteItem => favoriteItem.title === receivedData.title
      );
      dispatch(removeFromFavorites(itemToRemove.id));
    } else {
      // If not in favorites, add it
      dispatch(addToFavorites(receivedData));
      console.log('added to favorites');
    }
  };

  // Handle click on the "Add to Cart" button
  const handleAddToCart = item => {
    dispatch(addToCart(item));
    console.log(`Added to Cart: ${item}`);
  };

  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Appbar/Header Section */}
      <Appbar.Header
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0)',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* Back Button */}
        <IconButton
          icon="chevron-left"
          iconColor="black"
          size={24}
          onPress={() => navigation.goBack()}
          mode="contained"
          containerColor="#F8F9FB"
        />
        {/* Shopping Cart Button */}
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
            <Appbar.Action icon="shopping-outline" iconColor="#1E222B" size={24} />
          </View>
        </TouchableOpacity>
      </Appbar.Header>

      {/* Product Information Section */}
      <View style={styles.productContain}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.productTitle}>{receivedData.title}</Text>
          <IconButton
            icon={
              favorites.some(item => item.title === receivedData.title) ? 'heart' : 'heart-outline'
            }
            iconColor={
              favorites.some(item => item.title === receivedData.title) ? '#FF8181' : '#fff'
            }
            style={styles.favoriteIcon}
            size={30}
            mode={'contained'}
            containerColor="#E7ECF0"
            onPress={() => handleFavoriteClick()}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon source="star" color={'gold'} size={20} />
          <Text style={styles.rating}>{receivedData.rating}</Text>
        </View>
      </View>

      <View>
        <Carousel
          loop
          width={width}
          height={width / 2}
          // autoPlay={true}
          data={receivedData.images}
          scrollAnimationDuration={2000}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                zIndex: 0,
              }}>
              <Image
                style={styles.productImage}
                source={{
                  uri: item,
                }}
              />
            </View>
          )}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
        <Text style={styles.priceText}>{receivedData.price}$</Text>
        <View style={styles.discountTag}>
          <Text style={styles.discountTagText}>{receivedData.discountPercentage}% OFF</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ButtonMedium
            type="outlined"
            onPress={() => handleAddToCart(receivedData)}
            label="Add To Cart"
          />
          <ButtonMedium type="contained" onPress={() => {}} label="Buy Now" />
        </View>
        <Text style={styles.description}>{receivedData.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 5,
  },
  productTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
    fontSize: 44,
    // padding: 20,
  },
  productContain: {
    padding: 20,
  },
  rating: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: 600,
    fontSize: 14,
    color: '#1E222B',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex: 0,
  },
  priceText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    color: colors.primary,
  },
  discountTag: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 10,
    marginLeft: 6,
  },
  discountTagText: {
    color: 'white',
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
  },
  description: {
    padding: 5,
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#8891A5',
  },
  favoriteIcon: {},
});

export default ProductDetails;
