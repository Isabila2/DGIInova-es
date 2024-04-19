import { View } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import BotaoRotaComponent from "../components/BotaoRotaComponent";

export default function Login() {
  return (
    <View>
      <ImagemComponent RotaImagem={require("../assets/images/LogoHome.png")} />
      <BotaoRotaComponent
        onPress={() => navigation.navigate("Cadastro")}
        RotaTxt={"Fazer Cadastro"}
      />
    </View>
  );
}
