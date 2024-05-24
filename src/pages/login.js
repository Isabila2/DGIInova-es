import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
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
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";

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

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={stylesLoginCadastro.textEsqueceuSenha}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Redefinir Senha</Text>
            <TextInput
              placeholder="Digite seu Email"
              style={styles.input}
              value={resetEmail}
              onChangeText={setResetEmail}
            />
            <BotaoComponent
              BtnTxt="Enviar Email"
              OnPress={handlePasswordReset}
              style={styles.button}
              styleTxtBtn={styles.buttontxt}
            />
            <BotaoComponent
              BtnTxt="Cancelar"
              OnPress={() => setModalVisible(false)}
              style={styles.cancelButton}
              styleTxtBtn={styles.cancelButtonText}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#EFC8EF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttontxt: {
    color: "white",
    fontWeight: "300",
  },
  cancelButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  cancelButtonText: {
    color: "grey",
  },
});
