import { Alert, FlatList, View } from "react-native";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import { useState } from "react";
import { styleTarefa } from "../styles/styleTarefas";
import ImagemComponent from "../components/ImagemComponent";
import { ScrollView } from "react-native";
import { useEffect } from "react";
import { db, auth } from "../services/firebaseConfig"; // Importe a referência ao banco de dados Firebase e ao objeto de autenticação
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

export default function TarefasPrivadas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const marcarTarefaComoCompleta = async (id, completo) => {
    try {
      const tarefaRef = doc(db, "tarefas", id);
      await updateDoc(tarefaRef, {
        completo: !completo,
      });
    } catch (error) {
      console.error("Erro ao marcar tarefa como completa:", error);
    }
  };

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

  const addTarefa = () => {
    if (novaTarefa !== "" && novaTarefa.length >= 5) {
      const novaTarefaObj = {
        userId: auth.currentUser.uid,
        completo: false,
        titulo: novaTarefa,
      };
      adicionarTarefaNoFirebase(novaTarefaObj);
      setNovaTarefa("");
    }
  };

  const adicionarTarefaNoFirebase = async (novaTarefaObj) => {
    try {
      await addDoc(collection(db, "tarefas"), novaTarefaObj);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
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
        {/* Somente a Imagem */}
        <ImagemComponent
          RotaImagem={require("../assets/images/pgtarefas.png")}
          style={styleTarefa.img}
        />
        {/* View onde tem o input e o botão para adicionar tarefa */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* component com Input, Botão de adicionar e Contadores de Tarefas */}
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
        </View>
        {/* View onde aparece as tarefas */}
        <View>
          {/* Essa é a lista de Tarefas */}
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
