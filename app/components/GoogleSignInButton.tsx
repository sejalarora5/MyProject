import React, {useEffect} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';

useEffect(() => {
  GoogleSignin.configure({
    webClientId: 'AIzaSyCAOLn9uBvfSZFAQvM5D5aQTQP3NuaiwHg',
  });
}, []);

// const GoogleSignInButton = () => {
  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const {idToken} = await GoogleSignin.signIn();

  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     await auth().signInWithCredential(googleCredential);

  //     console.log('Successfully signed in with Google!');
  //   } catch (error) {
  //     console.error('Google sign-in error:', error);
  //   }
  // };
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
  
      console.log('User signed in with Google!');
      // navigation.navigate('Home');
      // dispatch(setUserLoggedIn());
    } catch (error) {
      if (error === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google sign-in cancelled');
      } else if (error === statusCodes.IN_PROGRESS) {
        console.log('Google sign-in in progress');
      } else if (error === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.error(error);
      }
    }
  };
  

  //   return <Button title="Sign in with Google"  />;
  return (
   
        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={handleGoogleSignIn}
          // disabled={this.state.isSigninInProgress}
        /> */}


        
     
  );
};

export default GoogleSignInButton;
