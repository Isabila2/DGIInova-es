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
  sendPasswordResetEmail,
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
    // Função para tentar pegar os dados do usuário após o login
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

  // abrir Modal para colocar informações da Conta
  const DeletarConta = () => {
    setAuthVisible(true);
  };

  // conferir se a Senha está correta de acordo com o usuário e caso sim aparecer o alert para confirmar a exclusão
  const ConfirmarDeletarConta = async () => {
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
        "Não foi possível excluir a conta. Verifique sua senha e Tente novamente"
      );
      setAuthVisible(false);
    }
  };

  // Usando o Auth ele irá mandar um email para o Email do usuario logado para ele poder redefinir sua senha
  const ResetarSenha = async () => {
    try {
      // Aqui ele está pegando as informações do usuario logado
      const user = auth.currentUser;
      if (user) {
        // mandando o email usando o Auth
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
            OnPress={ResetarSenha} // Adicionando a função para enviar email de redefinição de senha
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
            OnPress={DeletarConta} // Adicionando o OnPress para deletar a conta
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

      {/* Modal de reautenticação para confirmar deletar a conta */}
      <Modal
        visible={authVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAuthVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TxtComponent
              texto="Digite sua senha para confirmar"
              styleTxt={{ fontSize: 15 }}
            />
            <TextInput
              secureTextEntry
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <BotaoComponent
              BtnTxt="Confirmar"
              OnPress={ConfirmarDeletarConta}
              style={{
                backgroundColor: "#DBA3DB",
                height: 40,
                width: 250,
                borderRadius: 10,
                marginTop: -10,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              styleTxtBtn={{ color: "white", fontSize: 15, fontWeight: "300" }}
            />
            <BotaoComponent
              BtnTxt="Cancelar"
              OnPress={() => setAuthVisible(false)}
              styleTxtBtn={{ color: "grey", marginTop: 10 }}
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
