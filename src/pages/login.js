import { View } from "react-native";
import React, { useState } from "react";
import ImagemComponent from "../components/ImagemComponent";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native";
import InputSenhaComponent from "../components/InputSenhaComponent";
import InputComponent from "../components/InputComponent";
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";

export default function Login() {
  const navigation = useNavigation();
  const [Usuario, setUsuario] = useState("");
  return (
    <View style={stylesLoginCadastro.tela}>
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoHome.png")}
        style={stylesLoginCadastro.img}
      />
      {/* View com Input e imagem Email */}
      <View style={stylesLoginCadastro.view_Inputs}>
        <ImagemComponent
          RotaImagem={require("../assets/images/usuario.png")}
          style={stylesLoginCadastro.icones}
        />
        <InputComponent
          placeholder={"Digite seu Usuario"}
          style={stylesLoginCadastro.inputTxt}
          onChangeText={setUsuario}
        />
      </View>
      {/* View com Input e Imagem senha */}
      <View style={stylesLoginCadastro.view_Inputs}>
        <ImagemComponent
          RotaImagem={require("../assets/images/Senha.png")}
          style={stylesLoginCadastro.icones}
        />
        <InputSenhaComponent />
      </View>
      <BotaoComponent
        BtnTxt={"Fazer Login"}
        style={stylesLoginCadastro.botao}
        styleTxtBtn={stylesLoginCadastro.BotaoTxt}
        onPress={() => navigation.navigate("HomeUsuario")}
      />
      <BotaoComponent
        onPress={() => navigation.navigate("Cadastro")}
        BtnTxt={"Cadastrar-se"}
      />
    </View>
  );
}
