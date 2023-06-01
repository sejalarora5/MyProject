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

export type RootStackParamList = {
  First: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Search: {item: any};
  Splash: undefined;
  Settings: undefined;
  Webview: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Tab: undefined;
  Product: {item: any};
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
            name="Search"
            component={SearchScreen}
            options={{
              // tabBarIcon: () => (
              //   // <Ionicons name="search" size={35} color="#FFB4AE" />
              //   <Ionicons name="search" size={35} color="gray" />
              // ),
              tabBarIcon: bar =>
                bar.focused ? (
                  <Ionicons name="search" size={35} color="black" />
                ) : (
                  <Ionicons name="search" size={35} color="gray" />
                ),
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
            }}></Tab.Screen>
          <Tab.Screen
            name="Cart"
            component={CartScreen}
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
        options={{title: 'Home Screen', headerShown: false}}
        component={HomeScreen}></Stack.Screen>
      <Stack.Screen
        name="Product"
        options={{title: 'Product Screen'}}
        component={ProductScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default App;
