import { TouchableOpacity, Text } from "react-native";

export default function BotaoComponent({
  BtnTxt,
  OnPress,
  style,
  styleTxtBtn,
}) {
  return (
    <TouchableOpacity onPress={OnPress} style={style}>
      <Text style={styleTxtBtn}> {BtnTxt} </Text>
    </TouchableOpacity>
  );
}
