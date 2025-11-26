import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface PageViewProps {
  filename: string; // e.g., 'L_Hippocampe.xhtml'
}

export default function PageView({ filename }: PageViewProps) {
  console.log('Rendering PageView for', filename);

  if (Platform.OS === 'web') {
    // Web: render the XHTML in an iframe from public folder
    return (
      <ScrollView style={styles.container}>
        <iframe
          src={`/book/${filename}`} // must be in public/book/
          style={{ width: '100%', height: '100vh', border: 'none' }}
          title={filename}
        />
      </ScrollView>
    );
  } else {
    // Mobile: load local file in WebView
    // For Expo Android: copy files to android_asset folder
    const uri =
      Platform.OS === 'android'
        ? `file:///android_asset/${filename}` // make sure file exists here
        : filename; // iOS Expo local path

    return <WebView originWhitelist={['*']} source={{ uri }} style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
