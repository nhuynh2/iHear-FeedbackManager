import { Button, Image, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react'
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [count, setCount] = useState(0)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to iHear!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Let the stress out first!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <Button
          title={'Feeling burnout? No worry. Press me!'}
          onPress={() => {
            setCount(count + 1)
          }}
          color="hotpink"
        />
        <ThemedText style={styles.test}>{`Pressed ${count} times`}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Now take a deep breath. . .</ThemedText>
        <ThemedText>You've been great!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Let's go!!</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in Expo Go.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    color: 'lightgreen',
    fontSize: 16,
    padding: 12,
  },
});
