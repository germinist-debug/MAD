import React, { useRef, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, 
  Dimensions, SafeAreaView, Animated, Easing 
} from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// ✅ Safe color theme
const colors = {
  primary: '#8B5FBF',
  primaryLight: '#9D77CC',
  secondary: '#FF6B8B',
  accent: '#4ECDC4',
  background: '#F8F9FF',
  card: '#FFFFFF',
  text: '#4A4B5A',
  textLight: '#7A7B8A',
  border: '#E8EAFF',
  backgroundAccent: '#F0F2FF',
  ctaGradient: ['#8B5FBF', '#9D77CC'], // ✅ Valid hex colors
};

const HomeScreen = ({ navigation }) => {
  // Animations
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Scroll header animation
  const headerBackground = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(248,249,255,0)', 'rgba(248,249,255,0.98)'],
    extrapolate: 'clamp'
  });

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -100],
    extrapolate: 'clamp'
  });

  // Navigation
  const navigateToClothes = () => navigation.navigate('DetailsScreen');
  const navigateToProducts = () => navigation.navigate('Productdetails');

  // Intro animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: 0, duration: 2000, easing: Easing.linear, useNativeDriver: true }),
        ])
      ),
    ]).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Floating particle animation
  const FloatingParticle = ({ size, left, top, delay = 0 }) => {
    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(floatAnim, { toValue: 1, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
    }, []);

    const translateY = floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          borderRadius: 50,
          width: size,
          height: size,
          left,
          top,
          backgroundColor: colors.primary + '20',
          transform: [{ translateY }],
        }}
      />
    );
  };

  return (
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: colors.background }]}>
      {/* Animated Header */}
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: headerBackground
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="diamond" size={28} color={colors.primary} />
            <Text style={[GlobalStyles.titleText, { color: colors.text, marginLeft: 10 }]}>StyleHub</Text>
          </View>
          <TouchableOpacity style={{ padding: 8 }}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Scroll Content - FIXED SCROLL */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ 
          padding: 16, 
          flexGrow: 1  // ✅ CHANGED THIS LINE - FIXES SCROLLING
        }}
      >

        {/* Hero Section */}
        <Animated.View style={{
          height: height * 0.7,
          marginBottom: 30,
          transform: [{ translateY: heroTranslateY }]
        }}>
          <LinearGradient
            colors={[colors.primary, colors.primaryLight, '#AD8BDB']}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Floating particles */}
            <FloatingParticle size={8} left="20%" top="30%" delay={0} />
            <FloatingParticle size={12} left="70%" top="20%" delay={1000} />
            <FloatingParticle size={6} left="40%" top="60%" delay={500} />
            <FloatingParticle size={10} left="80%" top="70%" delay={1500} />

            {/* Animated Text + Button */}
            <Animated.View
              style={{
                paddingHorizontal: 30,
                alignItems: 'center',
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              }}
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.2)',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)'
              }}>
                <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                  <Ionicons name="sparkles" size={16} color="#FFFFFF" />
                </Animated.View>
                <Text style={[GlobalStyles.normalText, { color: '#FFFFFF', marginLeft: 8, fontWeight: 'bold' }]}>
                  NEW COLLECTION 2024
                </Text>
              </View>

              <Text style={[GlobalStyles.titleText, { color: '#FFFFFF', textAlign: 'center', marginBottom: 15 }]}>
                Elevate Your{'\n'}
                <Text style={{ color: '#FFFFFF' }}>Style Game</Text>
              </Text>

              <Text style={[GlobalStyles.normalText, { color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 30 }]}>
                Discover curated fashion pieces that tell your story.
                Premium quality meets exceptional style.
              </Text>

              {/* ✅ Fixed gradient colors */}
              <TouchableOpacity style={{
                borderRadius: 25,
                overflow: 'hidden',
                marginTop: 20,
              }} onPress={navigateToClothes} activeOpacity={0.9}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.2)']}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 30,
                    paddingVertical: 15,
                    borderRadius: 25,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[GlobalStyles.buttonText, { color: '#FFFFFF', marginRight: 10 }]}>
                    Explore Collection
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </Animated.View>

        {/* Final Call-To-Action Section */}
        <LinearGradient
          colors={colors.ctaGradient}
          style={{
            marginHorizontal: 20,
            marginVertical: 30,
            borderRadius: 25,
            padding: 30,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={[GlobalStyles.titleText, { color: '#FFFFFF', textAlign: 'center', marginBottom: 15 }]}>
              Ready to Transform Your Style?
            </Text>
            <Text style={[GlobalStyles.normalText, { color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 25 }]}>
              Join thousands of fashion enthusiasts and discover your perfect look
              with our exclusive professional collections.
            </Text>

            <View style={{ width: '100%' }}>
              {/* ✅ Fixed gradient colors */}
              <TouchableOpacity style={{
                borderRadius: 20,
                overflow: 'hidden',
                marginBottom: 12,
              }} onPress={navigateToClothes} activeOpacity={0.9}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.2)']}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                    borderRadius: 20,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[GlobalStyles.buttonText, { color: '#FFFFFF', marginRight: 10 }]}>
                    Browse Clothing
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.4)',
                  alignItems: 'center',
                }}
                onPress={navigateToProducts}
                activeOpacity={0.9}
              >
                <Text style={[GlobalStyles.buttonText, { color: '#FFFFFF' }]}>
                  View All Products
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;