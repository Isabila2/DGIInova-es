import { StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { CommomActions, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommomActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    }, 5500);
  }, []);

  return (
    <Video
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      source={require("../../assets/logoEspera.mp4")}
      isLooping={true}
      shouldPlay={true}
    />
  );
}
