import { Alert, FlatList, View } from "react-native";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import { useState, useEffect } from "react";
import { styleTarefa } from "../styles/styleTarefas";
import ImagemComponent from "../components/ImagemComponent";
import { ScrollView } from "react-native";
import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRoute } from "@react-navigation/native";

export default function TarefasSala() {
  const [tarefas, setTarefas] = useState([]);
  const route = useRoute();

  const marcarTarefaComoCompleta = async (id, completo) => {
    try {
      const tarefaRef = doc(db, "adminTasks", id);
      await updateDoc(tarefaRef, {
        completo: !completo,
      });
    } catch (error) {
      console.error("Erro ao marcar tarefa como completa:", error);
    }
  };

  function TentarApagarTask() {
    Alert.alert(
      "Você não tem permissão para Excluir uma Tarefa, entre em contato com o Administrador da Sala"
    );
  }

  useEffect(() => {
    if (auth.currentUser) {
      if (route.params && route.params.salaId) {
        buscarTarefasDaSala(route.params.salaId);
      }
    }
  }, [route.params]);

  const buscarTarefasDaSala = async (salaId) => {
    try {
      const q = query(
        collection(db, "adminTasks"), // Corrigido o nome da coleção
        where("salaId", "==", salaId)
      );
      onSnapshot(q, (snapshot) => {
        const tarefasDaSala = [];
        snapshot.forEach((doc) => {
          tarefasDaSala.push({ id: doc.id, ...doc.data() });
        });
        setTarefas(tarefasDaSala);
      });
    } catch (error) {
      console.error("Erro ao buscar tarefas da sala:", error);
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
          RotaImagem={require("../assets/images/salacompartilhada.png")}
          style={styleTarefa.img}
        />
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
                styleIcone={styleTarefa.iconetrash}
                completo={item.completo}
                onPressCompleto={() =>
                  marcarTarefaComoCompleta(item.id, item.completo)
                }
                onPressExcluir={TentarApagarTask}
              />
            )}
            ListEmptyComponent={<SemTarefa />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
