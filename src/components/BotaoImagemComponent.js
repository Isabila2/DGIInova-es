import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TxtComponent from "./TxtComponent";

export default function BotaoImagemComponent({
  name,
  size,
  color,
  onPress,
  styleBtn,
  texto,
  styletexto,
}) {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={styleBtn}
      />
      <TxtComponent texto={texto} styleTxt={styletexto} />
    </TouchableOpacity>
  );
}
