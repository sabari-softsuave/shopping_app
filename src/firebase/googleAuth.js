import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "14533351723-7qrtmo9aedosc6h57oeabvu69o8ht7la.apps.googleusercontent.com",
    webClientId: "14533351723-6th62vgnj22bne5jceos0k8ugka89r52.apps.googleusercontent.com",
  });

  const signInWithGoogle = async () => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      await signInWithCredential(auth, credential);
    }
  };

  return { promptAsync, signInWithGoogle };
}
