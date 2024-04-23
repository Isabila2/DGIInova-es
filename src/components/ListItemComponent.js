import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function ListItem({ data, handleLeft, handleRight }) {
  function LeftActions(progress, dragX) {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Concluir
        </Animated.Text>
      </View>
    );
  }

  return (
    <Swipeable renderLeftActions={LeftActions} onSwipeableLeftOpen={handleLeft}>
      <View style={styles.container}>
        <Text style={styles.text}> {data.tarefa} </Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "100%",
    borderRadius: "40%",
    borderWidth: 1,
    borderColor: "#DBA3DB",
  },
  text: {
    fontSize: 17,
    color: "#222",
  },
  leftAction: {
    backgroundColor: "#388e3c",
    justifyContent: "center",
    flex: 1,
    borderRadius: "40%",
  },
  actionText: {
    fontSize: 15,
    color: "#FFF",
    padding: 20,
  },
});
