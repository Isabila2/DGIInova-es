import { View } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import BotaoRotaComponent from "../components/BotaoRotaComponent";
import { useNavigation } from "@react-navigation/native";
import { stylesHeader } from "../styles/styleHeader";
import { stylesHeader } from "../styles/styleHeader";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={stylesHeader.header}>
      {/* logo da empresa */}
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoPrincipal.png")}
        style={stylesHeader.img}
      />
      {/* botões da navegação das paginas */}

      {/* botão de login */}
      <BotaoRotaComponent
        RotaTxt={"Login"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
