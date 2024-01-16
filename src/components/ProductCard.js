import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { colors, globalStyles } from '../../styles/global';
import { useSelector } from 'react-redux';

const ProductCard = ({
  price,
  productName,
  imageURL,
  onPress,
  handleAddToCart,
  handleFavoriteClick,
}) => {
  // Retrieve favorites from the Redux state
  const favorites = useSelector(state => state.data.favorites);

  return (
    // Product Card Container
    <Card style={styles.productCard} elevation={0}>
      <TouchableOpacity onPress={onPress}>
        <Card.Cover style={styles.productImage} source={{ uri: imageURL }} resizeMode="cover" />
      </TouchableOpacity>
      <IconButton
        icon={favorites.some(item => item.title === productName) ? 'heart' : 'heart-outline'}
        iconColor={favorites.some(item => item.title === productName) ? '#FF8181' : '#F8F9FB'}
        style={styles.favoriteIcon}
        size={22}
        onPress={() => handleFavoriteClick()}
      />
      <Card.Content style={styles.productDescriptionContain}>
        <View style={styles.textContain}>
          <Text style={globalStyles.productPrice}>{price}$</Text>
          <Text style={globalStyles.productTitle}>{productName}</Text>
        </View>
        <IconButton
          icon="plus-circle"
          iconColor={colors.primary}
          size={30}
          onPress={() => handleAddToCart()}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: '45%',
    backgroundColor: '#F8F9FB',
    margin: 8,
    position: 'relative',
  },
  productImage: {
    height: 140,
  },
  productDescriptionContain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContain: {
    width: '65%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
});

export default ProductCard;
