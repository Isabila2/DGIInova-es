import { View } from "react-native";
import InputComponent from "./InputComponent";
import TxtComponent from "./TxtComponent";
import BotaoImagemComponent from "./BotaoImagemComponent";
import styleTarefa from "../styles/styleTarefas";

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
        backgroundColor: "#white",
      }}
    >
      <InputComponent
        placeholder={"Adicione uma nova Tarefa"}
        style={{ color: "black" }}
        value={tarefa}
        onChangeText={onChangeText}
        style={styleAdd}
      />

      <BotaoImagemComponent
        name={"plus-circle-outline"}
        size={40}
        onPress={onPress}
        styleBtn={styleImg}
        color="black"
      />

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
