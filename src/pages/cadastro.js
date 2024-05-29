// Importação de pacotes, componentes, styleLogin-Cadastro, etc
import React, { useState } from "react";
import { View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import InputComponent from "../components/InputComponent";
import ImagemComponent from "../components/ImagemComponent";
import { useNavigation } from "@react-navigation/native";
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import TxtComponent from "../components/TxtComponent";

// Usando o Yup para otimizar e "automatizar" meu formulário
const schema = yup.object({
  usuario: yup.string().required("Informe seu Usuário"),
  email: yup.string().email("Email Inválido").required("Informe seu Email"),
  senha: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 dígitos")
    .required("Informe sua senha"),
  ConfirmSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas precisam ser iguais")
    .required("Confirme sua senha"),
});

export default function Cadastro() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (data) => {
    try {
      // Setando o Loading para aparecer
      setLoading(true);
      // Usando a função pronta do Auth para adicionar o usuário com o email e a senha
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      const user = userCredential.user;

      // quando criar a conta enviar um Email de verificação para o Email cadastrado
      await sendEmailVerification(auth.currentUser);

      // adicionar o usuário no outro banco de dados com outras informações
      await setDoc(doc(db, "users", user.uid), {
        email: data.email,
        usuario: data.usuario,
        senha: data.senha,
      });

      console.log("Usuário cadastrado com sucesso:", user.uid);

      Alert.alert("Cadastro feito com sucesso");
      Alert.alert("Um Email foi enviado para fazer a verificação do seu Email");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Este Email já está em uso");
      }
      if (error.code === "auth/invalid-email") {
        Alert.alert("Email inválido");
      }
    } finally {
      setLoading(false); // Desativando o Loading, independentemente do resultado do cadastro
    }
  };

  return (
    // View principal com a imagem principal
    <View style={stylesLoginCadastro.tela}>
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoHome.png")}
        style={stylesLoginCadastro.imgcadastro}
      />

      {/* Texto de fazer Cadastro */}
      <TxtComponent
        texto=" Fazer Cadastro"
        styleTxt={stylesLoginCadastro.txttitulo}
      />

      {/* View com os Inputs para colocar informação e os TxtComponents com os textos  */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {errors.usuario && (
          <TxtComponent
            texto={errors.usuario?.message}
            styleTxt={stylesLoginCadastro.erro}
          />
        )}
        <Controller
          control={control}
          name="usuario"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Digite seu Usuário"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputs_cadastro}
            />
          )}
        />
        {errors.email && (
          <TxtComponent
            texto={errors.email?.message}
            styleTxt={stylesLoginCadastro.erro}
          />
        )}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Digite seu Email"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputs_cadastro}
            />
          )}
        />
        {errors.senha && (
          <TxtComponent
            texto={errors.senha?.message}
            styleTxt={stylesLoginCadastro.erro}
          />
        )}
        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Digite seu senha"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputs_cadastro}
              securetextentry={true}
            />
          )}
        />
        {errors.ConfirmSenha && (
          <TxtComponent
            texto={errors.ConfirmSenha?.message}
            styleTxt={stylesLoginCadastro.erro}
          />
        )}
        <Controller
          control={control}
          name="ConfirmSenha"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Confirme sua senha"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputs_cadastro}
              securetextentry={true}
            />
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(handleCadastro)}
          style={stylesLoginCadastro.botao}
          disabled={loading} // Desativar o botão enquanto estiver carregando
        >
          {/* Texto do botão de cadastro */}
          <TxtComponent
            texto="Cadastrar"
            styleTxt={stylesLoginCadastro.BotaoTxt}
          />
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator style={{ marginTop: 10 }} color="#000" />
        )}
      </View>
    </View>
  );
}
