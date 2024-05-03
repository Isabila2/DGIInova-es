import React, { useEffect, useState } from "react";
import { View, ScrollView, FlatList } from "react-native";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import ImagemComponent from "../components/ImagemComponent";
import { styleTarefa } from "../styles/styleTarefas";
import { useNavigation } from "@react-navigation/native";
import { db } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function SalaPublica({ route }) {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.userId) {
      buscarTarefasDoUsuario();
    }
  }, []);

  const buscarTarefasDoUsuario = async () => {
    try {
      const q = query(
        collection(db, "tarefas"),
        where("userId", "==", route.params.userId)
      );
      onSnapshot(q, (snapshot) => {
        const tarefasUsuario = [];
        snapshot.forEach((doc) => {
          tarefasUsuario.push({ id: doc.id, ...doc.data() });
        });
        setTarefas(tarefasUsuario);
      });
    } catch (error) {
      console.error("Erro ao buscar tarefas do usuário:", error);
    }
  };

  const addTarefa = async () => {
    if (novaTarefa !== "" && novaTarefa.length >= 5) {
      const novaTarefaObj = {
        userId: route.params.userId,
        completo: false,
        titulo: novaTarefa,
      };
      await addDoc(collection(db, "tarefas"), novaTarefaObj);
      setNovaTarefa("");
    }
  };

  const excluirTarefa = async (id) => {
    try {
      const tarefaRef = doc(db, "tarefas", id);
      await deleteDoc(tarefaRef);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  return (
    <View style={styleTarefa.inicio}>
      <ScrollView>
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={styleTarefa.img}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AdicionarTarefa
            tarefa={novaTarefa}
            onChangeText={setNovaTarefa}
            onPress={addTarefa}
            QuantidadeTarefasCriadas={tarefas.length}
            QuantidadeTarefasConcluidas={
              tarefas.filter(({ completo }) => completo).length
            }
            styleAdd={styleTarefa.add}
            styleImg={styleTarefa.btnimg}
            styleTxt={styleTarefa.texto}
            styleTxtt={styleTarefa.textoo}
          />
        </View>
        <View>
          <FlatList
            data={tarefas}
            keyExtractor={(tarefa) => tarefa.id}
            renderItem={({ item }) => (
              <ContainerTarefa
                styleContainer={styleTarefa.iconeprimeiro}
                styleTexto={styleTarefa.textarefa}
                styleContai={styleTarefa.iconesegundo}
                TituloTarefa={item.titulo}
                completo={item.completo}
                onPressCompleto={() => marcarTarefaComoCompleta(item.id)}
                onPressExcluir={() => excluirTarefa(item.id)}
              />
            )}
            ListEmptyComponent={<SemTarefa />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
