// Importação de pacotes, componentes, styleTarefa, etc
import { Alert, FlatList, View } from "react-native";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { styleTarefa } from "../styles/styleTarefas";
import ImagemComponent from "../components/ImagemComponent";
import { ScrollView } from "react-native";

export default function TarefasSemLogin() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const definirCompleto = (id) => {
    // "(prevTarefas)" Recebe o estado anterior de Tarefas como argumento e retorna o novo estado.
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        // Verifica se o Id da tarefa é igual ao Id passado para a função de DefinirCompleto
        // se for ele cria um novo Objeto tarefa só alterando o valor de "Completo"
        // Se não for igual ele não altera nada
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
    if (novaTarefa.length <= 4) {
      Alert.alert("Erro", "Digite no minimo 5 letras para adicionar");
    }
    if (novaTarefa !== "" && novaTarefa.length >= 5) {
      const novaTarefaObj = {
        // Usei o uuidv4 para criar o id de cada Tarefa
        id: uuidv4(),
        completo: false,
        titulo: novaTarefa,
      };
      // Adiciona a nova tarefa, preservando as outras já adicionadas
      setTarefas((prevTarefas) => [...prevTarefas, novaTarefaObj]);
      setNovaTarefa("");
    }
  };
  const TotalTarefasCriadas = tarefas.length;
  const TotalTarefasConcluidas = tarefas.filter(
    ({ completo }) => completo
  ).length;

  return (
    // View de início
    <View style={styleTarefa.inicio}>
      {/* ScrollView começa aqui */}
      <ScrollView>
        <ImagemComponent
          RotaImagem={require("../assets/images/semlogintarefas.png")}
          style={styleTarefa.img}
        />
        {/* View onde tem o input e o botão para adicionar tarefa */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* Component com Input, Botão de adicionar e Contadores de Tarefas, com o Component AdcionarTarefa */}
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
          {/* Essa é a lista de Tarefas com o Component ContainerTarefa*/}
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
                onPressCompleto={() => definirCompleto(item.id)}
                onPressExcluir={() => ExcluirTarefa(item.id)}
              />
            )}
            // caso não houver nenhum item na lista, renderiza o component "SemTarefa"
            ListEmptyComponent={<SemTarefa />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
