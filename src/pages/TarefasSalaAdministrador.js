import React, { useEffect, useState } from "react";
import { View, ScrollView, FlatList, Text } from "react-native";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import ImagemComponent from "../components/ImagemComponent";
import { styleTarefa } from "../styles/styleTarefas";
import { useRoute } from "@react-navigation/native"; // Importe o hook useRoute
import TxtComponent from "../components/TxtComponent";

export default function TarefasSalaAdministrador() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [codigosala, setCodigosala] = useState("");
  const [codigoSalaAtual, setCodigoSalaAtual] = useState(""); // Estado para armazenar o código da sala atual

  const route = useRoute(); // Use o hook useRoute para acessar os parâmetros da rota

  useEffect(() => {
    if (auth.currentUser && route.params && route.params.salaId) {
      setCodigosala(route.params.salaId);
      buscarTarefasDaSala(route.params.salaId);
      fetchCodigoSala(route.params.salaId); // Busque o código da sala ao montar a tela
    }
  }, [route.params]); // Certifique-se de monitorar alterações nos parâmetros da rota

  // Função para buscar o código da sala
  const fetchCodigoSala = async (salaId) => {
    try {
      const salaDoc = await doc(db, "Salas", salaId);
      const docSnapshot = await getDoc(salaDoc);
      const codigoSala = docSnapshot.data().codigo;
      setCodigoSalaAtual(codigoSala);
    } catch (error) {
      console.error("Erro ao buscar código da sala:", error);
    }
  };

  const buscarTarefasDaSala = async (salaId) => {
    try {
      const q = query(
        collection(db, "adminTasks"),
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

  const addTarefa = async () => {
    if (novaTarefa !== "" && novaTarefa.length >= 5 && codigosala !== "") {
      const novaTarefaObj = {
        completo: false,
        titulo: novaTarefa,
        salaId: codigosala,
        CodigoSala: codigoSalaAtual,
      };
      try {
        await addDoc(collection(db, "adminTasks"), novaTarefaObj); // Alteração aqui
        setNovaTarefa("");
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
  };

  const marcarTarefaComoCompleta = async (id) => {
    try {
      const tarefaRef = doc(db, "adminTasks", id); // Alteração aqui
      await updateDoc(tarefaRef, {
        completo: true,
      });
    } catch (error) {
      console.error("Erro ao marcar tarefa como completa:", error);
    }
  };

  const excluirTarefa = async (id) => {
    try {
      const tarefaRef = doc(db, "adminTasks", id); // Alteração aqui
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
        {/* Exibe o código da sala */}

        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={styleTarefa.img}
        />
        {/* view com o texto e codigo da sala */}
        <View>
          <TxtComponent
            texto={
              "Compartilhe esse codigo com quem vocẽ quiser que acesse essas tarefas:"
            }
          />
          <TxtComponent texto={codigoSalaAtual} />
        </View>
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
