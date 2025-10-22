import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// ✅ Import Only Required Screens
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import Productdetails from '../screens/Productdetails';
import AddToCart from '../screens/AddToCart';

import WinterScreen from '../screens/WinterScreen';
import SummerScreen from '../screens/SummerScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// -----------------------------
// 🧭 Bottom Tab Navigator
// -----------------------------
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Winter':
              iconName = focused ? 'snow' : 'snow-outline';
              break;
            case 'Summer':
              iconName = focused ? 'sunny' : 'sunny-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Winter" component={WinterScreen} />
      <Tab.Screen name="Summer" component={SummerScreen} />
      <Tab.Screen
        name="Cart"
        component={AddToCart}
        options={{ tabBarBadge: 2 }}
      />
    </Tab.Navigator>
  );
};


// -----------------------------
// 🧭 Main Stack Navigator
// -----------------------------
const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading (splash)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />; // ✅ Show splash first
  }

  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: { backgroundColor: '#ff6600' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        animation: 'slide_from_right',
      }}
    >
      {/* 👇 Tab Navigation (Main part of app) */}
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
  name="SummerScreen"
  component={SummerScreen}
  options={{ title: "Summer Collection" }}
/>


      {/* 👇 Stack Screens */}
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: 'Featured Collections' }}
      />

      <Stack.Screen
        name="Productdetails"
        component={Productdetails}
        options={{
          title: 'Product Details',
          headerStyle: { backgroundColor: '#764ba2' },
        }}
      />
       
       <Stack.Screen
  name="WinterScreen"
  component={WinterScreen}
  options={{ title: 'Winter Collection ❄️' }}
/>

      <Stack.Screen
        name="AddToCart"
        component={AddToCart}
        options={{
          title: '🛒 Your Cart',
          headerStyle: { backgroundColor: '#28a745' },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
