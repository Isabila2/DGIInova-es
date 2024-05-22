import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  TextInput,
} from "react-native";
import {
  AntDesign,
  Feather,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { auth, getUserData, db } from "../services/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail, // Importação da função para enviar email de redefinição de senha
} from "firebase/auth";
import BotaoComponent from "./BotaoComponent";
import TxtComponent from "./TxtComponent";
import ImagemComponent from "./ImagemComponent";
import ModalEditarPerfil from "./ModalEditarInformações";

export default function MinhaConta() {
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Função para obter os dados do usuário após o login
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userData = await getUserData(user.uid);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = () => {
    setAuthVisible(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (user && password) {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        // Exclui o documento do usuário no Firestore
        await deleteDoc(doc(db, "users", user.uid));

        // Exclui o usuário no Firebase Authentication
        await deleteUser(user);

        Alert.alert("Sucesso", "Conta excluída com sucesso.");
        setAuthVisible(false);
      } else {
        Alert.alert(
          "Erro",
          "A senha é necessária para confirmar a exclusão da conta."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      Alert.alert(
        "Erro",
        "Não foi possível excluir a conta. Por favor, tente novamente mais tarde."
      );
      setAuthVisible(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendPasswordResetEmail(auth, user.email);
        Alert.alert(
          "Sucesso",
          "Um email para redefinição de senha enviado para o email conectado a sua Conta"
        );
      }
    } catch (error) {
      console.error("Erro ao enviar email de redefinição de senha:", error);
      Alert.alert(
        "Erro",
        "Não foi possível enviar o email para redefinição de senha. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        {/* View de início, com a imagem principal e o texto das informações da conta */}
        <View style={styles.container}>
          <ImagemComponent
            RotaImagem={require("../assets/images/minhaconta.png")}
            style={styles.img}
          />
          <TxtComponent
            texto={`INFORMAÇÕES DA CONTA`}
            styleTxt={{
              fontWeight: "300",
              marginLeft: 80,
              fontSize: 18,
              marginTop: 40,
            }}
          />
          <View style={styles.informacoes}>
            {/* View do Usuário */}
            <View
              style={{
                flexDirection: "row",
                height: 30,
                width: "90%",
                marginLeft: 15,
                borderBottomColor: "#a2a0a0",
                borderBottomWidth: 1,
              }}
            >
              <Feather
                name="users"
                size={24}
                color="#a2a0a0"
                style={{ marginLeft: 10 }}
              />
              <TxtComponent
                texto={`Usuário:`}
                styleTxt={{ marginLeft: 10, fontWeight: "300" }}
              />
              <TxtComponent
                texto={`${userData ? userData.usuario : ""}`}
                styleTxt={{ marginLeft: 5 }}
              />
            </View>
          </View>

          {/* View do email */}
          <View
            style={{
              flexDirection: "row",
              height: 30,
              width: "90%",
              marginLeft: 15,
              borderBottomColor: "#a2a0a0",
              borderBottomWidth: 1,
              marginTop: 30,
            }}
          >
            <Fontisto
              name="email"
              size={24}
              color="#a2a0a0"
              style={{ marginLeft: 10 }}
            />
            <TxtComponent
              texto={`Email:`}
              styleTxt={{ marginLeft: 10, fontWeight: "300" }}
            />
            <TxtComponent
              texto={`${userData ? userData.email : ""}`}
              styleTxt={{ marginLeft: 5 }}
            />
          </View>
        </View>

        {/* Texto de configurações */}
        <TxtComponent
          texto={`CONFIGURAÇÕES DA CONTA`}
          styleTxt={{
            fontWeight: "300",
            marginLeft: 55,
            fontSize: 18,
            marginTop: 40,
          }}
        />

        {/* View de editar informações */}
        <View
          style={{
            flexDirection: "row",
            height: 30,
            width: "90%",
            marginLeft: 15,
            borderBottomColor: "#a2a0a0",
            borderBottomWidth: 1,
            marginTop: 30,
          }}
        >
          <AntDesign
            name="edit"
            size={24}
            color="#a2a0a0"
            style={{ marginLeft: 10 }}
          />
          <BotaoComponent
            BtnTxt={"Editar nome de usuário"}
            OnPress={() => setVisible(true)}
            styleTxtBtn={{
              marginLeft: 20,
              backgroundColor: "white",
              width: 270,
              fontWeight: "300",
            }}
          />
          <AntDesign
            name="right"
            size={24}
            color="#a2a0a0"
            style={{ alignItems: "flex-end" }}
          />
        </View>
        {/* O modal de editar informações */}
        <ModalEditarPerfil
          visible={visible}
          FecharModal={() => setVisible(false)}
        />

        {/* View de alterar senha */}
        <View
          style={{
            flexDirection: "row",
            height: 30,
            width: "90%",
            marginLeft: 15,
            borderBottomColor: "#a2a0a0",
            borderBottomWidth: 1,
            marginTop: 30,
          }}
        >
          <MaterialIcons
            name="password"
            size={24}
            color="#a2a0a0"
            style={{ marginLeft: 10 }}
          />
          <BotaoComponent
            BtnTxt={"Alterar Senha"}
            OnPress={handlePasswordReset} // Adiciona a função para enviar email de redefinição de senha
            styleTxtBtn={{
              marginLeft: 20,
              backgroundColor: "white",
              width: 270,
              fontWeight: "300",
            }}
          />
          <AntDesign
            name="right"
            size={24}
            color="#a2a0a0"
            style={{ alignItems: "flex-end" }}
          />
        </View>

        {/* View de excluir minha conta */}
        <View
          style={{
            flexDirection: "row",
            height: 30,
            width: "90%",
            marginLeft: 15,
            borderBottomColor: "#a2a0a0",
            borderBottomWidth: 1,
            marginTop: 30,
            marginBottom: 50,
          }}
        >
          <AntDesign
            name="deleteuser"
            size={24}
            color="#a2a0a0"
            style={{ marginLeft: 10 }}
          />
          <BotaoComponent
            BtnTxt={"Excluir minha conta"}
            OnPress={handleDeleteAccount} // Adicionado o OnPress para deletar a conta
            styleTxtBtn={{
              marginLeft: 20,
              backgroundColor: "white",
              width: 270,
              fontWeight: "300",
            }}
          />
          <AntDesign
            name="right"
            size={24}
            color="#a2a0a0"
            style={{ alignItems: "flex-end" }}
          />
        </View>
      </ScrollView>

      {/* Modal de reautenticação */}
      <Modal
        visible={authVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAuthVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TxtComponent texto="Digite sua senha para confirmar" />
            <TextInput
              secureTextEntry
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <BotaoComponent BtnTxt="Confirmar" OnPress={confirmDeleteAccount} />
            <BotaoComponent
              BtnTxt="Cancelar"
              OnPress={() => setAuthVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  img: {
    width: 390,
    height: 550,
  },
  informacoes: {
    alignItems: "flex-start",
    marginTop: 25,
  },
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});
