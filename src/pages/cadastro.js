import { View } from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoRotaComponent from "../components/BotaoRotaComponent";

export default function Cadastro() {
  return (
    <View>
      <InputComponent txtplace="E-mail" value="" />

      <InputComponent placeholder="Criar senha" value="" />

      <InputComponent placeholder="Confirmar senha" value="" />

      <InputComponent placeholder="CPF" value="" />

      <BotaoRotaComponent
        BtnTxt="Já possui uma Conta?"
        OnPress={() => navigation.navigate("Login")}
        style={stylesHome.btn}
        styleTxtBtn={stylesHome.txtbtn}
      />
    </View>
  );
}
