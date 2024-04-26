import { View, Text } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native"; // Importe o hook useNavigation
import ImagemComponent from "../components/ImagemComponent";
import BotaoComponent from "../components/BotaoComponent";
import InputSenhaComponent from "../components/InputSenhaComponent";
import InputComponent from "../components/InputComponent";
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importe a função do arquivo firebaseConfig.js
import { auth } from "../services/firebaseConfig"; // Importe a referência ao objeto auth do arquivo firebaseConfig.js

const schema = yup.object({
  email: yup.string().required("Informe seu Email"),
  senha: yup.string().required("Informe sua senha"),
});

export default function Login() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    handleLogin(data);
    console.log(data);
  };

  const handleLogin = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      const user = userCredential.user;
      console.log("Usuário logado com sucesso:", user.uid);
      // Navegue para a próxima tela após o login
      navigation.navigate("Usuário(Aluno)");
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  };

  return (
    <View style={stylesLoginCadastro.tela}>
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoHome.png")}
        style={stylesLoginCadastro.img}
      />
      {/* View com Input e imagem Email */}
      {errors.usuario && (
        <Text style={stylesLoginCadastro.erro}>{errors.usuario.message}</Text>
      )}
      <View style={stylesLoginCadastro.view_Inputs}>
        <ImagemComponent
          RotaImagem={require("../assets/images/usuario.png")}
          style={stylesLoginCadastro.icones}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Digite seu Email"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputTxt}
            />
          )}
        />
      </View>

      {/* View com Input e Imagem senha */}
      {errors.senha && (
        <Text style={stylesLoginCadastro.erro}>{errors.senha.message}</Text>
      )}
      <View style={stylesLoginCadastro.view_Inputs}>
        <ImagemComponent
          RotaImagem={require("../assets/images/Senha.png")}
          style={stylesLoginCadastro.icones}
        />
        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <InputSenhaComponent
              placeholder={"Digite sua senha"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputTxt}
            />
          )}
        />
      </View>

      <BotaoComponent
        BtnTxt={"Fazer Login"}
        OnPress={handleSubmit(onSubmit)}
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
