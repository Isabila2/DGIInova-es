import { View } from "react-native";
import InputComponent from "./InputComponent";
import TxtComponent from "./TxtComponent";
import BotaoImagemComponent from "./BotaoImagemComponent";
import styleTarefa from "../styles/styleTarefas";
import { TouchableOpacity } from "react-native";

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
    <View
      style={{
        backgroundColor: "white",
      }}
    >
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

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TxtComponent
          texto={
            "Criados: " +
            QuantidadeTarefasCriadas +
            "                     " +
            "Concluídos: " +
            QuantidadeTarefasConcluidas
          }
          styleTxt={styleTxtt}
        />
      </View>
    </View>
  );
}
