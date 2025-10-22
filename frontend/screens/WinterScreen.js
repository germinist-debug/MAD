import React, { useRef, useEffect } from 'react';
import { GlobalStyles } from '../styles/GlobalStyles'; 
import { 
  View, 
  Text,  
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
  winteroutfit: require('../../assets/winteroutfit.jpg'),
  wintersweater: require('../../assets/wintersweater.jpg'),
  winteroutfit1: require('../../assets/winteroutfit1.jpg'),
  winteroutfit2: require('../../assets/winteroutfit2.jpg'),
  winterunstiched: require('../../assets/winterunstiched.jpg'),
  winterunstiched1: require('../../assets/winterunstiched1.jpg'),
  winterunstiched2: require('../../assets/winterunstiched2.jpg'),
  winterunstiched3: require('../../assets/winterunstiched3.jpg'),
  winterjacket: require('../../assets/winterjacket.jpg'),
  babygloves: require('../../assets/babygloves.jpg'),
  babyhat: require('../../assets/babyhat.jpg'),
  babyoutfit: require('../../assets/babyoutfit.jpg'),
  babyshoes: require('../../assets/babyshoes.jpg'),
  babyshoes2: require('../../assets/babyshoes2.jpg'),
  babysweater: require('../../assets/babysweater.jpg'),
};

// Modern Color Palette
const colors = {
  primary: '#8B5FBF',       // Modern Purple
  primaryLight: '#9D77CC',  // Light Purple
  primaryDark: '#7A4BA6',   // Dark Purple
  secondary: '#FF6B8B',     // Pink Accent
  accent: '#4ECDC4',        // Teal Accent
  background: '#F8F9FF',    // Light Blue-White
  card: '#FFFFFF',          // White Cards
  text: '#2D3748',          // Dark Gray
  textLight: '#718096',     // Medium Gray
  border: '#E2E8F0',        // Light Border
  success: '#48BB78',       // Green
};

const WinterScreen = ({ route, navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const morphAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;

  const { products } = route.params || {};

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

  // Morph animation for hero elements
  const morphInterpolate = morphAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '5deg', '0deg']
  });

  // Wave animation
  const waveInterpolate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  // Glow animation
  const glowInterpolate = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
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
      Animated.loop(
        Animated.sequence([
          Animated.timing(morphAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(morphAnim, {
            toValue: 0,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(particleAnim, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(particleAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  // Modern product data structure
  const collections = {
    pret: {
      title: "Pret Collection",
      subtitle: "Ready-to-wear elegance",
      gradient: ['#667eea', '#764ba2'],
      products: [
        {
          id: 1,
          name: 'Elegant Winter Set',
          price: 'PK89.99',
          originalPrice: 'PK119.99',
          image: images.winteroutfit,
          rating: 4.8,
          category: 'Premium Outfit',
          discount: '25%',
          tags: ['🔥 Hot', '💎 Premium']
        },
        {
          id: 2,
          name: 'Designer Collection',
          price: 'PK94.99',
          originalPrice: 'PK124.99',
          image: images.winteroutfit1,
          rating: 4.9,
          category: 'Luxury Wear',
          discount: '24%',
          tags: ['✨ Luxury']
        },
        {
          id: 3,
          name: 'Winter Premium Set',
          price: 'PK79.99',
          originalPrice: 'PK99.99',
          image: images.winteroutfit2,
          rating: 4.7,
          category: 'Casual Elegance',
          discount: '20%',
          tags: ['🆕 New']
        }
      ]
    },
    unstitched: {
      title: "Unstitched Collection",
      subtitle: "Custom tailoring fabric",
      gradient: ['#4ECDC4', '#44A08D'],
      products: [
        {
          id: 1,
          name: 'Winter Fabric',
          price: 'PK45.99',
          originalPrice: 'PK59.99',
          image: images.winterunstiched,
          rating: 4.6,
          category: 'Premium Material',
          discount: '23%',
          tags: ['🧵 Custom']
        },
        {
          id: 2,
          name: 'Luxury Material',
          price: 'PK39.99',
          originalPrice: 'PK49.99',
          image: images.winterunstiched1,
          rating: 4.5,
          category: 'Designer Fabric',
          discount: '20%',
          tags: ['💫 Premium']
        },
        {
          id: 3,
          name: 'Premium Fabric',
          price: 'PK52.99',
          originalPrice: 'PK69.99',
          image: images.winterunstiched2,
          rating: 4.7,
          category: 'Luxury Textile',
          discount: '24%',
          tags: ['🌟 Exclusive']
        },
        {
          id: 4,
          name: 'Designer Material',
          price: 'PK48.99',
          originalPrice: 'PK64.99',
          image: images.winterunstiched3,
          rating: 4.6,
          category: 'Custom Fabric',
          discount: '25%',
          tags: ['🎨 Design']
        }
      ]
    },
    kids: {
      title: "Kids Collection",
      subtitle: "Adorable winter wear",
      gradient: ['#FF6B8B', '#FF8E53'],
      products: [
        {
          id: 1,
          name: 'Baby Winter Outfit',
          price: 'PK49.99',
          originalPrice: 'PK69.99',
          image: images.babyoutfit,
          rating: 4.7,
          category: 'Kids Wear',
          discount: '29%',
          tags: ['👶 Kids', '🔥 Hot']
        },
        {
          id: 2,
          name: 'Baby Wool Sweater',
          price: 'PK34.99',
          originalPrice: 'PK44.99',
          image: images.babysweater,
          rating: 4.5,
          category: 'Kids Sweaters',
          discount: '22%',
          tags: ['✨ Cozy']
        },
        {
          id: 3,
          name: 'Baby Winter Shoes',
          price: 'PK29.99',
          originalPrice: 'PK39.99',
          image: images.babyshoes,
          rating: 4.8,
          category: 'Kids Shoes',
          discount: '25%',
          tags: ['👟 Comfort']
        },
        {
          id: 4,
          name: 'Baby Winter Gloves',
          price: 'PK19.99',
          originalPrice: 'PK24.99',
          image: images.babygloves,
          rating: 4.6,
          category: 'Accessories',
          discount: '20%',
          tags: ['🧤 Warm']
        },
        {
          id: 5,
          name: 'Baby Winter Hat',
          price: 'PK16.99',
          originalPrice: 'PK21.99',
          image: images.babyhat,
          rating: 4.6,
          category: 'Accessories',
          discount: '23%',
          tags: ['🎩 Style']
        },
        {
          id: 6,
          name: 'Premium Baby Shoes',
          price: 'PK39.99',
          originalPrice: 'PK49.99',
          image: images.babyshoes2,
          rating: 4.7,
          category: 'Kids Shoes',
          discount: '20%',
          tags: ['💫 Premium']
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

  // Local styles for this screen
  const localStyles = {
    specialText: {
      color: 'purple',
      fontStyle: 'italic',
    },
    highlightedCard: {
      backgroundColor: '#fffacd',
      borderColor: '#ffd700',
      borderWidth: 2,
    },
    winterSpecial: {
      backgroundColor: '#e6f7ff',
      borderLeftColor: '#1890ff',
      borderLeftWidth: 4,
    }
  };

  // Morphing Particle Component
  const MorphingParticle = ({ size, left, top, delay, color }) => {
    const morphAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(morphAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(morphAnim, {
            toValue: 0,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    const scale = morphAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.5, 1]
    });

    const borderRadius = morphAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [size / 2, size / 4, size / 2]
    });

    const opacity = morphAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.8, 0.3]
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          left,
          top,
          backgroundColor: color,
          transform: [{ scale }],
          borderRadius,
          opacity,
        }}
      />
    );
  };

  // Wave Animation Component
  const WaveAnimation = () => {
    return (
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        overflow: 'hidden',
      }}>
        <Animated.View 
          style={{
            position: 'absolute',
            bottom: 0,
            width: '200%',
            height: 40,
            backgroundColor: 'rgba(102, 126, 234, 0.05)',
            borderRadius: 20,
            left: waveInterpolate
          }} 
        />
      </View>
    );
  };

  // Glowing Text Component
  const GlowingText = ({ children, style }) => {
    const glowOpacity = glowAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.3, 0]
    });

    return (
      <View style={{ position: 'relative' }}>
        <Animated.Text style={[style, { opacity: glowOpacity }]}>
          {children}
        </Animated.Text>
        <Text style={style}>
          {children}
        </Text>
      </View>
    );
  };

  // Modern Product Card Component with New Animations
  const ProductCard = ({ product, collectionType, index }) => {
    const cardScale = useRef(new Animated.Value(1)).current;
    const cardMorph = useRef(new Animated.Value(0)).current;

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
          Animated.timing(cardMorph, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.cubic),
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

    const cardTranslateY = cardMorph.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0]
    });

    const cardOpacity = cardMorph.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Animated.View 
        style={{
          marginRight: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 10,
          transform: [
            { scale: cardScale },
            { translateY: cardTranslateY }
          ],
          opacity: cardOpacity
        }}
      >
        <TouchableOpacity 
          style={{
            width: 280,
            borderRadius: 25,
            backgroundColor: colors.card,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.05)',
          }}
          onPress={() => handleProductPress(product)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <View style={{
            width: '100%',
            height: 200,
            position: 'relative',
          }}>
            <Image source={product.image} style={{
              width: '100%',
              height: '100%',
            }} />
            
            {/* Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 100,
              }}
            />
            
            {/* Tags */}
            <View style={{
              position: 'absolute',
              top: 15,
              left: 15,
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
              {product.tags.map((tag, index) => (
                <View key={index} style={{
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 10,
                    fontWeight: '600',
                    letterSpacing: 0.5,
                  }}>{tag}</Text>
                </View>
              ))}
            </View>
            
            {/* Morphing Discount Badge */}
            <Animated.View 
              style={{
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
                transform: [{
                  rotate: morphInterpolate
                }]
              }}
            >
              <LinearGradient
                colors={[colors.secondary, '#FF8E8E']}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  borderRadius: 15,
                }}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                  letterSpacing: 0.5,
                }}>{product.discount}</Text>
              </LinearGradient>
            </Animated.View>
            
            {/* Rating */}
            <View style={{
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
            }}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'white',
                marginLeft: 4,
              }}>{product.rating}</Text>
            </View>
          </View>
          
          <View style={{
            padding: 20,
          }}>
            <Text style={{
              fontSize: 12,
              color: colors.textLight,
              marginBottom: 6,
              fontWeight: '500',
              letterSpacing: 0.5,
            }}>{product.category}</Text>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.text,
              marginBottom: 12,
              lineHeight: 24,
              letterSpacing: 0.3,
            }}>{product.name}</Text>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.text,
                  letterSpacing: 0.5,
                }}>{product.price}</Text>
                <Text style={{
                  fontSize: 14,
                  color: colors.textLight,
                  textDecorationLine: 'line-through',
                  marginTop: 2,
                }}>{product.originalPrice}</Text>
              </View>
              <TouchableOpacity 
                style={{
                  borderRadius: 15,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.2,
                  shadowRadius: 15,
                  elevation: 10,
                }}
                onPress={() => handleAddToCart(product)}
              >
                <LinearGradient
                  colors={collections[collectionType].gradient}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
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

  // Collection Section Component with New Animations
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
        style={{
          marginBottom: 50,
          transform: [{ translateY: sectionSlide }],
          opacity: sectionFade
        }}
      >
        {/* Section Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 25,
          paddingHorizontal: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Animated.View 
              style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                marginRight: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 15,
                transform: [{
                  rotate: morphInterpolate
                }]
              }}
            >
              <LinearGradient
                colors={collection.gradient}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  {type === 'pret' ? '👗' : type === 'unstitched' ? '🧵' : '👶'}
                </Text>
              </LinearGradient>
            </Animated.View>
            <View>
              <GlowingText style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: colors.text,
                letterSpacing: 0.5,
              }}>
                {collection.title}
              </GlowingText>
              <Text style={{
                fontSize: 16,
                color: colors.textLight,
                marginTop: 4,
              }}>{collection.subtitle}</Text>
            </View>
          </View>
        </View>

        {/* Products Grid */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
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
    <View style={[GlobalStyles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Modern Animated Header */}
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }]
        }}
      >
        {/* Style Merging Example */}
        <Text style={[GlobalStyles.titleText, localStyles.specialText]}>
          ❄️ Special Winter Deal! ❄️
        </Text>

        <View style={[GlobalStyles.card, localStyles.highlightedCard]}>
          <Text style={GlobalStyles.subtitleText}>Winter Boots - $79</Text>
          <Text style={GlobalStyles.normalText}>Waterproof and warm</Text>
        </View>

        <LinearGradient
          colors={['rgba(248,249,255,0.95)', 'rgba(248,249,255,0.98)']}
          style={{
            paddingHorizontal: 25,
            paddingVertical: 15,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <SafeAreaView>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <TouchableOpacity 
                style={{
                  padding: 8,
                  backgroundColor: 'rgba(51,65,85,0.1)',
                  borderRadius: 12,
                }}
                onPress={handleBackPress}
              >
                <Ionicons name="chevron-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={{
                fontSize: 18,
                fontWeight: '700',
                color: colors.text,
                letterSpacing: 0.5,
              }}>Winter Collection</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <TouchableOpacity style={{
                  padding: 10,
                  marginLeft: 12,
                  backgroundColor: 'rgba(51,65,85,0.1)',
                  borderRadius: 12,
                }}>
                  <Ionicons name="search-outline" size={22} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{
                    padding: 10,
                    marginLeft: 12,
                    backgroundColor: 'rgba(51,65,85,0.1)',
                    borderRadius: 12,
                  }}
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
        {/* Modern Hero Section with New Animations */}
        <Animated.View 
          style={{
            height: height * 0.65,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: 'hidden',
            marginBottom: 30,
            transform: [
              { translateY: heroTranslateY },
              { scale: heroScale }
            ]
          }}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryLight, '#AD8BDB']}
            style={{
              flex: 1,
              position: 'relative',
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Morphing Particles */}
            <MorphingParticle size={8} left="20%" top="30%" delay={0} color="rgba(255,255,255,0.6)" />
            <MorphingParticle size={12} left="70%" top="20%" delay={1000} color="rgba(255,255,255,0.4)" />
            <MorphingParticle size={6} left="40%" top="60%" delay={500} color="rgba(255,255,255,0.5)" />
            <MorphingParticle size={10} left="80%" top="70%" delay={1500} color="rgba(255,255,255,0.3)" />

            {/* Wave Animation */}
            <WaveAnimation />

            <SafeAreaView style={{
              flex: 1,
              paddingTop: 60,
            }}>
              <Animated.View 
                style={{
                  flex: 1,
                  padding: 35,
                  justifyContent: 'center',
                  zIndex: 2,
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim }
                  ]
                }}
              >
                <Animated.View 
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 25,
                    alignSelf: 'flex-start',
                    marginBottom: 25,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.3)',
                    transform: [{
                      rotate: morphInterpolate
                    }]
                  }}
                >
                  <Ionicons name="snow" size={16} color="white" />
                  <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: '700',
                    letterSpacing: 1.5,
                  }}>WINTER 2024</Text>
                </Animated.View>
                
                <GlowingText style={{
                  fontSize: 42,
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: 15,
                  lineHeight: 48,
                  letterSpacing: -0.5,
                }}>
                  Winter{'\n'}Collection
                </GlowingText>
                
                <Text style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 22,
                  marginBottom: 35,
                  letterSpacing: 0.3,
                }}>
                  Discover premium winter wear crafted for style and comfort. 
                  Exclusive collections for the whole family.
                </Text>
                
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                  <View style={{
                    alignItems: 'center',
                    flex: 1,
                  }}>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: 5,
                    }}>
                      {Object.values(collections).reduce((total, collection) => total + collection.products.length, 0)}+
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.8)',
                      letterSpacing: 0.5,
                    }}>Products</Text>
                  </View>
                  <View style={{
                    alignItems: 'center',
                    flex: 1,
                  }}>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: 5,
                    }}>4.8</Text>
                    <Text style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.8)',
                      letterSpacing: 0.5,
                    }}>Rating</Text>
                  </View>
                  <View style={{
                    alignItems: 'center',
                    flex: 1,
                  }}>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: 5,
                    }}>25%</Text>
                    <Text style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.8)',
                      letterSpacing: 0.5,
                    }}>Off</Text>
                  </View>
                </View>
              </Animated.View>
            </SafeAreaView>
            
            {/* Background Elements */}
            <View style={{
              position: 'absolute',
              top: -100,
              right: -50,
              width: 300,
              height: 300,
              borderRadius: 1000,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }} />
            <View style={{
              position: 'absolute',
              bottom: -80,
              left: -40,
              width: 200,
              height: 200,
              borderRadius: 1000,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }} />
          </LinearGradient>
        </Animated.View>

        {/* Collections Sections */}
        <View style={{
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
          <CollectionSection type="pret" index={0} />
          <CollectionSection type="unstitched" index={1} />
          <CollectionSection type="kids" index={2} />
        </View>

        {/* Bottom Spacer */}
        <View style={{
          height: 60,
        }} />
      </ScrollView>
    </View>
  );
};

export default WinterScreen;