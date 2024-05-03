import { Alert, FlatList, View } from "react-native";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefaSala from "../components/ContainerTarefaSala";
import SemTarefa from "../components/SemTarefaComponent";
import ImagemComponent from "../components/ImagemComponent";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TarefasSala() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const definirCompleto = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completo: !tarefa.completo } : tarefa
      )
    );
  };

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
    <View>
      {/* Somente a Imagem */}

      {/* View onde tem o input e o botão para adicionar tarefa */}
      <View>
        {/* component com Input, Botão de adicionar e Contadores de Tarefas */}

        <AdicionarTarefa
          tarefa={novaTarefa}
          onChangeText={setNovaTarefa}
          onPress={addTarefa}
          QuantidadeTarefasCriadas={TotalTarefasCriadas}
          QuantidadeTarefasConcluidas={TotalTarefasConcluidas}
        />
      </View>
      {/* View onde aparece as tarefas */}
      <View>
        {/* Essa é a lista de Tarefas */}
        <FlatList
          data={tarefas}
          keyExtractor={(tarefa) => tarefa.id}
          renderItem={({ item }) => (
            <ContainerTarefaSala
              TituloTarefa={item.titulo}
              completo={item.completo}
              onPressCompleto={() => definirCompleto(item.id)}
            />
          )}
          ListEmptyComponent={<SemTarefa />}
        />
      </View>
    </View>
  );
}
