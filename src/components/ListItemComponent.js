import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ListItem({ data, handleLeft, handleRight }) {
  function LeftActions(progress, dragX) {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        style={styles.leftAction}
        onPress={() => handleLeft(data.id)}
      >
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Concluir
        </Animated.Text>
      </TouchableOpacity>
    );
  }

  return (
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={() => handleLeft(data.id)}
    >
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
  },
  text: {
    fontSize: 17,
    color: "#222",
  },
  leftAction: {
    backgroundColor: "#388e3c",
    justifyContent: "center",
    flex: 1,
  },
  rightAction: {
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  actionText: {
    fontSize: 17,
    color: "#FFF",
    padding: 20,
  },
});
