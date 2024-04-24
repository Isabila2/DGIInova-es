import { View, Text, TouchableOpacity } from "react-native";
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

const schema = yup.object({
  usuario: yup.string().required("Informe seu Usuário"),
  senha: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 dígitos")
    .required("Informe sua senha"),
});

export default function Login() {
  const navigation = useNavigation(); // Obtenha o objeto de navegação

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data); // Aqui você pode enviar os dados do formulário para o servidor
    // Exemplo de navegação para a próxima tela após o login bem-sucedido
    navigation.navigate("Usuário(Aluno)");
  };

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
        <Controller
          control={control}
          name="usuario"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Digite seu usuário"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputTxt}
            />
          )}
        />
      </View>
      {errors.usuario && (
        <Text style={stylesLoginCadastro.erro}>{errors.usuario.message}</Text>
      )}
      {/* View com Input e Imagem senha */}
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
      {errors.senha && (
        <Text style={stylesLoginCadastro.erro}>{errors.senha.message}</Text>
      )}
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
