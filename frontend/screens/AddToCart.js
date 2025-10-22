import React, { useState, useEffect } from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AddToCart = ({ route, navigation }) => {
  // Get product from navigation params
  const { product, quantity = 1 } = route.params || {};
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart when component loads
  useEffect(() => {
    if (product) {
      setCartItems([{ ...product, quantity }]);
    }
  }, [product]);

  // Update quantity for a specific item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            const updatedItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedItems);
          }
        }
      ]
    );
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace('PK', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + 5.99;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout.');
      return;
    }

    Alert.alert(
      'Order Confirmed!',
      `Your order for PK{cartItems.length} item(s) has been placed successfully!\n\nTotal: PKPK{calculateTotal().toFixed(2)}`,
      [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🛒 Your Cart</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={22} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {cartItems.length > 0 ? (
            <View style={styles.cartSection}>
              <Text style={styles.sectionTitle}>
                Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </Text>
              
              {/* Cart Items */}
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={item.image} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productCategory}>{item.category}</Text>
                    <Text style={styles.productPrice}>
                      PK{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                    </Text>
                    
                    {/* Quantity Controls */}
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Ionicons name="remove" size={16} color="#667eea" />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Ionicons name="add" size={16} color="#667eea" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
                  </TouchableOpacity>
                </View>
              ))}

              {/* Order Summary */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
                  <Text style={styles.summaryValue}>PK{calculateSubtotal().toFixed(2)}</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Shipping</Text>
                  <Text style={styles.summaryValue}>PK5.99</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tax (8%)</Text>
                  <Text style={styles.summaryValue}>PK{calculateTax().toFixed(2)}</Text>
                </View>
                
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>PK{calculateTotal().toFixed(2)}</Text>
                </View>
              </View>

              {/* Checkout Button */}
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.checkoutGradient}
                >
                  <Ionicons name="card" size={20} color="white" />
                  <Text style={styles.checkoutText}>
                    Place Order - PK{calculateTotal().toFixed(2)}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Continue Shopping */}
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.continueButtonText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Ionicons name="cart-outline" size={80} color="#ccc" />
              <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
              <Text style={styles.emptyCartText}>
                Add some items to your cart to see them here!
              </Text>
             <TouchableOpacity 
  style={styles.shopButton}
  onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.shopButtonGradient}
                >
                  <Ionicons name="home" size={20} color="white" />
                  <Text style={styles.shopButtonText}>Start Shopping</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  cartSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 5,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#2d3748',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#718096',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 10,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  checkoutButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  checkoutGradient: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#667eea',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyCartTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  shopButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  shopButtonGradient: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AddToCart;
