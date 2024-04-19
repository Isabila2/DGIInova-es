import { View } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native";
import InputSenhaComponent from "../components/InputSenhaComponent";
import InputComponent from "../components/InputComponent";

export default function Login() {
  const navigation = useNavigation();
  return (
    <View>
      <ImagemComponent
        RotaImagem={require("/home/isabella/Documentos/GitHub/DGIInova-es/src/assets/images/Usuario.png")}
      />
      {/* View com Input e imagem Email */}
      <View>
        <ImagemComponent RotaImagem={require("../assets/images/usuario.png")} />
        <InputComponent placeholder={"Digite seu Email ou Usuario"} />
      </View>
      {/* View com Input e Imagem senha */}
      <View>
        <InputSenhaComponent />
        <ImagemComponent RotaImagem={require("../assets/images/Senha.png")} />
      </View>
      <BotaoComponent
        onPress={() => navigation.navigate("Cadastro")}
        BtnTxt={"Criar Conta"}
      />
    </View>
  );
}
