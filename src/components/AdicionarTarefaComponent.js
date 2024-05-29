// Import de pacotes, componentes, etc
import { View } from "react-native";
import InputComponent from "./InputComponent";
import TxtComponent from "./TxtComponent";
import BotaoImagemComponent from "./BotaoImagemComponent";
import { TouchableOpacity } from "react-native";

// Props
export default function AdicionarTarefa({
  onChangeText,
  tarefa,
  onPress,
  QuantidadeTarefasCriadas,
  QuantidadeTarefasConcluidas,
  styleAdd,
  styleImg,
  styleTxtt,
}) {
  return (
    // View principal
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      {/* Input e Touchable para adicionar tarefas */}
      <InputComponent
        placeholder={"Adicione uma nova Tarefa"}
        value={tarefa}
        onChangeText={onChangeText}
        style={styleAdd}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          height: 50,
          width: 45,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 60,
          marginLeft: 160,
          marginTop: -10,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.7,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <BotaoImagemComponent
          name={"plus-circle-outline"}
          size={40}
          onPress={onPress}
          styleBtn={styleImg}
          color="#DBA3DB"
        />
      </TouchableOpacity>

      {/* View do textos com as quantidades */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TxtComponent
          texto={
            "Criados: " +
            // variavel contantando as tarefas criadas na pagina
            QuantidadeTarefasCriadas +
            "                     " +
            "Concluídos: " +
            // variavel contandando as tarefas concluidas na pagina
            QuantidadeTarefasConcluidas
          }
          styleTxt={styleTxtt}
        />
      </View>
    </View>
  );
}
