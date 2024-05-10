import React, { useEffect, useState } from "react";
import { View, ScrollView, FlatList } from "react-native";
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
import { db, auth } from "../services/firebaseConfig";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import ImagemComponent from "../components/ImagemComponent";
import { styleTarefa } from "../styles/styleTarefas";

export default function TarefasSalaAdministrador() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      buscarTarefasDoUsuario();
    }
  }, []);

  const buscarTarefasDoUsuario = async () => {
    try {
      const q = query(
        collection(db, "tarefas"),
        where("userId", "==", auth.currentUser.uid)
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
        userId: auth.currentUser.uid,
        completo: false,
        titulo: novaTarefa,
      };
      try {
        const docRef = await addDoc(collection(db, "tarefas"), novaTarefaObj);
        setNovaTarefa("");
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
  };

  const marcarTarefaComoCompleta = async (id) => {
    try {
      const tarefaRef = doc(db, "tarefas", id);
      await updateDoc(tarefaRef, {
        completo: true,
      });
    } catch (error) {
      console.error("Erro ao marcar tarefa como completa:", error);
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

  const TotalTarefasCriadas = tarefas.length;
  const TotalTarefasConcluidas = tarefas.filter(
    ({ completo }) => completo
  ).length;
  return (
    <View style={styleTarefa.inicio}>
      <ScrollView>
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={styleTarefa.img}
        />
        <AdicionarTarefa
          tarefa={novaTarefa}
          onChangeText={setNovaTarefa}
          onPress={addTarefa}
          QuantidadeTarefasCriadas={TotalTarefasCriadas}
          QuantidadeTarefasConcluidas={TotalTarefasConcluidas}
          styleAdd={styleTarefa.add}
          styleImg={styleTarefa.btnimg}
          styleTxt={styleTarefa.texto}
          styleTxtt={styleTarefa.textoo}
        />
        <View>
          <FlatList
            data={tarefas}
            keyExtractor={(tarefa) => tarefa.id}
            renderItem={({ item }) => (
              <ContainerTarefa
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
