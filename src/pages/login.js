import { View, Text, Alert, Modal, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import ImagemComponent from "../components/ImagemComponent";
import BotaoComponent from "../components/BotaoComponent";
import InputSenhaComponent from "../components/InputSenhaComponent";
import InputComponent from "../components/InputComponent";
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";

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

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert("Sucesso", "Email para redefinição de senha enviado.");
      setModalVisible(false);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Erro", "Email não cadastrado.");
      }
      if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "Por favor insira um Email válido");
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível enviar o email para redefinição de senha. Por favor, tente novamente mais tarde."
        );
      }
      console.error("Erro ao enviar email de redefinição de senha:", error);
    }
  };

  return (
    <View style={stylesLoginCadastro.tela}>
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoHome.png")}
        style={stylesLoginCadastro.img}
      />
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
              style={stylesLoginCadastro.inputTxtemail}
            />
          )}
        />
      </View>

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
        OnPress={() => navigation.navigate("Cadastro")}
        BtnTxt={"Cadastrar-se"}
        styleTxtBtn={stylesLoginCadastro.textcadastrar}
      />

      <BotaoComponent
        OnPress={() => setModalVisible(true)}
        BtnTxt={"Esqueceu a senha?"}
        styleTxtBtn={stylesLoginCadastro.textEsqueceuSenha}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recuperar Senha</Text>
            <TextInput
              placeholder="Digite seu Email"
              value={resetEmail}
              onChangeText={setResetEmail}
              style={styles.input}
            />
            <BotaoComponent
              BtnTxt="Enviar Email"
              OnPress={handlePasswordReset}
            />
            <BotaoComponent
              BtnTxt="Cancelar"
              OnPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textEsqueceuSenha: {
    textAlign: "center",
    marginTop: 10,
    color: "#0000EE",
  },
});
