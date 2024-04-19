import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BotaoRotaComponent({ RotaTxt, onPress, style }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text> {RotaTxt} </Text>
    </TouchableOpacity>
  );
}
