import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "14533351723-6th62vgnj22bne5jceos0k8ugka89r52.apps.googleusercontent.com",
    webClientId: "14533351723-6th62vgnj22bne5jceos0k8ugka89r52.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@sabarish-01/Shopping_App",
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .catch((error) => {
          alert("Login Failed: " + error.message);
        });
    } else if (response?.type === 'error') {
      alert("Google Sign-In Error: " + (response.error?.message || "Unknown error"));
    }
  }, [response]);

  return { promptAsync, signInWithGoogle: () => { } };
}
