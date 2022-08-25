import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.basicContainer]}>
      <View style={styles.centeredContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>React-Native CICD</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            A simple example app to show of we can do continuous integration and
            continuous deployment on React-Native applications
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingVertical: 5,
  },
});

export default App;
