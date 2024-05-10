import React, { useState } from "react";
import { View, Modal, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, collection } from "../services/firebaseConfig"; // Importe a referência ao banco de dados Firebase
import { styleUserHome } from "../styles/stylesUserHome";

import InputComponent from "./InputComponent";
import BotaoComponent from "./BotaoComponent";
import TxtComponent from "./TxtComponent";
import ImagemComponent from "./ImagemComponent";

export default function ModalCriarSalaComponent({
  visible,
  Close,
  updateRooms,
}) {
  const [value, setValue] = useState("");
  const [NomeSala, setNomeSala] = useState("");
  const navigation = useNavigation();

  async function CriarSala() {
    if (value === "") {
      Alert.alert("Digite um nome para sua Sala");
    } else {
      try {
        const novaSalaRef = await addDoc(collection(db, "Salas"), {
          nome: value,
        });

        // Recupere o ID da nova sala
        const novaSalaId = novaSalaRef.id;

        // Crie um código único para a sala
        const codigoSala = novaSalaId.slice(0, 9); // Pegue os primeiros 6 caracteres do ID

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
      <View
        style={{
          flex: 1,
          backgroundColor: "#DBA3DB",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TxtComponent
          texto={"Criar Sala"}
          styleTxt={styleUserHome.txtcriarsala}
        />
        <InputComponent
          onChangeText={setValue}
          placeholder={"Nome da Sala"}
          value={value}
          style={styleUserHome.tIncriarsala}
        />
        <BotaoComponent OnPress={CriarSala} BtnTxt={"Criar Sala"} />
        <BotaoComponent OnPress={Close} BtnTxt={"Cancelar"} />
        <ImagemComponent
          RotaImagem={require("../assets/Gifs/Completed.gif")}
          style={styleUserHome.gifmodal1}
        />
      </View>
    </Modal>
  );
}
