import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomHeaderText = ({screen, navigation, headerText}: any) => {
  return (
    <View style={styles.textContainer}>
      <Text onPress={() => navigation.navigate(screen)} style={styles.backBtn}>
        ←-
      </Text>
      <Text style={styles.topHeading}>{headerText}</Text>
    </View>
  );
};

export default CustomHeaderText;

const styles = StyleSheet.create({
  backBtn: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: -5,
  },
  topHeading: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
});
