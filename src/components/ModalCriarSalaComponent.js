import React, { useState } from "react";
import { View, Modal, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { db, collection } from "../services/firebaseConfig";
import { styleUserHome } from "../styles/stylesUserHome";
import { v4 as uuidv4 } from "uuid";

import InputComponent from "./InputComponent";
import BotaoComponent from "./BotaoComponent";
import ImagemComponent from "./ImagemComponent";
import { auth } from "../services/firebaseConfig";

export default function ModalCriarSalaComponent({
  visible,
  Close,
  updateRooms,
}) {
  const [value, setValue] = useState("");
  const navigation = useNavigation();
  // pegando o Id do usuario usando o Auth
  const userId = auth.currentUser.uid;

  async function CriarSala() {
    if (value === "") {
      Alert.alert("Digite um nome para sua Sala");
    } else {
      try {
        // usando o uuidv4 para criar um Id unico para cada Sala e colocando ele com limite de caracteres
        const codigoSala = uuidv4().split("-")[0].substring(0, 10);
        // adicionando a nova sala no Banco de Dados
        const novaSalaRef = await addDoc(collection(db, "Salas"), {
          nome: value,
          userId: userId,
          codigo: codigoSala,
        });
        const novaSalaId = novaSalaRef.id;

        await setDoc(
          doc(db, "Salas", novaSalaId),
          {
            codigo: codigoSala,
          },
          // Merge é um parametro especifico do FireBase que com Merge True ele apenas atualiza os dados necessarios e não exclui o que não foi alterado
          { merge: true }
        );

        Close(); // Fechar o modal

        updateRooms(); // Atualiza a lista de salas usando a função passada como parametro

        // Naveguando para a tela da salas, passando o ID da sala como parâmetro de rota
        navigation.navigate("Minhas Salas", { salaId: novaSalaId });
        setValue("");
      } catch (error) {
        console.error("Erro ao criar sala:", error);
      }
    }
  }

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImagemComponent
            RotaImagem={require("../assets/images/modalCriarnovo.png")}
            style={styleUserHome.imgModal}
          />
          <InputComponent
            onChangeText={setValue}
            placeholder={"Nome da Sala"}
            value={value}
            style={styleUserHome.tIncriarsala}
            styleTxtBtn={styleUserHome.btnTextCiar}
          />
          <BotaoComponent
            OnPress={CriarSala}
            BtnTxt={"Criar Sala"}
            style={styleUserHome.btn1}
            styleTxtBtn={{ color: "white", fontWeight: "400", fontSize: 15 }}
          />
          <BotaoComponent
            OnPress={Close}
            BtnTxt={"Cancelar"}
            style={styleUserHome.btnCancel}
            styleTxtBtn={styleUserHome.btnTextCan}
          />
        </View>
      </ScrollView>
    </Modal>
  );
}
