import { TouchableOpacity, Text } from "react-native";

export default function BotaoComponent({
  // Props
  BtnTxt,
  OnPress,
  style,
  styleTxtBtn,
}) {
  return (
    // Props do Touchable
    <TouchableOpacity onPress={OnPress} style={style}>
      <Text style={styleTxtBtn}> {BtnTxt} </Text>
    </TouchableOpacity>
  );
}
