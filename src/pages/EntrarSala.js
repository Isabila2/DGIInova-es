import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoComponent from "../components/BotaoComponent";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function EntrarSala({ navigation }) {
  const [codigo, setCodigo] = useState("");
  const [salasEncontradas, setSalasEncontradas] = useState([]);

  const buscarSala = async () => {
    try {
      console.log(codigo);
      const q = query(collection(db, "Salas"), where("codigo", "==", codigo));
      const querySnapshot = await getDocs(q);
      const foundSalas = [];
      console.log("Total de documentos encontrados:", querySnapshot.size);
      querySnapshot.forEach((doc) => {
        // Adiciona as informações da sala encontrada ao array
        console.log("Dados da sala encontrada:", doc.data());
        foundSalas.push({ id: doc.id, ...doc.data() });
      });
      console.log("Salas encontradas:", foundSalas);
      setSalasEncontradas(foundSalas);
    } catch (error) {
      console.error("Erro ao buscar a sala:", error);
    }
  };

  const navigateToTarefasSala = (salaId) => {
    navigation.navigate("TarefasSala", { salaId });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      {/* Header Adicionar nova sala */}
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 0.2,
          width: "100%",
        }}
      >
        <InputComponent
          placeholder={"Digite o Código da Sala"}
          onChangeText={setCodigo}
          value={codigo}
        />
        <BotaoComponent BtnTxt={"Buscar Sala"} OnPress={buscarSala} />
      </View>
      {/* Lista de Salas encontradas */}
      <View>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Salas encontradas
        </Text>
        <FlatList
          data={salasEncontradas}
          renderItem={({ item }) => (
            <BotaoComponent
              OnPress={() => navigateToTarefasSala(item.id)}
              BtnTxt={item.nome}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
