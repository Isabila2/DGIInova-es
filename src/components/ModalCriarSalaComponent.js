import React, { useState } from "react";
import { View, Modal, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, collection } from "../services/firebaseConfig"; // Importe a referência ao banco de dados Firebase
import { styleUserHome } from "../styles/stylesUserHome";
import { v4 as uuidv4 } from "uuid";

import InputComponent from "./InputComponent";
import BotaoComponent from "./BotaoComponent";
import TxtComponent from "./TxtComponent";
import ImagemComponent from "./ImagemComponent";
import { auth } from "../services/firebaseConfig";

export default function ModalCriarSalaComponent({
  visible,
  Close,
  updateRooms,
}) {
  const [value, setValue] = useState("");
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;

  async function CriarSala() {
    if (value === "") {
      Alert.alert("Digite um nome para sua Sala");
    } else {
      try {
        const codigoSala = uuidv4().split("-")[0].substring(0, 10);
        const novaSalaRef = await addDoc(collection(db, "Salas"), {
          nome: value,
          userId: userId,
          codigo: codigoSala, // Adiciona o código da sala ao documento
        });
        const novaSalaId = novaSalaRef.id;

        // Atualize o documento da sala com o código
        await setDoc(
          doc(db, "Salas", novaSalaId),
          {
            codigo: codigoSala,
          },
          { merge: true }
        );

        Close(); // Fecha o modal
        updateRooms(); // Atualiza a lista de salas
        // Navegue para a tela da sala recém-criada, passando o ID da sala como parâmetro de rota
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
