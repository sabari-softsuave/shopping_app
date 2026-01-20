import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../Screens/OnboardingScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import GetStartedScreen from '../Screens/GetStartedScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CheckoutScreen from '../Screens/CheckoutScreen';
import CheckoutSummaryScreen from '../Screens/CheckoutSummaryScreen';
import ShoppingBagScreen from '../Screens/ShoppingBagScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';
import SettingsScreen from '../Screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Onboarding */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />

        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="CheckoutSummary" component={CheckoutSummaryScreen} />
        <Stack.Screen name="ShoppingBag" component={ShoppingBagScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />

        {/* Main App with Bottom Tab Navigation */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
