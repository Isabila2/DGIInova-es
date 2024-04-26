import { Alert, FlatList, View } from "react-native";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { styleTarefa } from "../styles/styleTarefas";
import ImagemComponent from "../components/ImagemComponent";
import { ScrollView } from "react-native";

export default function TarefasPrivadas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const definirCompleto = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completo: !tarefa.completo } : tarefa
      )
    );
  };

  function ExcluirTarefa(id) {
    Alert.alert("Excluir tarefa", "Deseja excluir essa Tarefa?", [
      {
        text: "Sim",
        style: "default",
        onPress: () =>
          setTarefas((tarefas) =>
            tarefas.filter((tarefas) => tarefas.id !== id)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  const addTarefa = () => {
    if (novaTarefa !== "" && novaTarefa.length >= 5) {
      const novaTarefaObj = {
        id: uuidv4(),
        completo: false,
        titulo: novaTarefa,
      };
      setTarefas((prevTarefas) => [...prevTarefas, novaTarefaObj]);
      setNovaTarefa("");
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
        RotaImagem={require("../assets/images/LogoPrincipal.png")}
        style={styleTarefa.img}
      />
      {/* View onde tem o input e o botão para adicionar tarefa */}
      <View style={{ justifyContent: "center", alignItems: "center"}}>
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
              TituloTarefa={item.titulo}
              completo={item.completo}
              onPressCompleto={() => definirCompleto(item.id)}
              onPressExcluir={() => ExcluirTarefa(item.id)}
            />
          )}
          ListEmptyComponent={<SemTarefa />}
        />
      </View>
      </ScrollView>
    </View>
  );
}
