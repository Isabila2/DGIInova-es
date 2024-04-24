import { View } from "react-native";
import InputComponent from "./InputComponent";
import TxtComponent from "./TxtComponent";
import BotaoImagemComponent from "./BotaoImagemComponent";

export default function AdicionarTarefa({
  onChangeText,
  tarefa,
  onPress,
  QuantidadeTarefasCriadas,
  QuantidadeTarefasConcluidas,
}) {
  return (
    <View>
      <InputComponent
        placeholder={"Adicione uma nova Tarefa"}
        value={tarefa}
        onChangeText={onChangeText}
      />
      <BotaoImagemComponent
        name={"plus-circle-outline"}
        size={22}
        onPress={onPress}
      />
      <View>
        <TxtComponent texto={"Criados"} />
        <View>
          <TxtComponent texto={QuantidadeTarefasCriadas} />
        </View>
      </View>
      <View>
        <TxtComponent texto={"Concluidos"} />
        <View>
          <TxtComponent texto={QuantidadeTarefasConcluidas} />
        </View>
      </View>
    </View>
  );
}
