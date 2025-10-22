import React from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AddToCartButton = ({ 
  product, 
  quantity = 1, 
  navigation,
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'primary', // 'primary', 'secondary', 'outline'
  showIcon = true,
  onAddToCart 
}) => {
  const handlePress = () => {
    if (navigation && product) {
      // Navigate to AddToCart screen
      navigation.navigate('AddToCart', { 
        product: product,
        quantity: quantity
      });
    } else if (onAddToCart) {
      // Custom handler if provided
      onAddToCart(product, quantity);
    } else if (product) {
      // Fallback alert
      Alert.alert(
        'Added to Cart',
        `PK{quantity} x PK{product.name} has been added to your cart!`,
        [{ text: 'OK' }]
      );
    }
  };

  // Button sizes
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmall;
      case 'large':
        return styles.buttonLarge;
      default:
        return styles.buttonMedium;
    }
  };

  // Button variants
  const getButtonVariant = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'outline':
        return styles.buttonOutline;
      default:
        return styles.buttonPrimary;
    }
  };

  // Text variants
  const getTextVariant = () => {
    switch (variant) {
      case 'outline':
        return styles.buttonTextOutline;
      default:
        return styles.buttonText;
    }
  };

  const renderContent = () => {
    if (variant === 'primary') {
      return (
        <LinearGradient
          colors= {['#667eea', '#764ba2']}
          style={[styles.button, getButtonSize(), getButtonVariant()]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {showIcon && <Ionicons name="cart" size={16} color="white" style={styles.icon} />}
          <Text style={[styles.buttonText, getTextVariant()]}>
            Add to Cart
          </Text>
        </LinearGradient>
      );
    }

    return (
      <View style={[styles.button, getButtonSize(), getButtonVariant()]}>
        {showIcon && (
          <Ionicons 
            name="cart" 
            size={16} 
            color={variant === 'outline' ? '#667eea' : 'white'} 
            style={styles.icon} 
          />
        )}
        <Text style={[styles.buttonText, getTextVariant()]}>
          Add to Cart
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};



export default AddToCartButton;