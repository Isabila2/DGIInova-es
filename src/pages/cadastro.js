import { View } from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoRotaComponent from "../components/BotaoRotaComponent";

export default function Cadastro() {
  return (
    <View>
      <InputComponent placeholder={"Digite seu Usuario"} value="" />

      <InputComponent placeholder={"Digite seu Email"} value="" />

      <InputComponent placeholder={"Digite sua Senha"} value="" />

      <InputComponent placeholder={"Confirme sua Senha"} value="" />

      <BotaoRotaComponent
        BtnTxt="Já possui uma Conta?"
        OnPress={() => navigation.navigate("Login")}
        style={stylesHome.btn}
        styleTxtBtn={stylesHome.txtbtn}
      />
    </View>
  );
}
