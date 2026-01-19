import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { onboardingData } from '../Data/OnboardingData';
import OnboardingImage from '../Components/OnboardingImage';
import PaginationDots from '../Components/PaginationDots';

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastPage = currentIndex === onboardingData.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      navigation.replace('Login');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const data = onboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <Text style={styles.pageCount}>
          {currentIndex + 1}/3
        </Text>

        {!isLastPage && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        {/* Image */}
        <OnboardingImage source={data.image} />

        {/* Text */}

        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Text
            style={[
              styles.prev,
              currentIndex === 0 && styles.disabled,
            ]}
          >
            Prev
          </Text>
        </TouchableOpacity>

        <PaginationDots
          total={onboardingData.length}
          current={currentIndex}
        />

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.next}>
            {isLastPage ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageCount: {
    fontSize: 16,
  },
  skip: {
    fontFamily: 'Montserrat',
    fontWeinght: '600',
    fontSize: 18,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prev: {
    fontSize: 16,
    color: 'blue',
  },
  next: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat',
    fontStyle: 'semi-bold',
    color: '#F83758',
  },
  disabled: {
    color: 'gray',
  },
});

export default OnboardingScreen;
