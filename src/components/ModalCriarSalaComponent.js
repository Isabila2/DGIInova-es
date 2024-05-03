import React from "react";
import { View, Modal, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig"; // Importe a referência ao banco de dados Firebase

import InputComponent from "./InputComponent";
import BotaoComponent from "./BotaoComponent";
import TxtComponent from "./TxtComponent";

export default function ModalCriarSalaComponent({ visible, Close }) {
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
        const codigoSala = novaSalaId.slice(0, 6); // Pegue os primeiros 6 caracteres do ID

        // Atualize o documento da sala com o código
        await setDoc(
          doc(db, "Salas", novaSalaId),
          {
            codigo: codigoSala,
          },
          { merge: true }
        );
        adicionarSalaDB(value, codigoSala); // Passando o nome da sala e o código
        Close(); // Fecha o modal
        // Navegue para a tela da sala recém-criada, passando o ID da sala como parâmetro de rota
        navigation.navigate("SalaPublica", { salaId: novaSalaId });
        Close();
      } catch (error) {
        console.error("Erro ao criar sala:", error);
      }
    }
  }

  const adicionarSalaDB = async (nomeSala, codigoSala) => {
    try {
      await addDoc(collection(db, "Salas"), {
        nome: nomeSala,
        codigo: codigoSala,
        // Outros campos da sala, se houver
      });
    } catch (error) {
      console.error("Erro ao adicionar sala:", error);
      throw error;
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View>
        <TxtComponent texto={"Criar Sala"} />
        <InputComponent
          onChangeText={setValue}
          placeholder={"Nome da Sala"}
          value={value}
        />
        <BotaoComponent OnPress={CriarSala} BtnTxt={"Criar Sala"} />
        <BotaoComponent OnPress={Close} BtnTxt={"Cancelar"} />
      </View>
    </Modal>
  );
}
