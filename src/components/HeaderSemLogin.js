import { View } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import BotaoRotaComponent from "../components/BotaoRotaComponent";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../style/styleHeader";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* logo da empresa */}
      <ImagemComponent RotaImagem={require("../assets/imagens/Preview.jpeg")} />
      {/* botões da navegação das paginas */}

      {/* botão de login */}
      <BotaoRotaComponent
        RotaTxt={"Login"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
