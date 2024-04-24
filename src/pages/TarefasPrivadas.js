import { FlatList, View } from "react-native";
import HeaderTarefas from "../components/HeaderTarefasComponent";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TarefasPrivadas() {
  const [completo, SetCompleto] = useState(false);
  const [tarefa, SetTarefa] = useState([]);
  const DefinirCompleto = (id) => {
    SetTarefa((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completo: !tarefa.completo } : tarefa
      )
    );
  };
  const [NovaTarefa, setNovaTarefa] = useState("");

  function AddTarefa() {
    const novaTarefa = { id: uuidv4(), completo: false, titulo: NovaTarefa };
    if (NovaTarefa !== "" && NovaTarefa.length >= 5) {
      SetTarefa((prevTarefas) => [...prevTarefas, novaTarefa.trim()]);
      setNovaTarefa("");
    }
  }
  return (
    <View>
      <HeaderTarefas />
      {/* View onde tem o input e o botão para adicionar tarefa */}
      <View>
        <AdicionarTarefa
          tarefa={NovaTarefa}
          onChangeText={setNovaTarefa}
          onPress={AddTarefa}
        />
      </View>
      {/* View onde aparece as tarefas */}
      <View>
        <FlatList
          data={tarefa}
          keyExtractor={(tarefa) => tarefa.id}
          renderItem={({ item }) => (
            <ContainerTarefa
              TituloTarefa={item.titulo}
              completo={item.completo}
              onPressCompleto={() => DefinirCompleto(item.id)}
            />
          )}
          ListEmptyComponent={<SemTarefa />}
        />
      </View>
    </View>
  );
}
