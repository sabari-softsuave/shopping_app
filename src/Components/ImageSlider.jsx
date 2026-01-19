import React, { useState, useRef } from 'react';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import PaginationDots from './PaginationDots';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const images = [
    require('../../assets/HomePage/slider1.jpg'),
    require('../../assets/HomePage/shopping_img2.png'),
    require('../../assets/HomePage/shopping_img3.png'),    
];

export default function ImageSlider() {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ marginBottom: 12,}}
      >
        {images.map((img, index) => (
          <View key={index} style={styles.slide}>
            <Image source={img} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.discountText}>40-50% OFF</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Shop Now</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <PaginationDots total={images.length} current={currentIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  slide: {
    width: width,
    alignItems: 'center',
  },
  image: {
    width: 370,
    height: 190,
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 170,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: { 
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    borderWidth:1,
    borderColor:'white',
    flexDirection: 'row',
    alignItems: 'center',   
    gap: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
