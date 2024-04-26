import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BotaoImagemComponent({ name, size, color, onPress, styleBtn }) {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={styleBtn}
      />
    </TouchableOpacity>
  );
}
