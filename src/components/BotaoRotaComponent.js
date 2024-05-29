import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BotaoRotaComponent({ RotaTxt, onPress, style }) {
  const navigation = useNavigation();

  return (
    // Props para os botões de rota
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styleTxtBtn}> {RotaTxt} </Text>
    </TouchableOpacity>
  );
}
