import React, { useRef, useEffect, useState } from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Image,
  Animated,
  SafeAreaView,
  StatusBar,
  Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

function DetailsScreen({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Enhanced animations
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -60],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0.8, 1],
    extrapolate: 'clamp'
  });

  const heroScale = scrollY.interpolate({
    inputRange: [-100, 0, 200],
    outputRange: [1.3, 1, 0.9],
    extrapolate: 'clamp'
  });

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 300, 400],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp'
  });

  // Parallax effects
  const parallaxTranslate = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -150],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    // Enhanced entrance animations
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
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      })
    ]).start();

    // Continuous pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Modern product data structure
  const collections = {
    winter: {
      title: "Winter Collection",
      subtitle: "Embrace the Chill in Style",
      icon: "❄️",
      gradient: ['#667eea', '#764ba2', '#4A00E0'],
      products: [
        {
          id: 1,
          name: 'Arctic Premium Jacket',
          price: '$129.99',
          originalPrice: '$159.99',
          image: require('../../assets/winterjacket.jpg'),
          rating: 4.8,
          color: '#667eea',
          category: 'Winter Wear',
          isNew: true,
          discount: '20% OFF',
          tags: ['🔥 Hot', '💎 Premium'],
          features: ['Waterproof', 'Thermal', 'Windproof']
        },
        {
          id: 2,
          name: 'Cashmere Wool Sweater',
          price: '$89.99',
          originalPrice: '$109.99',
          image: require('../../assets/winteroutfit1.jpg'),
          rating: 4.6,
          color: '#764ba2',
          category: 'Sweaters',
          isNew: false,
          discount: '15% OFF',
          tags: ['✨ Luxury'],
          features: ['100% Cashmere', 'Breathable']
        }
      ]
    },
    summer: {
      title: "Summer Collection",
      subtitle: "Radiant Vibes & Sunshine",
      icon: "☀️",
      gradient: ['#FF6B6B', '#FF8E8E', '#FF416C'],
      products: [
        {
          id: 1,
          name: 'Tropical Breeze Dress',
          price: '$79.99',
          originalPrice: '$99.99',
          image: require('../../assets/summerdress.jpg'),
          rating: 4.8,
          color: '#4facfe',
          category: 'Dresses',
          isNew: true,
          discount: '20% OFF',
          tags: ['🌊 Beach', '💫 Elegant'],
          features: ['Lightweight', 'Quick Dry']
        },
        {
          id: 2,
          name: 'Ocean Wave Shirt',
          price: '$49.99',
          originalPrice: '$69.99',
          image: require('../../assets/beech.jpg'),
          rating: 4.6,
          color: '#00f2fe',
          category: 'Tops',
          isNew: false,
          discount: '15% OFF',
          tags: ['🏖️ Casual'],
          features: ['UV Protection', 'Breathable']
        }
      ]
    }
  };

  // Navigation handlers
  const navigateToCollection = (collectionType) => {
    navigation.navigate(`${collectionType.charAt(0).toUpperCase() + collectionType.slice(1)}Screen`, { 
      products: collections[collectionType].products 
    });
  };

  // Animated View All Button Component
  const ViewAllButton = ({ collectionType, colors }) => {
    const buttonAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, []);

    const buttonScale = buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    });

    const buttonOpacity = buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <Animated.View 
        style={[
          styles.viewAllButtonContainer,
          {
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }]
          }
        ]}
      >
        <TouchableOpacity 
          style={[styles.viewAllButton, { backgroundColor: `${colors[0]}15` }]}
          onPress={() => navigateToCollection(collectionType)}
        >
          <LinearGradient
            colors={[`${colors[0]}20`, `${colors[1]}10`]}
            style={styles.viewAllButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.viewAllText, { color: colors[0] }]}>
              View All
            </Text>
            <View style={[styles.arrowCircle, { backgroundColor: colors[0] }]}>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const ProductCard = ({ product, collectionType, index }) => {
    const cardScale = useRef(new Animated.Value(1)).current;
    const cardRotate = useRef(new Animated.Value(0)).current;
    const imageOpacity = useRef(new Animated.Value(0)).current;

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
          Animated.spring(cardRotate, {
            toValue: 1,
            tension: 50,
            friction: 5,
            useNativeDriver: true,
          }),
          Animated.timing(imageOpacity, {
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

    const rotateInterpolate = cardRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['-5deg', '0deg']
    });

    return (
      <Animated.View 
        style={[
          styles.productCardWrapper,
          { 
            transform: [
              { scale: cardScale },
              { rotateY: rotateInterpolate }
            ]
          }
        ]}
      >
        <TouchableOpacity 
          onPress={() => navigation.navigate('Productdetails', { productId: product.id })}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <View style={styles.productCard}>
            {/* Product Image with Enhanced Overlay */}
            <View style={styles.productImageContainer}>
              <Animated.Image 
                source={product.image} 
                style={[
                  styles.productImage,
                  { opacity: imageOpacity }
                ]}
                resizeMode="cover"
              />
              
              {/* Gradient Overlay */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
                style={styles.imageOverlay}
              />
              
              {/* Enhanced Tags */}
<View style={styles.tagsContainer}>
  {product.tags.map((tag, tagIndex) => (
    <View key={`${product.id}-${tag}`} style={styles.tag}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  ))}
</View>
              
              {/* Animated Discount Badge */}
              <Animated.View 
                style={[
                  styles.discountBadge,
                  {
                    transform: [{
                      rotate: scrollY.interpolate({
                        inputRange: [0, 500],
                        outputRange: ['0deg', '10deg'],
                        extrapolate: 'clamp'
                      })
                    }]
                  }
                ]}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#FF8E8E']}
                  style={styles.discountGradient}
                >
                  <Text style={styles.discountText}>{product.discount}</Text>
                </LinearGradient>
              </Animated.View>
              
              {/* Rating and Actions */}
              <View style={styles.productOverlay}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Product Info */}
            <View style={styles.productInfo}>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              
              {/* Features */}
              <View style={styles.featuresContainer}>
                {product.features.slice(0, 2).map((feature, index) => (
                  <View key={index} style={styles.featureTag}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              {/* Price and CTA */}
              <View style={styles.priceRow}>
                <View>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                  )}
                </View>
                <TouchableOpacity 
                  style={styles.addToCartBtn}
                  onPress={() => navigation.navigate('AddToCart', { product })}
                >
                  <LinearGradient
                    colors={collections[collectionType].gradient}
                    style={styles.cartButtonGradient}
                  >
                    <Ionicons name="add" size={20} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const CollectionSection = ({ type, index }) => {
    const collection = collections[type];
    const sectionTranslateX = useRef(new Animated.Value(index === 0 ? -100 : 100)).current;
    const sectionOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.spring(sectionTranslateX, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(sectionOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      ]).start();
    }, []);

    return (
      <Animated.View 
        style={[
          styles.collectionSection,
          { 
            transform: [{ translateX: sectionTranslateX }],
            opacity: sectionOpacity
          }
        ]}
      >
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Animated.View 
              style={[
                styles.sectionIcon,
                {
                  backgroundColor: collection.gradient[0],
                  transform: [{
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-180deg', '0deg']
                    })
                  }]
                }
              ]}
            >
              <Text style={styles.sectionIconText}>{collection.icon}</Text>
            </Animated.View>
            <View>
              <Text style={styles.collectionTitle}>{collection.title}</Text>
              <Text style={styles.collectionSubtitle}>{collection.subtitle}</Text>
            </View>
          </View>
          
          {/* Complete View All Button */}
          <ViewAllButton 
            collectionType={type} 
            colors={collection.gradient} 
          />
        </View>

        {/* Products Grid */}
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
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Modern Hero Section with 3D Effect */}
        <Animated.View 
          style={[
            styles.heroSection, 
            { 
              transform: [
                { scale: heroScale },
                { translateY: parallaxTranslate }
              ],
              opacity: heroOpacity
            }
          ]}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2', '#4A00E0']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Animated Background Elements */}
            <Animated.View 
              style={[
                styles.floatingOrb, 
                styles.orb1,
                {
                  transform: [{
                    translateY: scrollY.interpolate({
                      inputRange: [0, 500],
                      outputRange: [0, -100],
                      extrapolate: 'clamp'
                    })
                  }]
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.floatingOrb, 
                styles.orb2,
                {
                  transform: [{
                    translateY: scrollY.interpolate({
                      inputRange: [0, 500],
                      outputRange: [0, 50],
                      extrapolate: 'clamp'
                    })
                  }]
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.floatingOrb, 
                styles.orb3,
                {
                  transform: [{
                    translateY: scrollY.interpolate({
                      inputRange: [0, 500],
                      outputRange: [0, -50],
                      extrapolate: 'clamp'
                    })
                  }]
                }
              ]} 
            />
            
            <SafeAreaView style={styles.heroSafeArea}>
              <Animated.View 
                style={[
                  styles.heroContent,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                {/* Animated Badge */}
                <Animated.View 
                  style={[
                    styles.heroBadge,
                    {
                      transform: [{
                        rotate: rotateAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['-10deg', '0deg']
                        })
                      }]
                    }
                  ]}
                >
                  <Text style={styles.heroBadgeText}>✨ NEW ARRIVALS 2024</Text>
                </Animated.View>
                
                <Text style={styles.heroTitle}>
                  Elevate Your{'\n'}Style Game
                </Text>
                <Text style={styles.heroSubtitle}>
                  Discover exclusive collections crafted for the modern trendsetter
                </Text>
                
                {/* Animated CTA Button */}
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <TouchableOpacity 
                    style={styles.heroButton}
                    onPress={() => navigation.navigate('WinterScreen')}
                  >
                    <LinearGradient
                      colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                      style={styles.heroButtonGradient}
                    >
                      <Text style={styles.heroButtonText}>Explore Collections</Text>
                      <Ionicons name="arrow-forward" size={18} color="white" />
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            </SafeAreaView>
          </LinearGradient>
        </Animated.View>

        {/* Collections Sections */}
        <View style={styles.collectionsContainer}>
          <CollectionSection type="winter" index={0} />
          <CollectionSection type="summer" index={1} />
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Enhanced Glass Morphism Header */}
      <Animated.View style={[
        styles.header, 
        { 
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }]
        }
      ]}>
        <LinearGradient
          colors={['rgba(248,250,252,0.95)', 'rgba(248,250,252,0.98)']}
          style={styles.headerGradient}
        >
          <SafeAreaView>
            <View style={styles.headerContent}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={24} color="#334155" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Collections</Text>
              <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="search-outline" size={22} color="#334155" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => navigation.navigate('AddToCart')}
                >
                  <Ionicons name="cart-outline" size={22} color="#334155" />
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>3</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Light blue-gray background
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
    backgroundColor: 'rgba(51,65,85,0.1)',
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    marginLeft: 12,
    position: 'relative',
    backgroundColor: 'rgba(51,65,85,0.1)',
    borderRadius: 12,
  },
  cartBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroSection: {
    height: height * 0.65,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    marginBottom: 30,
    marginTop: 0,
  },
  heroGradient: {
    flex: 1,
    position: 'relative',
  },
  heroSafeArea: {
    flex: 1,
    paddingTop: 60,
  },
  heroContent: {
    flex: 1,
    padding: 35,
    justifyContent: 'center',
    zIndex: 2,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
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
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
    marginBottom: 35,
    letterSpacing: 0.3,
  },
  heroButton: {
    alignSelf: 'flex-start',
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  heroButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 30,
  },
  heroButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
    letterSpacing: 0.5,
  },
  floatingOrb: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  orb1: {
    top: -100,
    right: -50,
    width: 300,
    height: 300,
  },
  orb2: {
    bottom: -80,
    left: -40,
    width: 200,
    height: 200,
  },
  orb3: {
    top: '40%',
    right: '30%',
    width: 120,
    height: 120,
  },
  collectionsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  collectionSection: {
    marginBottom: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  sectionIconText: {
    fontSize: 20,
    color: 'white',
  },
  collectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#334155',
    letterSpacing: 0.5,
  },
  collectionSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  // Complete View All Button Styles
  viewAllButtonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  viewAllButton: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  viewAllButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  viewAllText: {
    fontWeight: '600',
    fontSize: 14,
    marginRight: 10,
    letterSpacing: 0.3,
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
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
  productOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
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
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  productInfo: {
    padding: 20,
  },
  productCategory: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  featuresContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  featureTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  featureText: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
    letterSpacing: 0.5,
  },
  originalPrice: {
    fontSize: 14,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  addToCartBtn: {
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

export default DetailsScreen;   