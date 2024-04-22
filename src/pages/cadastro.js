import { View } from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoComponent from "../components/BotaoComponent";
import ImagemComponent from "../components/ImagemComponent";
import { useNavigation } from "@react-navigation/native"; // Importe o hook useNavigation
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";

export default function Cadastro() {
  const navigation = useNavigation(); // Obtenha o objeto de navegação

  return (
    <View style={stylesLoginCadastro.tela}>
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoHome.png")}
        style={stylesLoginCadastro.img}
      />

      <InputComponent
        placeholder={"Digite seu Usuario"}
        value=""
        style={stylesLoginCadastro.inputs_cadastro}
      />
      <InputComponent
        placeholder={"Digite seu Email"}
        value=""
        style={stylesLoginCadastro.inputs_cadastro}
      />
      <InputComponent
        placeholder={"Digite sua Senha"}
        value=""
        style={stylesLoginCadastro.inputs_cadastro}
      />
      <InputComponent
        placeholder={"Confirme sua Senha"}
        value=""
        style={stylesLoginCadastro.inputs_cadastro}
      />
      <BotaoComponent
        OnPress={() => navigation.navigate("Login")} // Navegue para a tela de login
        BtnTxt={"Cadastrar-se"}
      />
    </View>
  );
}
