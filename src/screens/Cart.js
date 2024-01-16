import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar, IconButton, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/global';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../store/dataSlice';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.data.cart.items);

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ itemId, quantity }));
    } else {
      dispatch(removeFromCart(itemId));
    }
  };

  const calculateSubTotal = () => {
    var subtotal = 0;

    // Sum up the prices of all items in the cart
    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    return subtotal;
  };

  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header
          style={{
            backgroundColor: 'rgba(52, 52, 52, 0)',
            // justifyContent: 'space-between',
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
          <Appbar.Content title="Shopping Cart" />
        </Appbar.Header>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartMessage}>No products added to cart</Text>
        ) : (
          cartItems.map(item => (
            <View>
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={styles.counterContainer}>
                  <IconButton
                    icon="minus"
                    iconColor="black"
                    size={16}
                    onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    mode="contained"
                    containerColor="#F8F9FB"
                  />
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <IconButton
                    icon="plus"
                    iconColor="black"
                    size={16}
                    onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    mode="contained"
                    containerColor="#F8F9FB"
                  />
                </View>
              </View>
              <Divider />
            </View>
          ))
        )}
      </View>
      {cartItems.length > 0 && (
        <View style={styles.bottomContainer}>
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.labelText}>Subtotal:</Text>
              <Text style={styles.valueText}>${calculateSubTotal()}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.labelText}>Delivery:</Text>
              <Text style={styles.valueText}>$2</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={[styles.labelText, { fontWeight: 'bold' }]}>Total:</Text>
              <Text style={[styles.valueText, { fontWeight: 'bold', color: 'black' }]}>
                ${calculateSubTotal() + 2}
              </Text>
            </View>
          </View>

          {/* Proceed to Checkout Button */}
          <TouchableOpacity style={[styles.checkoutButton, { borderRadius: 20 }]}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 16,
    justifyContent: 'space-between', // Adjusted to place counter on the right side
    alignItems: 'center',
    width: 'auto',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
    color: 'gray',
    marginBottom: 4,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 20,
    marginHorizontal: 8,
    color: '#007BFF', // You can customize the color
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 8,
    fontFamily: 'Manrope-Medium',
  },
  bottomContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotalText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: 'gray',
  },
  totalText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontFamily: 'Manrope-Medium',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartMessage: {
    padding: 20,
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
  },
  valueText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: 'gray',
  },
});

export default Cart;
