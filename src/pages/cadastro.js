import { View } from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native"; // Importe o hook useNavigation
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";

export default function Cadastro() {
  const navigation = useNavigation(); // Obtenha o objeto de navegação

  return (
    <View>
      <InputComponent placeholder={"Digite seu Usuario"} value="" />
      <InputComponent placeholder={"Digite seu Email"} value="" />
      <InputComponent placeholder={"Digite sua Senha"} value="" />
      <InputComponent placeholder={"Confirme sua Senha"} value="" />
      <BotaoComponent
        OnPress={() => navigation.navigate("Login")} // Navegue para a tela de login
        BtnTxt={"Cadastrar-se"}
      />
    </View>
  );
}
