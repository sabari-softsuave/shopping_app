import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import HomeScreen from '../Screens/HomeScreen';
import WishlistScreen from '../Screens/WishlistScreen';
import CartScreen from '../Screens/CartScreen';
import SearchScreen from '../Screens/SearchScreen';
import SettingsScreen from '../Screens/SettingsScreen';

const Tab = createBottomTabNavigator();

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarBackground}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              preventDefault: false,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          if (route.name === 'Cart') {
            return (
              <View
                key={route.key}
                style={styles.cartTabSlot}
              >
                <TouchableOpacity
                  onPress={onPress}
                  style={[
                    styles.cartButton,
                    {
                      backgroundColor: isFocused ? '#F83758' : '#FFFFFF',
                      borderColor: isFocused ? '#F83758' : '#E0E0E0',
                    },
                  ]}
                >
                  <Ionicons
                    name="cart-outline"
                    size={24}
                    color={isFocused ? '#FFFFFF' : '#000000'}
                  />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <View key={route.key} style={styles.tabSlot}>
              <TouchableOpacity
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={
                    route.name === 'HomeTab'
                      ? 'home-outline'
                      : route.name === 'Wishlist'
                      ? 'heart-outline'
                      : route.name === 'Search'
                      ? 'search-outline'
                      : 'settings-outline'
                  }
                  size={24}
                  color={isFocused ? '#F83758' : 'black'}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isFocused ? '#F83758' : 'black',
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Wishlist',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingLeft:10,
    paddingRight:10,
    paddingTop: -15,
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarBackground: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopColor: '#E7E7EB',
    borderTopWidth: 1,
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  tabSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  cartTabSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    position: 'absolute',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default BottomTabNavigator;
