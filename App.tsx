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
import {useSelector} from 'react-redux';
import {AuthState} from './redux/reducers/authReducer';
import ProductScreen from './app/screens/ProductScreen';
import CheckoutScreen from './app/screens/CheckoutScreen';

export type RootStackParamList = {
  First: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  // Main: undefined;
  Language: undefined;
  Splash: undefined;
  Settings: undefined;
  Webview: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Tab: undefined;
  Product: {item: any};
  Checkout: {totalItems: number; totalPrice: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function App(): JSX.Element {
  const loggedIn = useSelector<AuthState>(state => state.auth.loggedIn);
  const cart = useSelector(state => state.cart.cart);
  const wishlist = useSelector(state => state.wishlist.wishlist);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator
          screenOptions={{
            // tabBarActiveBackgroundColor: 'black',
            tabBarActiveTintColor: 'black',
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'relative',
              borderTopColor: 'gray',
              borderTopWidth: 1,
            },
            tabBarHideOnKeyboard: true,
          }}
          initialRouteName="Home">
          <Tab.Screen
            name="Language"
            component={SearchScreen}
            options={{
              tabBarIcon: bar =>
                bar.focused ? (
                  <Ionicons
                    name="reorder-four-outline"
                    size={35}
                    color="black"
                  />
                ) : (
                  <Ionicons
                    name="reorder-four-outline"
                    size={35}
                    color="gray"
                  />
                ),
              headerShown: false,
            }}></Tab.Screen>
          <Tab.Screen
            name="Wishlist"
            component={WishlistScreen}
            options={{
              title: 'Wishlist',
              tabBarLabel: '',
              tabBarIcon: bar =>
                bar.focused ? (
                  <Ionicons name="heart" size={35} color="black" />
                ) : (
                  <Ionicons name="heart" size={35} color="gray" />
                ),
              tabBarBadgeStyle: {backgroundColor: 'red'},
              tabBarBadge:
                wishlist.length > 0 ? wishlist.length.toString() : null,
            }}></Tab.Screen>
          <Tab.Screen
            name="Home"
            component={HomeFunc}
            options={{
              title: 'Home',
              tabBarLabel: '',
              tabBarIcon: bar =>
                bar.focused ? (
                  <Ionicons name="home" size={35} color="black" />
                ) : (
                  <Ionicons name="home" size={35} color="gray" />
                ),
              headerShown: false,
            }}></Tab.Screen>
          <Tab.Screen
            name="Cart"
            component={CartFunc}
            options={{
              title: 'Cart',
              tabBarLabel: '',
              tabBarBadgeStyle: {backgroundColor: 'red'},
              tabBarIcon: bar =>
                bar.focused ? (
                  <Ionicons name="cart" size={35} color="black" />
                ) : (
                  <Ionicons name="cart" size={35} color="gray" />
                ),
              headerShown: false,
              tabBarBadge: cart.length > 0 ? cart.length.toString() : null,
            }}></Tab.Screen>
          <Tab.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              title: 'Settings',
              tabBarLabel: '',
              tabBarIcon: bar =>
                bar.focused ? (
                  <Ionicons name="settings" size={35} color="black" />
                ) : (
                  <Ionicons name="settings" size={35} color="gray" />
                ),
            }}></Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerBlurEffect: 'extraLight',
            headerShadowVisible: true,
            headerStyle: {backgroundColor: 'black'},
            headerTintColor: 'white',
            statusBarAnimation: 'slide',
          }}>
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
            name="Signup"
            options={{title: 'SignUp Screen'}}
            component={SignUpScreen}
          />
        </Stack.Navigator>
      )}
      <Stack.Screen
        name="Webview"
        options={{title: 'Webview Screen'}}
        component={WebViewScreen}
      />
    </NavigationContainer>
  );
}
const HomeFunc = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{title: 'Home Screen'}}
        component={HomeScreen}></Stack.Screen>
      <Stack.Screen
        name="Product"
        options={{title: 'Product Screen'}}
        component={ProductScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
const CartFunc = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        options={{title: 'Cart Screen'}}
        component={CartScreen}></Stack.Screen>
      <Stack.Screen
        name="Checkout"
        options={{title: 'Checkout Screen'}}
        component={CheckoutScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default App;
