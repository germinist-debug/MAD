import React, { useState, useRef, useEffect } from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Light Color Palette
const colors = {
  primary: '#667eea',
  primaryLight: '#764ba2',
  secondary: '#f093fb',
  accent: '#4ecdc4',
  background: '#f8f9ff',
  card: '#ffffff',
  text: '#2d3748',
  textLight: '#718096',
  border: '#e2e8f0',
  success: '#48bb78'
};

const Productdetails = ({ route, navigation }) => {
  const { productId } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const imageScale = useRef(new Animated.Value(1)).current;

  // Enhanced background animations
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const morphAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Enhanced product data with more perfumes
  const products = {
    '1': {
      id: '1',
      name: 'Pro Basketball Shoes',
      price: 'PK129.99',
      description: 'High-performance basketball shoes with superior cushioning and ankle support. Perfect for professional athletes and serious players.',
      features: ['Advanced ankle support', 'Premium cushioning', 'Breathable mesh', 'Durable outsole'],
      specifications: {
        Material: 'Synthetic Leather & Mesh',
        Weight: '420g',
        Colors: 'Black/Red, White/Blue',
        Sizes: 'US 7-13'
      },
      category: 'Basketball Shoes',
      image: require('../../assets/basketballshoes.jpg'),
      rating: 4.8,
      reviews: 124,
      gradient: ['#667eea', '#764ba2']
    },
    '2': {
      id: '2',
      name: 'Elite Running Joggers',
      price: 'PK89.0',
      description: 'Lightweight running shoes with advanced cushioning for maximum comfort during long distance runs.',
      features: ['Lightweight design', 'Shock absorption', 'Flexible sole', 'Moisture-wicking'],
      specifications: {
        Material: 'Knit Fabric',
        Weight: '280g',
        Colors: 'Gray/Orange, Black/Green',
        Sizes: 'US 6-12'
      },
      category: 'Running Shoes',
      image: require('../../assets/runningjogers.jpg'),
      rating: 4.6,
      reviews: 89,
      gradient: ['#f093fb', '#f5576c']
    },
    '3': {
      id: '3',
      name: 'Air Max Basketball',
      price: 'PK139.0',
      description: 'Premium basketball shoes with responsive air cushioning technology for superior performance.',
      features: ['Air cushioning', 'Enhanced grip', 'Breathable upper', 'Ankle support'],
      specifications: {
        Material: 'Premium Leather',
        Weight: '450g',
        Colors: 'White/Black, Red/White',
        Sizes: 'US 7-14'
      },
      category: 'Basketball Shoes',
      image: require('../../assets/probasket.jpg'),
      rating: 4.9,
      reviews: 156,
      gradient: ['#4facfe', '#00f2fe']
    },
    '4': {
      id: '4',
      name: 'Speed Runner Pro',
      price: 'PK79.0',
      description: 'Professional running shoes designed for speed and endurance with breathable mesh fabric.',
      features: ['Speed design', 'Endurance focused', 'Lightweight', 'Flexible'],
      specifications: {
        Material: 'Mesh Fabric',
        Weight: '260g',
        Colors: 'Blue/White, Black/Yellow',
        Sizes: 'US 6-12'
      },
      category: 'Running Shoes',
      image: require('../../assets/speedshoes.jpg'),
      rating: 4.5,
      reviews: 67,
      gradient: ['#43e97b', '#38f9d7']
    },
    '5': {
      id: '5',
      name: 'Winter Sports Shoes',
      price: 'PK99',
      description: 'Durable winter sports shoes with waterproof technology and enhanced traction.',
      features: ['Waterproof', 'Winter traction', 'Insulated', 'Durable'],
      specifications: {
        Material: 'Waterproof Leather',
        Weight: '380g',
        Colors: 'Black, Navy Blue',
        Sizes: 'US 7-13'
      },
      category: 'Winter Shoes',
      image: require('../../assets/shoes3.jpg'),
      rating: 4.7,
      reviews: 89,
      gradient: ['#a8edea', '#fed6e3']
    },
    '6': {
      id: '6',
      name: 'Winter Boots Pro',
      price: 'PK119',
      description: 'Premium winter boots with advanced insulation and superior grip for snowy conditions.',
      features: ['Advanced insulation', 'Superior grip', 'Waterproof', 'Comfort fit'],
      specifications: {
        Material: 'Insulated Leather',
        Weight: '520g',
        Colors: 'Brown, Black, Gray',
        Sizes: 'US 7-13'
      },
      category: 'Winter Shoes',
      image: require('../../assets/shoes2.jpg'),
      rating: 4.8,
      reviews: 134,
      gradient: ['#d299c2', '#fef9d7']
    },
    '7': {
      id: '7',
      name: 'Floral Elegance',
      price: 'PK65',
      description: 'Delicate floral fragrance with notes of jasmine and rose for women. Lasts up to 8 hours.',
      features: ['Long-lasting', 'Floral notes', 'Elegant packaging', 'Day wear'],
      specifications: {
        'Scent Type': 'Floral',
        'Duration': '8 hours',
        'Volume': '100ml',
        'Gender': 'Women'
      },
      category: 'Women\'s Perfumes',
      image: require('../../assets/floral.jpg'),
      rating: 4.7,
      reviews: 203,
      gradient: ['#ff9a9e', '#fecfef']
    },
    '8': {
      id: '8',
      name: 'Midnight Oud',
      price: 'PK89',
      description: 'Rich and masculine fragrance with oud and woody notes for men. Premium long-lasting scent.',
      features: ['Oud notes', 'Woody base', 'Long-lasting', 'Evening wear'],
      specifications: {
        'Scent Type': 'Woody',
        'Duration': '12 hours',
        'Volume': '100ml',
        'Gender': 'Men'
      },
      category: 'Men\'s Perfumes',
      image: require('../../assets/oud.jpg'),
      rating: 4.8,
      reviews: 178,
      gradient: ['#a8caba', '#5d4157']
    },
    '9': {
      id: '9',
      name: 'Ocean Breeze',
      price: 'PK75',
      description: 'Fresh aquatic fragrance with citrus top notes and marine accords. Perfect for summer days.',
      features: ['Fresh aquatic scent', 'Citrus notes', 'Summer fragrance', 'Refreshing'],
      specifications: {
        'Scent Type': 'Aquatic',
        'Duration': '6 hours',
        'Volume': '100ml',
        'Gender': 'Unisex'
      },
      category: 'Unisex Perfumes',
      image: require('../../assets/ocean.jpg'),
      rating: 4.6,
      reviews: 145,
      gradient: ['#4facfe', '#00f2fe']
    },
    '10': {
      id: '10',
      name: 'Vanilla Dream',
      price: 'PK69',
      description: 'Warm and sweet vanilla-based fragrance with hints of caramel and tonka bean.',
      features: ['Sweet vanilla', 'Warm base', 'Comforting scent', 'Evening wear'],
      specifications: {
        'Scent Type': 'Gourmand',
        'Duration': '7 hours',
        'Volume': '100ml',
        'Gender': 'Women'
      },
      category: 'Women\'s Perfumes',
      image: require('../../assets/dream.jpg'),
      rating: 4.5,
      reviews: 167,
      gradient: ['#fad0c4', '#ffd1ff']
    },
    '11': {
      id: '11',
      name: 'Citrus Splash',
      price: 'PK72',
      description: 'Energetic citrus fragrance with lemon, bergamot and grapefruit notes. Invigorating and fresh.',
      features: ['Citrus burst', 'Energetic', 'Day wear', 'Fresh'],
      specifications: {
        'Scent Type': 'Citrus',
        'Duration': '5 hours',
        'Volume': '100ml',
        'Gender': 'Unisex'
      },
      category: 'Unisex Perfumes',
      image: require('../../assets/black.jpg'),
      rating: 4.4,
      reviews: 123,
      gradient: ['#43e97b', '#38f9d7']
    },
    '12': {
      id: '12',
      name: 'Mystic Amber',
      price: 'PK99',
      description: 'Exotic oriental fragrance with amber, spices and precious woods. Mysterious and captivating.',
      features: ['Oriental notes', 'Spicy accords', 'Mysterious', 'Evening wear'],
      specifications: {
        'Scent Type': 'Oriental',
        'Duration': '10 hours',
        'Volume': '100ml',
        'Gender': 'Unisex'
      },
      category: 'Luxury Perfumes',
      image: require('../../assets/bloom.jpg'),
      rating: 4.9,
      reviews: 89,
      gradient: ['#ff6b6b', '#ffd166']
    },
    '13': {
      id: '13',
      name: 'Rose Nocturne',
      price: 'PK82',
      description: 'Romantic rose fragrance with dark undertones of patchouli and musk. Elegant and sophisticated.',
      features: ['Romantic rose', 'Sophisticated', 'Evening scent', 'Elegant'],
      specifications: {
        'Scent Type': 'Floral Oriental',
        'Duration': '8 hours',
        'Volume': '100ml',
        'Gender': 'Women'
      },
      category: 'Women\'s Perfumes',
      image: require('../../assets/rose.jpg'),
      rating: 4.7,
      reviews: 156,
      gradient: ['#ff9a9e', '#fecfef']
    },
    '14': {
      id: '14',
      name: 'Floral Ellegance',
      price: 'PK99',
      description: 'Bold masculine fragrance combining leather, tobacco and woody notes. Powerful and confident.',
      features: ['Leather notes', 'Tobacco accords', 'Powerful scent', 'Confident'],
      specifications: {
        'Scent Type': 'Leather',
        'Duration': '12 hours',
        'Volume': '100ml',
        'Gender': 'Men'
      },
      category: 'Men\'s Perfumes',
      image: require('../../assets/floral.jpg'),
      rating: 4.8,
      reviews: 134,
      gradient: ['#a8caba', '#5d4157']
    }
  };

  useEffect(() => {
    // Enhanced entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Enhanced background animations
      Animated.loop(
        Animated.timing(bubbleAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(morphAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(morphAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 15000,
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  // Floating Bubble Component
  const FloatingBubble = ({ size, left, startTop, delay, color }) => {
    const translateY = bubbleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -height]
    });

    const translateX = bubbleAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 10, 0]
    });

    const scale = bubbleAnim.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [0.3, 1, 1, 0.3]
    });

    return (
      <Animated.View
        style={[
          styles.bubble,
          {
            width: size,
            height: size,
            left,
            top: startTop,
            backgroundColor: color,
            transform: [
              { translateY },
              { translateX },
              { scale }
            ],
          },
        ]}
      />
    );
  };

  // Wave Animation Component
  const WaveAnimation = () => {
    const waveTranslateX = waveAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-100%']
    });

    return (
      <Animated.View 
        style={[
          styles.wave,
          {
            transform: [{ translateX: waveTranslateX }]
          }
        ]} 
      />
    );
  };

  // Morphing Shape Component
  const MorphingShape = ({ size, left, top, delay, color }) => {
    const morphScale = morphAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.2, 1]
    });

    const borderRadius = morphAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [size / 2, size / 4, size / 2]
    });

    const opacity = morphAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.1, 0.3, 0.1]
    });

    return (
      <Animated.View
        style={[
          styles.morphingShape,
          {
            width: size,
            height: size,
            left,
            top,
            backgroundColor: color,
            transform: [{ scale: morphScale }],
            borderRadius,
            opacity,
          },
        ]}
      />
    );
  };

  // Sparkle Component
  const Sparkle = ({ size, left, top, delay }) => {
    const sparkleScale = sparkleAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    const sparkleRotate = sparkleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });

    const opacity = sparkleAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.6, 0]
    });

    return (
      <Animated.View
        style={[
          styles.sparkle,
          {
            width: size,
            height: size,
            left,
            top,
            transform: [
              { scale: sparkleScale },
              { rotate: sparkleRotate }
            ],
            opacity,
          },
        ]}
      >
        <Ionicons name="sparkles" size={size} color="#667eea" />
      </Animated.View>
    );
  };

  // Pulse Orb Component
  const PulseOrb = ({ size, left, top, color }) => {
    const pulseScale = pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.5]
    });

    const pulseOpacity = pulseAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.1, 0.3, 0.1]
    });

    return (
      <Animated.View
        style={[
          styles.pulseOrb,
          {
            width: size,
            height: size,
            left,
            top,
            backgroundColor: color,
            transform: [{ scale: pulseScale }],
            opacity: pulseOpacity,
          },
        ]}
      />
    );
  };

  // Rotating Geometric Component
  const RotatingGeometric = ({ size, left, top, shape, color }) => {
    const rotate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const borderRadius = shape === 'circle' ? size / 2 : shape === 'triangle' ? 0 : 10;

    return (
      <Animated.View
        style={[
          styles.rotatingGeometric,
          {
            width: size,
            height: size,
            left,
            top,
            backgroundColor: color,
            borderRadius,
            transform: [{ rotate }],
            opacity: 0.1,
          },
        ]}
      />
    );
  };

  // Floating Particle Component
  const FloatingParticle = ({ size, left, startTop, delay, color }) => {
    const translateY = floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -30]
    });

    const translateX = floatAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 5, 0]
    });

    return (
      <Animated.View
        style={[
          styles.floatingParticle,
          {
            width: size,
            height: size,
            left,
            top: startTop,
            backgroundColor: color,
            transform: [
              { translateY },
              { translateX }
            ],
          },
        ]}
      />
    );
  };

  const handleImagePressIn = () => {
    Animated.spring(imageScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleImagePressOut = () => {
    Animated.spring(imageScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleAddToCart = () => {
    navigation.navigate('AddToCart', { 
      product: product,
      quantity: quantity
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={20}
          color={i <= rating ? "#FFD700" : colors.textLight}
        />
      );
    }
    return stars;
  };

  // All shoes products (IDs 1-6)
  const shoesProducts = ['1', '2', '3', '4', '5', '6'].map(id => products[id]);
  
  // All perfume products (IDs 7-14)
  const perfumeProducts = ['7', '8', '9', '10', '11', '12', '13', '14'].map(id => products[id]);

  // If no productId is provided, show modern collection view
  if (!productId) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        
        {/* Enhanced Light Background with Animations */}
        <View style={styles.backgroundContainer}>
          {/* Wave Animation */}
          <View style={styles.waveContainer}>
            <WaveAnimation />
            <WaveAnimation />
          </View>

          {/* Floating Bubbles */}
          <FloatingBubble size={25} left="10%" startTop={200} delay={0} color="rgba(102, 126, 234, 0.1)" />
          <FloatingBubble size={18} left="25%" startTop={300} delay={2000} color="rgba(79, 205, 196, 0.1)" />
          <FloatingBubble size={22} left="40%" startTop={150} delay={4000} color="rgba(240, 147, 251, 0.1)" />
          <FloatingBubble size={15} left="60%" startTop={250} delay={6000} color="rgba(102, 126, 234, 0.1)" />
          <FloatingBubble size={20} left="75%" startTop={180} delay={8000} color="rgba(79, 205, 196, 0.1)" />
          <FloatingBubble size={17} left="90%" startTop={320} delay={10000} color="rgba(240, 147, 251, 0.1)" />

          {/* Morphing Shapes */}
          <MorphingShape size={80} left="5%" top="10%" delay={0} color="rgba(102, 126, 234, 0.05)" />
          <MorphingShape size={60} left="80%" top="15%" delay={1000} color="rgba(79, 205, 196, 0.05)" />
          <MorphingShape size={100} left="70%" top="70%" delay={2000} color="rgba(240, 147, 251, 0.05)" />

          {/* Sparkles */}
          <Sparkle size={12} left="15%" top="25%" delay={0} />
          <Sparkle size={8} left="35%" top="65%" delay={500} />
          <Sparkle size={10} left="55%" top="35%" delay={1000} />
          <Sparkle size={9} left="75%" top="55%" delay={1500} />
          <Sparkle size={11} left="85%" top="25%" delay={2000} />

          {/* Pulse Orbs */}
          <PulseOrb size={120} left="10%" top="60%" color="rgba(102, 126, 234, 0.03)" />
          <PulseOrb size={80} left="85%" top="40%" color="rgba(240, 147, 251, 0.03)" />

          {/* Rotating Geometrics */}
          <RotatingGeometric size={60} left="20%" top="80%" shape="square" color="rgba(79, 205, 196, 0.1)" />
          <RotatingGeometric size={40} left="60%" top="20%" shape="circle" color="rgba(102, 126, 234, 0.1)" />
          <RotatingGeometric size={50} left="85%" top="75%" shape="square" color="rgba(240, 147, 251, 0.1)" />

          {/* Floating Particles */}
          <FloatingParticle size={8} left="15%" startTop={400} delay={0} color="rgba(102, 126, 234, 0.2)" />
          <FloatingParticle size={6} left="45%" startTop={350} delay={1000} color="rgba(79, 205, 196, 0.2)" />
          <FloatingParticle size={7} left="75%" startTop={380} delay={2000} color="rgba(240, 147, 251, 0.2)" />
          <FloatingParticle size={5} left="30%" startTop={420} delay={1500} color="rgba(102, 126, 234, 0.2)" />
        </View>

        <SafeAreaView style={styles.safeArea}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Modern Header */}
            <Animated.View 
              style={[
                styles.modernHeader,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.modernTitle}>Premium Collections</Text>
              <Text style={styles.modernSubtitle}>Discover excellence in every detail</Text>
            </Animated.View>

            {/* Shoes Section */}
            <View style={styles.collectionSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="football" size={28} color={colors.primary} />
                <Text style={styles.sectionTitle}>Premium Shoes Collection</Text>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.horizontalScroll}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {shoesProducts.map((product) => (
                  <TouchableOpacity 
                    key={product.id}
                    style={styles.productCard}
                    onPress={() => navigation.navigate('Productdetails', { productId: product.id })}
                  >
                    <LinearGradient
                      colors={product.gradient}
                      style={styles.cardGradient}
                    >
                      <Image 
                        source={product.image} 
                        style={styles.collectionImage}
                        resizeMode="cover"
                      />
                      <View style={styles.cardContent}>
                        <Text style={styles.productCardName}>{product.name}</Text>
                        <Text style={styles.productCardPrice}>PK{product.price}</Text>
                        <View style={styles.cardRatingContainer}>
                          <Ionicons name="star" size={14} color="#FFD700" />
                          <Text style={styles.cardRatingText}>{product.rating}</Text>
                          <Text style={styles.cardReviewsText}>({product.reviews})</Text>
                        </View>
                        <View style={styles.categoryTag}>
                          <Text style={styles.categoryTagText}>{product.category}</Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Enhanced Perfumes Section */}
            <View style={styles.collectionSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="flower" size={28} color={colors.secondary} />
                <Text style={styles.sectionTitle}>Luxury Perfumes Collection</Text>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.horizontalScroll}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {perfumeProducts.map((product) => (
                  <TouchableOpacity 
                    key={product.id}
                    style={styles.productCard}
                    onPress={() => navigation.navigate('Productdetails', { productId: product.id })}
                  >
                    <LinearGradient
                      colors={product.gradient}
                      style={styles.cardGradient}
                    >
                      <Image 
                        source={product.image} 
                        style={styles.collectionImage}
                        resizeMode="cover"
                      />
                      <View style={styles.cardContent}>
                        <Text style={styles.productCardName}>{product.name}</Text>
                        <Text style={styles.productCardPrice}>PK{product.price}</Text>
                        <View style={styles.cardRatingContainer}>
                          <Ionicons name="star" size={14} color="#FFD700" />
                          <Text style={styles.cardRatingText}>{product.rating}</Text>
                          <Text style={styles.cardReviewsText}>({product.reviews})</Text>
                        </View>
                        <View style={styles.categoryTag}>
                          <Text style={styles.categoryTagText}>{product.category}</Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  const product = products[productId] || {
    name: 'Product Not Found',
    price: 0,
    description: 'Sorry, this product is not available.',
    image: require('../../assets/placeholder.jpg'),
    rating: 0,
    reviews: 0,
    gradient: [colors.primary, colors.primaryLight]
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Enhanced Light Background with Animations */}
      <View style={styles.backgroundContainer}>
        {/* Wave Animation */}
        <View style={styles.waveContainer}>
          <WaveAnimation />
          <WaveAnimation />
        </View>

        {/* Floating Bubbles */}
        <FloatingBubble size={25} left="10%" startTop={200} delay={0} color="rgba(102, 126, 234, 0.1)" />
        <FloatingBubble size={18} left="25%" startTop={300} delay={2000} color="rgba(79, 205, 196, 0.1)" />
        <FloatingBubble size={22} left="40%" startTop={150} delay={4000} color="rgba(240, 147, 251, 0.1)" />
        <FloatingBubble size={15} left="60%" startTop={250} delay={6000} color="rgba(102, 126, 234, 0.1)" />

        {/* Morphing Shapes */}
        <MorphingShape size={80} left="5%" top="10%" delay={0} color="rgba(102, 126, 234, 0.05)" />
        <MorphingShape size={60} left="80%" top="15%" delay={1000} color="rgba(79, 205, 196, 0.05)" />

        {/* Sparkles */}
        <Sparkle size={12} left="15%" top="25%" delay={0} />
        <Sparkle size={8} left="35%" top="65%" delay={500} />
        <Sparkle size={10} left="55%" top="35%" delay={1000} />

        {/* Pulse Orbs */}
        <PulseOrb size={100} left="5%" top="70%" color="rgba(102, 126, 234, 0.03)" />
        <PulseOrb size={70} left="90%" top="60%" color="rgba(240, 147, 251, 0.03)" />

        {/* Rotating Geometrics */}
        <RotatingGeometric size={50} left="15%" top="85%" shape="square" color="rgba(79, 205, 196, 0.1)" />
        <RotatingGeometric size={35} left="70%" top="25%" shape="circle" color="rgba(102, 126, 234, 0.1)" />

        {/* Floating Particles */}
        <FloatingParticle size={6} left="20%" startTop={450} delay={0} color="rgba(102, 126, 234, 0.2)" />
        <FloatingParticle size={5} left="50%" startTop={400} delay={1000} color="rgba(79, 205, 196, 0.2)" />
        <FloatingParticle size={7} left="80%" startTop={430} delay={2000} color="rgba(240, 147, 251, 0.2)" />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Back Button */}
          <Animated.View 
            style={[
              styles.backButtonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </TouchableOpacity>
          </Animated.View>

          {/* Product Image with Modern Design */}
          <Animated.View 
            style={[
              styles.imageContainer,
              {
                transform: [
                  { scale: imageScale },
                  { translateY: slideAnim }
                ],
                opacity: fadeAnim
              }
            ]}
          >
            <TouchableOpacity 
              activeOpacity={0.9}
              onPressIn={handleImagePressIn}
              onPressOut={handleImagePressOut}
            >
              <LinearGradient
                colors={product.gradient || [colors.primary, colors.primaryLight]}
                style={styles.imageGradient}
              >
                <Image 
                  source={product.image} 
                  style={styles.mainImage}
                  resizeMode="contain"
                />
                
                {/* Floating Elements */}
                <View style={styles.floatingBadge}>
                  <Text style={styles.floatingBadgeText}>NEW</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Favorite Button */}
            <Animated.View 
              style={[
                styles.favoriteButton,
                {
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <TouchableOpacity onPress={toggleFavorite}>
                <LinearGradient
                  colors={favorite ? ['#ff6b6b', '#ee5a52'] : ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
                  style={styles.favoriteGradient}
                >
                  <Ionicons 
                    name={favorite ? "heart" : "heart-outline"} 
                    size={24} 
                    color={favorite ? "#fff" : colors.primary} 
                  />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* Product Info Card */}
          <Animated.View 
            style={[
              styles.productInfoCard,
              {
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim
              }
            ]}
          >
            <View style={styles.infoContainer}>
              {/* Header with Category and Rating */}
              <View style={styles.productHeader}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>{product.category}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingValue}>{product.rating}</Text>
                  <Text style={styles.reviewsCount}>({product.reviews})</Text>
                </View>
              </View>

              {/* Product Name and Price */}
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>PK{product.price.toFixed(2)}</Text>

              {/* Star Rating */}
              <View style={styles.starRating}>
                {renderStars(Math.floor(product.rating))}
                <Text style={styles.ratingText}>{product.rating}/5</Text>
              </View>

              {/* Description */}
              <Text style={styles.description}>{product.description}</Text>

              {/* Add to Cart Button */}
              <TouchableOpacity 
                style={styles.addToCartButton} 
                onPress={handleAddToCart}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryLight]}
                  style={styles.cartButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="cart" size={24} color="white" />
                  <Text style={styles.addToCartButtonText}>
                    Add to Cart - PK{(product.price * quantity).toFixed(2)}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Enhanced Background Animations
  bubble: {
    position: 'absolute',
    borderRadius: 50,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    width: '200%',
    height: 40,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    borderRadius: 20,
  },
  morphingShape: {
    position: 'absolute',
  },
  sparkle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseOrb: {
    position: 'absolute',
    borderRadius: 100,
  },
  rotatingGeometric: {
    position: 'absolute',
  },
  floatingParticle: {
    position: 'absolute',
    borderRadius: 10,
  },
  // Collection Styles
  modernHeader: {
    padding: 30,
    alignItems: 'center',
  },
  modernTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  modernSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  collectionSection: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 12,
  },
  horizontalScroll: {
    marginHorizontal: -5,
  },
  horizontalScrollContent: {
    paddingHorizontal: 5,
  },
  productCard: {
    borderRadius: 25,
    marginRight: 20,
    width: 280,
    height: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  cardGradient: {
    borderRadius: 25,
    padding: 20,
    height: '100%',
    justifyContent: 'space-between',
  },
  collectionImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  productCardPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 4,
    marginRight: 4,
  },
  cardReviewsText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  categoryTag: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'center',
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Individual Product Styles
  backButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 100,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
  imageGradient: {
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    position: 'relative',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  floatingBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  floatingBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  favoriteGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfoCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  infoContainer: {
    padding: 30,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryContainer: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f39c12',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: colors.textLight,
  },
  productName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 38,
  },
  productPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginLeft: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textLight,
    marginBottom: 30,
  },
  addToCartButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cartButtonGradient: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default Productdetails;