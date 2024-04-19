import { TouchableOpacity, Text } from "react-native";

export default function BotaoComponent({ BtnTxt, OnPress, style }) {
  return (
    <TouchableOpacity onPress={OnPress} style={style}>
      <Text> {BtnTxt} </Text>
    </TouchableOpacity>
  );
}
