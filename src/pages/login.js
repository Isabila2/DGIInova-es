import { View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Importe o hook useNavigation
import ImagemComponent from "../components/ImagemComponent";
import BotaoComponent from "../components/BotaoComponent";
import InputSenhaComponent from "../components/InputSenhaComponent";
import InputComponent from "../components/InputComponent";
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";

export default function Login() {
  const navigation = useNavigation(); // Obtenha o objeto de navegação
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
        OnPress={() => navigation.navigate("Usuário(Aluno)")}
        style={stylesLoginCadastro.botao}
        styleTxtBtn={stylesLoginCadastro.BotaoTxt}
      />
      <BotaoComponent
        OnPress={() => navigation.navigate("Cadastro")} // Navegue para a tela de cadastro
        BtnTxt={"Cadastrar-se"}
      />
    </View>
  );
}
