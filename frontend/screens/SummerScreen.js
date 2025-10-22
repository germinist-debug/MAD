import React, { useRef, useEffect } from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Import images
const images = {
  summeroutfit: require('../../assets/summeroutfit.jpg'),
  summeroutfit1: require('../../assets/summeroutfit1.jpg'),
  summeroutfit2: require('../../assets/summeroutfit2.jpg'),
  summeroutfit3: require('../../assets/summeroutfit3.jpg'),
  summer1: require('../../assets/summer1.jpg'),
  summer2: require('../../assets/summer2.jpg'),
  summer3: require('../../assets/summer3.jpg'),
  summer4: require('../../assets/summer4.jpg'),
  babysummeroutfit: require('../../assets/babysummeroutfit.jpg'),
  babysummershoes: require('../../assets/babysummershoes.jpg'),
  babyoutfitsummer: require('../../assets/babyoutfitsummer.jpg'),
  shorts: require('../../assets/shorts.jpg'),
  babysummerhat: require('../../assets/sunhat.jpg'),
  babysummershoes2: require('../../assets/babysummershoes2.jpg'),
  summerdress: require('../../assets/summerdress.jpg'),
};

// Modern Summer Color Palette
const colors = {
  primary: '#FF6B8B',       // Coral Pink
  primaryLight: '#FF8E9E',  // Light Coral
  primaryDark: '#E5567A',   // Dark Coral
  secondary: '#4ECDC4',     // Teal
  accent: '#FFD166',        // Sunshine Yellow
  background: '#F8FDFF',    // Light Blue-White
  card: '#FFFFFF',          // White Cards
  text: '#2D3748',          // Dark Gray
  textLight: '#718096',     // Medium Gray
  border: '#E2F1F8',        // Light Blue Border
  success: '#48BB78',       // Green
};

const SummerScreen = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // New falling animations
  const leafAnim = useRef(new Animated.Value(0)).current;
  const flowerAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  const waterDropAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 0],
    extrapolate: 'clamp'
  });

  // Hero parallax effect
  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -100],
    extrapolate: 'clamp'
  });

  const heroScale = scrollY.interpolate({
    inputRange: [-100, 0, 200],
    outputRange: [1.3, 1, 0.9],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Leaf falling animation
      Animated.loop(
        Animated.timing(leafAnim, {
          toValue: 1,
          duration: 6000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      // Flower falling animation
      Animated.loop(
        Animated.timing(flowerAnim, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      // Confetti falling animation
      Animated.loop(
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      // Water drops animation
      Animated.loop(
        Animated.timing(waterDropAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      // Sparkle animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  // Create multiple animated values for different positions
  const leafPositions = useRef(
    Array.from({ length: 10 }, () => new Animated.Value(0))
  ).current;

  const flowerPositions = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(0))
  ).current;

  const confettiPositions = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(0))
  ).current;

  const waterDropPositions = useRef(
    Array.from({ length: 5 }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Start all leaf animations
    leafPositions.forEach((anim, index) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 6000 + index * 500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });

    // Start all flower animations
    flowerPositions.forEach((anim, index) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 8000 + index * 700,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });

    // Start all confetti animations
    confettiPositions.forEach((anim, index) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 4000 + index * 400,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });

    // Start all water drop animations
    waterDropPositions.forEach((anim, index) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 5000 + index * 600,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });
  }, []);

  // Falling Leaf Component
  const FallingLeaf = ({ size, left, anim, index }) => {
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, height + 100]
    });

    const translateX = anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 30, 0]
    });

    const rotate = anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '720deg']
    });

    const opacity = anim.interpolate({
      inputRange: [0, 0.1, 0.9, 1],
      outputRange: [0, 0.8, 0.8, 0]
    });

    const getLeafColor = () => {
      const colors = ['#FF6B8B', '#4ECDC4', '#FFD166', '#48BB78'];
      return colors[index % colors.length];
    };

    return (
      <Animated.View
        style={[
          styles.fallingItem,
          {
            width: size,
            height: size,
            left: left,
            transform: [
              { translateY },
              { translateX },
              { rotate }
            ],
            opacity,
          },
        ]}
      >
        <Ionicons 
          name="leaf" 
          size={size} 
          color={getLeafColor()} 
        />
      </Animated.View>
    );
  };

  // Falling Flower Component
  const FallingFlower = ({ size, left, anim, index }) => {
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, height + 100]
    });

    const translateX = anim.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [0, -20, 20, 0]
    });

    const rotate = anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const scale = anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 1, 0.5]
    });

    const opacity = anim.interpolate({
      inputRange: [0, 0.1, 0.9, 1],
      outputRange: [0, 0.7, 0.7, 0]
    });

    const getFlowerEmoji = () => {
      const flowers = ['🌸', '🌺', '🌼', '🌷', '💮'];
      return flowers[index % flowers.length];
    };

    return (
      <Animated.View
        style={[
          styles.fallingItem,
          {
            width: size,
            height: size,
            left: left,
            transform: [
              { translateY },
              { translateX },
              { rotate },
              { scale }
            ],
            opacity,
          },
        ]}
      >
        <Text style={{ fontSize: size }}>{getFlowerEmoji()}</Text>
      </Animated.View>
    );
  };

  // Confetti Piece Component
  const ConfettiPiece = ({ size, left, anim, index }) => {
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, height + 50]
    });

    const translateX = anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, (index % 2 === 0 ? 40 : -40), 0]
    });

    const rotate = anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const opacity = anim.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0, 0.6, 0.6, 0]
    });

    const getConfettiColor = () => {
      const colors = ['#FF6B8B', '#4ECDC4', '#FFD166', '#48BB78', '#FF6B8B', '#4ECDC4'];
      return colors[index % colors.length];
    };

    return (
      <Animated.View
        style={[
          styles.confettiPiece,
          {
            width: size,
            height: size,
            left: left,
            backgroundColor: getConfettiColor(),
            transform: [
              { translateY },
              { translateX },
              { rotate }
            ],
            opacity,
          },
        ]}
      />
    );
  };

  // Water Drop Component
  const WaterDrop = ({ size, left, anim, index }) => {
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, height + 50]
    });

    const scale = anim.interpolate({
      inputRange: [0, 0.1, 0.5, 0.9, 1],
      outputRange: [0, 1, 1, 0.8, 0]
    });

    const opacity = anim.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [0, 0.6, 0.6, 0]
    });

    return (
      <Animated.View
        style={[
          styles.waterDrop,
          {
            width: size,
            height: size * 1.5,
            left: left,
            transform: [
              { translateY },
              { scale }
            ],
            opacity,
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(78, 205, 196, 0.8)', 'rgba(78, 205, 196, 0.4)']}
          style={styles.waterDropGradient}
        />
      </Animated.View>
    );
  };

  // Sparkle Component
  const Sparkle = ({ size, left, top }) => {
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
      outputRange: [0, 0.8, 0]
    });

    return (
      <Animated.View
        style={[
          styles.sparkle,
          {
            width: size,
            height: size,
            left: left,
            top: top,
            transform: [
              { scale: sparkleScale },
              { rotate: sparkleRotate }
            ],
            opacity,
          },
        ]}
      >
        <Ionicons name="sparkles" size={size} color="#FFD700" />
      </Animated.View>
    );
  };

  // Modern product data structure
  const collections = {
    pret: {
      title: "Pret Collection",
      subtitle: "Ready-to-wear summer elegance",
      gradient: ['#FF6B8B', '#FF8E53'],
      icon: '👗',
      products: [
        {
          id: 'summer1',
          name: 'Floral Summer Dress',
          price: 'PK49.99',
          originalPrice: 'PK69.99',
          image: images.summeroutfit,
          rating: 4.8,
          category: 'Premium Dress',
          discount: '29%',
          tags: ['🌸 Floral', '🔥 Hot']
        },
        {
          id: 'summer2',
          name: 'Casual Summer Outfit',
          price: 'PK39.99',
          originalPrice: 'PK54.99',
          image: images.summeroutfit1,
          rating: 4.6,
          category: 'Casual Wear',
          discount: '27%',
          tags: ['✨ Casual']
        },
        {
          id: 'summer3',
          name: 'Beach Wear Set',
          price: 'PK45.99',
          originalPrice: 'PK59.99',
          image: images.summeroutfit2,
          rating: 4.7,
          category: 'Beach Collection',
          discount: '23%',
          tags: ['🏖️ Beach']
        },
        {
          id: 'summer4',
          name: 'Evening Summer Dress',
          price: 'PK59.99',
          originalPrice: 'PK79.99',
          image: images.summeroutfit3,
          rating: 4.9,
          category: 'Evening Wear',
          discount: '25%',
          tags: ['🌟 Evening']
        }
      ]
    },
    unstitched: {
      title: "Unstitched Collection",
      subtitle: "Light fabrics for summer tailoring",
      gradient: ['#4ECDC4', '#44A08D'],
      icon: '🧵',
      products: [
        {
          id: 'summer5',
          name: 'Cotton Lawn Fabric',
          price: 'PK24.99',
          originalPrice: 'PK34.99',
          image: images.summer1,
          rating: 4.5,
          category: 'Premium Cotton',
          discount: '29%',
          tags: ['🌿 Natural']
        },
        {
          id: 'summer6',
          name: 'Linen Blend Fabric',
          price: 'PK29.99',
          originalPrice: 'PK39.99',
          image: images.summer2,
          rating: 4.6,
          category: 'Linen Material',
          discount: '25%',
          tags: ['💫 Premium']
        },
        {
          id: 'summer7',
          name: 'Chiffon Fabric',
          price: 'PK19.99',
          originalPrice: 'PK29.99',
          image: images.summer3,
          rating: 4.4,
          category: 'Sheer Fabric',
          discount: '33%',
          tags: ['🎀 Delicate']
        },
        {
          id: 'summer8',
          name: 'Silk Cotton Fabric',
          price: 'PK34.99',
          originalPrice: 'PK49.99',
          image: images.summer4,
          rating: 4.7,
          category: 'Luxury Blend',
          discount: '30%',
          tags: ['💎 Luxury']
        }
      ]
    },
    kids: {
      title: "Kids Collection",
      subtitle: "Adorable summer wear for children",
      gradient: ['#FFD166', '#FFB347'],
      icon: '👶',
      products: [
        {
          id: 'summer9',
          name: 'Kids Summer Dress',
          price: 'PK29.99',
          originalPrice: 'PK39.99',
          image: images.babysummeroutfit,
          rating: 4.7,
          category: 'Kids Wear',
          discount: '25%',
          tags: ['👗 Dress']
        },
        {
          id: 'summer10',
          name: 'Kids Summer Shoes',
          price: 'PK34.99',
          originalPrice: 'PK44.99',
          image: images.babysummershoes,
          rating: 4.5,
          category: 'Footwear',
          discount: '22%',
          tags: ['👟 Shoes']
        },
        {
          id: 'summer11',
          name: 'Baby Summer Outfit',
          price: 'PK24.99',
          originalPrice: 'PK34.99',
          image: images.babyoutfitsummer,
          rating: 4.6,
          category: 'Baby Wear',
          discount: '29%',
          tags: ['👶 Baby']
        },
        {
          id: 'summer12',
          name: 'Kids T-shirt & Shorts',
          price: 'PK19.99',
          originalPrice: 'PK29.99',
          image: images.shorts,
          rating: 4.4,
          category: 'Casual Set',
          discount: '33%',
          tags: ['👕 Casual']
        },
        {
          id: 'summer13',
          name: 'Kids Summer Hat',
          price: 'PK27.99',
          originalPrice: 'PK37.99',
          image: images.babysummerhat,
          rating: 4.5,
          category: 'Accessories',
          discount: '26%',
          tags: ['🧢 Hat']
        },
        {
          id: 'summer14',
          name: 'Children Shoes',
          price: 'PK22.99',
          originalPrice: 'PK32.99',
          image: images.babysummershoes2,
          rating: 4.6,
          category: 'Footwear',
          discount: '30%',
          tags: ['👞 Shoes']
        }
      ]
    }
  };

  const handleProductPress = (product) => {
    navigation.navigate('Productdetails', { product });
  };

  const handleAddToCart = (product) => {
    navigation.navigate('AddToCart', { product, quantity: 1 });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Modern Product Card Component
  const ProductCard = ({ product, collectionType, index }) => {
    const cardScale = useRef(new Animated.Value(1)).current;
    const cardSlide = useRef(new Animated.Value(100)).current;
    const cardFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.sequence([
        Animated.delay(index * 200),
        Animated.parallel([
          Animated.spring(cardScale, {
            toValue: 1,
            tension: 60,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.spring(cardSlide, {
            toValue: 0,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(cardFade, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          })
        ])
      ]).start();
    }, []);

    const handlePressIn = () => {
      Animated.spring(cardScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(cardScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View 
        style={[
          styles.productCardWrapper,
          { 
            transform: [
              { scale: cardScale },
              { translateX: cardSlide }
            ],
            opacity: cardFade
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.productCard}
          onPress={() => handleProductPress(product)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <View style={styles.productImageContainer}>
            <Image source={product.image} style={styles.productImage} />
            
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
              style={styles.imageOverlay}
            />
            
            <View style={styles.tagsContainer}>
              {product.tags.map((tag) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.discountBadge}>
              <LinearGradient
                colors={[colors.secondary, '#3BB4A8']}
                style={styles.discountGradient}
              >
                <Text style={styles.discountText}>{product.discount}</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>
          
          <View style={styles.productInfo}>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            
            <View style={styles.priceContainer}>
              <View>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.originalPrice}>{product.originalPrice}</Text>
              </View>
              <TouchableOpacity 
                style={styles.cartButton}
                onPress={() => handleAddToCart(product)}
              >
                <LinearGradient
                  colors={collections[collectionType].gradient}
                  style={styles.cartButtonGradient}
                >
                  <Ionicons name="add" size={18} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Collection Section Component
  const CollectionSection = ({ type, index }) => {
    const collection = collections[type];
    const sectionSlide = useRef(new Animated.Value(100)).current;
    const sectionFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.spring(sectionSlide, {
          toValue: 0,
          tension: 50,
          friction: 8,
          delay: index * 300,
          useNativeDriver: true,
        }),
        Animated.timing(sectionFade, {
          toValue: 1,
          duration: 800,
          delay: index * 300,
          useNativeDriver: true,
        })
      ]).start();
    }, []);

    return (
      <Animated.View 
        style={[
          styles.collectionSection,
          { 
            transform: [{ translateY: sectionSlide }],
            opacity: sectionFade
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <View style={styles.sectionIcon}>
              <LinearGradient
                colors={collection.gradient}
                style={styles.sectionIconGradient}
              >
                <Text style={styles.sectionIconText}>{collection.icon}</Text>
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.collectionTitle}>{collection.title}</Text>
              <Text style={styles.collectionSubtitle}>{collection.subtitle}</Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsGrid}
        >
          {collection.products.map((product, productIndex) => (
            <ProductCard 
              key={product.id}
              product={product}
              collectionType={type}
              index={productIndex}
            />
          ))}
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background Animations */}
      <View style={styles.backgroundContainer}>
        {/* Gradient Background */}
        <LinearGradient
          colors={['rgba(255, 214, 102, 0.1)', 'rgba(78, 205, 196, 0.08)', 'rgba(255, 107, 139, 0.05)']}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Falling Leaves */}
        {leafPositions.map((anim, index) => (
          <FallingLeaf
            key={`leaf-PK{index}`}
            size={15 + (index % 3) * 3}
            left={`PK{5 + index * 9}%`}
            anim={anim}
            index={index}
          />
        ))}
        
        {/* Falling Flowers */}
        {flowerPositions.map((anim, index) => (
          <FallingFlower
            key={`flower-PK{index}`}
            size={20 + (index % 2) * 4}
            left={`PK{8 + index * 15}%`}
            anim={anim}
            index={index}
          />
        ))}
        
        {/* Confetti */}
        {confettiPositions.map((anim, index) => (
          <ConfettiPiece
            key={`confetti-PK{index}`}
            size={6 + (index % 2)}
            left={`PK{12 + index * 13}%`}
            anim={anim}
            index={index}
          />
        ))}
        
        {/* Water Drops */}
        {waterDropPositions.map((anim, index) => (
          <WaterDrop
            key={`waterdrop-PK{index}`}
            size={3 + (index % 2)}
            left={`PK{18 + index * 15}%`}
            anim={anim}
            index={index}
          />
        ))}
        
        {/* Sparkles */}
        <Sparkle size={12} left="10%" top="20%" />
        <Sparkle size={8} left="30%" top="40%" />
        <Sparkle size={10} left="50%" top="60%" />
        <Sparkle size={9} left="70%" top="30%" />
        <Sparkle size={11} left="90%" top="50%" />
      </View>

      {/* Modern Animated Header */}
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }]
          }
        ]}
      >
        <LinearGradient
          colors={['rgba(248,253,255,0.95)', 'rgba(248,253,255,0.98)']}
          style={styles.headerGradient}
        >
          <SafeAreaView>
            <View style={styles.headerContent}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleBackPress}
              >
                <Ionicons name="chevron-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Summer Collection</Text>
              <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="search-outline" size={22} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => navigation.navigate('AddToCart')}
                >
                  <Ionicons name="cart-outline" size={22} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Modern Hero Section */}
        <Animated.View 
          style={[
            styles.heroSection,
            { 
              transform: [
                { translateY: heroTranslateY },
                { scale: heroScale }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryLight, '#FF9EB5']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <SafeAreaView style={styles.heroSafeArea}>
              <Animated.View 
                style={[
                  styles.heroContent,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideAnim },
                      { scale: scaleAnim }
                    ]
                  }
                ]}
              >
                <View style={styles.heroBadge}>
                  <Ionicons name="sunny" size={16} color="white" />
                  <Text style={styles.heroBadgeText}>SUMMER 2024</Text>
                </View>
                
                <Text style={styles.heroTitle}>
                  Summer{'\n'}Collection
                </Text>
                
                <Text style={styles.heroSubtitle}>
                  Discover fresh summer styles crafted for comfort and elegance. 
                  Light fabrics and vibrant designs for the sunny season.
                </Text>
                
                <View style={styles.heroStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {Object.values(collections).reduce((total, collection) => total + collection.products.length, 0)}+
                    </Text>
                    <Text style={styles.statLabel}>Products</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>4.7</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>30%</Text>
                    <Text style={styles.statLabel}>Off</Text>
                  </View>
                </View>
              </Animated.View>
            </SafeAreaView>
          </LinearGradient>
        </Animated.View>

        {/* Collections Sections */}
        <View style={styles.collectionsContainer}>
          <CollectionSection type="pret" index={0} />
          <CollectionSection type="unstitched" index={1} />
          <CollectionSection type="kids" index={2} />
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  backgroundGradient: {
    width: '100%',
    height: '100%',
  },
  fallingItem: {
    position: 'absolute',
    top: 0,
  },
  confettiPiece: {
    position: 'absolute',
    top: 0,
    borderRadius: 2,
  },
  waterDrop: {
    position: 'absolute',
    top: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  waterDropGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  sparkle: {
    position: 'absolute',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
  },
  headerGradient: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 107, 139, 0.1)',
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    marginLeft: 12,
    backgroundColor: 'rgba(255, 107, 139, 0.1)',
    borderRadius: 12,
  },
  heroSection: {
    height: height * 0.6,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGradient: {
    flex: 1,
    position: 'relative',
  },
  heroSafeArea: {
    flex: 1,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    lineHeight: 48,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: 35,
    letterSpacing: 0.3,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.5,
  },
  collectionsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  collectionSection: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  sectionIconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionIconText: {
    fontSize: 20,
  },
  collectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 0.5,
  },
  collectionSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
  },
  productsGrid: {
    paddingHorizontal: 10,
  },
  productCardWrapper: {
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  productCard: {
    width: 280,
    borderRadius: 25,
    backgroundColor: colors.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  productImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  tagsContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  tag: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tagText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
  },
  discountGradient: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 4,
  },
  productInfo: {
    padding: 20,
  },
  productCategory: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 0.5,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.textLight,
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  cartButton: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  cartButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 60,
  },
});

export default SummerScreen;