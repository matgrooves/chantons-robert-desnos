import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import PageView from './PageView';
import { COLORS } from './colors';

const pages = ['cover.xhtml', 'L_Hippocampe.xhtml', 'La_Chauve-souris.xhtml', 'La_Girafe.xhtml', 'nav.xhtml'];

export default function Index() {
  const [index, setIndex] = useState(0);

  console.log(index, pages[index]);

  // Create a horizontal pan gesture
  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      const { translationX } = event;
      if (translationX < -50) {
        // swipe left → next page
        setIndex(prev => Math.min(prev + 1, pages.length - 1));
      } else if (translationX > 50) {
        // swipe right → previous page
        setIndex(prev => Math.max(prev - 1, 0));
      }
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureDetector gesture={swipeGesture}>
        <View style={styles.container}>

          <PageView filename={pages[index]} />

          <View style={styles.nav}>
            <Button title="Précédente" onPress={() => setIndex(Math.max(index - 1, 0))} />
            <Button title="Suivante" onPress={() => setIndex(Math.min(index + 1, pages.length - 1))} />
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }, // full screen
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.barBackground
  },
});
