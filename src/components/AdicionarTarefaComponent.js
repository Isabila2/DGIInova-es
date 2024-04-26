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
  styleTxt,
}) {
  return (
    <View style={{ backgroundColor: "white",}}>
      <InputComponent
        placeholder={"Adicione uma nova Tarefa"}
        value={tarefa}
        onChangeText={onChangeText}
     style={styleAdd}
      />

      <BotaoImagemComponent
        name={"plus-circle-outline"}
        size={35}
        onPress={onPress}
        styleBtn={styleImg}
              />
      <View>
        <TxtComponent texto={"CRIADOS"} styleTxt={styleTxt}  />
        <View>
          <TxtComponent texto={QuantidadeTarefasCriadas}  styleTxt={styleTxt}/>
        </View>
      </View>
      <View>
        <TxtComponent texto={"Concluidos"}  styleTxt={styleTxt}/>
        <View>
          <TxtComponent texto={QuantidadeTarefasConcluidas} styleTxt={styleTxt} />
        </View>
      </View>
    </View>
  );
}
