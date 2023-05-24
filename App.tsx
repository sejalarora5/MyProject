import React from 'react';
import LandingScreen from './app/screens/LandingScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './app/screens/HomeScreen';
import SettingScreen from './app/screens/SettingScreen';
import WebViewScreen from './app/screens/WebViewScreen';
import SplashScreen from './app/screens/SplashScreen';
import WishlistScreen from './app/screens/WishlistScreen';
import SearchScreen from './app/screens/SearchScreen';
import CartScreen from './app/screens/CartScreen';

export type RootStackParamList = {
  First: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Search: undefined;
  Splash: undefined;
  Settings: undefined;
  Webview: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Tab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();


function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: () => <Ionicons name="search" size={35} color="black" />,
        }}></Tab.Screen>

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: () => <Ionicons name="home" color="black" size={35} />,
        }}></Tab.Screen>
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: 'Wishlist',
          tabBarIcon: () => <Ionicons name="heart" size={35} color="black" />,
        }}></Tab.Screen>

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: () => <Ionicons name="cart" size={35} color="black" />,
        }}></Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: 'Settings',
          tabBarIcon: () => (
            <Ionicons name="settings" size={35} color="black" />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          options={{title: 'Splash Screen', headerShown: false}}
          component={SplashScreen}
        />
        <Stack.Screen
          name="First"
          options={{title: 'Landing Screen', headerShown: false}}
          component={LandingScreen}
        />
        <Stack.Screen
          name="Login"
          options={{title: 'Login Screen'}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Tab"
          options={{title: 'Tab', headerShown: false}}
          component={TabNav}
        />
        <Stack.Screen
          name="Signup"
          options={{title: 'SignUp Screen'}}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Webview"
          options={{title: 'Webview Screen'}}
          component={WebViewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
