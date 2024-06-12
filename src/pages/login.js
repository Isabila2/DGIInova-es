// Importação de pacotes, componentes, stylesHome, etc
import React, { useState } from "react";
import { View, Alert, TextInput, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import ImagemComponent from "../components/ImagemComponent";
import BotaoComponent from "../components/BotaoComponent";
import InputSenhaComponent from "../components/InputSenhaComponent";
import InputComponent from "../components/InputComponent";
import TxtComponent from "../components/TxtComponent";
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";

// Usando o Yup para otimizar e "automatizar" meu formulário
const schema = yup.object({
  email: yup.string().required("Informe seu Email").email("Email inválido"),
  senha: yup.string().required("Informe sua senha"),
});

export default function Login() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    handleLogin(data);
  };

  const handleLogin = async (data) => {
    try {
      // Usando função fornecida pelo Auth para fazer o login do Usuário
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      const user = userCredential.user;
      console.log("Usuário logado com sucesso:", user.uid);
      navigation.navigate("Usuário(Aluno)");
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        Alert.alert("Email ou Senha Inválidos.");
      } else {
        Alert.alert("Erro", error.message);
      }
    }
  };

  const ResetarSenha = async () => {
    // Verifica se resetEmail vazio, caso sim exibe o erro
    if (!resetEmail) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    try {
      // Chama a função do Firebase Auth para enviar o e-mail de redefinição de senha para o e-mail fornecido.
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert("Sucesso", "Email para redefinição de senha enviado.");
      setModalVisible(false);
      setResetEmail(""); // Limpar o campo de e-mail após o envio
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Erro", "Email não cadastrado.");
      } else {
        Alert.alert("Erro", "Digite um Email válido.");
      }
      console.error("Erro ao enviar email de redefinição de senha:", error);
    }
  };

  return (
    // View principal com imagem principal
    <View style={stylesLoginCadastro.tela}>
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoHome.png")}
        style={stylesLoginCadastro.img}
      />
      {errors.usuario && (
        <TxtComponent
          texto={errors.usuario.message}
          styleTxt={stylesLoginCadastro.erro}
        />
      )}

      {/* View com os Inputs para colocar informação e os TxtComponents com os textos  */}
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
              style={stylesLoginCadastro.inputTxtemail}
            />
          )}
        />
      </View>

      {errors.senha && (
        <TxtComponent
          texto={errors.senha.message}
          styleTxt={stylesLoginCadastro.erro}
        />
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

      {/* Botão de fazer login */}
      <BotaoComponent
        BtnTxt={"Fazer Login"}
        OnPress={handleSubmit(onSubmit)}
        style={stylesLoginCadastro.botao}
        styleTxtBtn={stylesLoginCadastro.BotaoTxt}
      />

      {/* Botão de ir para a página de cadastro */}
      <BotaoComponent
        OnPress={() => navigation.navigate("Cadastro")}
        BtnTxt={"Cadastrar-se"}
        styleTxtBtn={stylesLoginCadastro.textcadastrar}
      />

      {/* Botão para abrir o modal de esqueceu a senha */}
      <BotaoComponent
        OnPress={() => setModalVisible(true)}
        BtnTxt={"Esqueceu a senha?"}
        styleTxtBtn={stylesLoginCadastro.textEsqueceuSenha}
      />

      {/* Código do modal de redefinir senha */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={stylesLoginCadastro.modalContainer}>
          <View style={stylesLoginCadastro.modalContent}>
            <TxtComponent
              texto="Redefinir Senha"
              styleTxt={stylesLoginCadastro.title}
            />

            <TextInput
              placeholder="Digite seu Email"
              style={stylesLoginCadastro.input}
              value={resetEmail}
              onChangeText={setResetEmail}
            />
            <BotaoComponent
              BtnTxt="Enviar Email"
              OnPress={ResetarSenha}
              style={stylesLoginCadastro.button}
              styleTxtBtn={stylesLoginCadastro.buttontxt}
            />
            <BotaoComponent
              BtnTxt="Cancelar"
              OnPress={() => setModalVisible(false)}
              style={stylesLoginCadastro.cancelButton}
              styleTxtBtn={stylesLoginCadastro.cancelButtonText}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
