import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableWithoutFeedback, Animated, RefreshControl } from 'react-native';

// Define constants for window dimensions and image height
const windowWidth = Dimensions.get('window').width;
const imageHeight = 300;

// Import images statically
import grammar1 from '../../assets/grammer 1.jpg';
import grammar2 from '../../assets/grammer 2.jpg';
import grammar3 from '../../assets/grammer 3.jpg';
import grammar4 from '../../assets/grammer 4.jpg';
import grammar5 from '../../assets/grammer 5.jpg';
import grammar6 from '../../assets/grammer 6.jpg';

// Array of images
const images = [grammar1, grammar2, grammar3, grammar4, grammar5, grammar6];

const GrammarScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const scaleValue = new Animated.Value(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Array(images.length).fill(false));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleImagePress = (index) => {
    setSelectedImage(index);
    Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const resetAnimation = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => setSelectedImage(null));
  };

  const handleLoad = (index) => {
    const updatedLoadedImages = [...loadedImages];
    updatedLoadedImages[index] = true;
    setLoadedImages(updatedLoadedImages);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {images.map((image, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => handleImagePress(index)}>
            <Animated.Image
              source={image}
              onLoad={() => handleLoad(index)}
              style={[
                styles.image,
                !loadedImages[index] && styles.hiddenImage,
                selectedImage === index && { transform: [{ scale: scaleValue }] },
              ]}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      {selectedImage !== null && (
        <TouchableWithoutFeedback onPress={resetAnimation}>
          <View style={styles.fullScreenContainer}>
            <Animated.Image
              source={images[selectedImage]}
              style={[
                styles.fullScreenImage,
                { transform: [{ scale: scaleValue }] },
              ]}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3', // Linear gradient cannot be used directly in backgroundColor
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {
    width: windowWidth * 0.9,
    height: imageHeight,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  hiddenImage: {
    opacity: 0,
  },
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default GrammarScreen;
