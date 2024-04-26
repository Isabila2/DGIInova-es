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
  styleTxtt,

}) {
  return (
    <View style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center"}}>
      <InputComponent
        placeholder={"Adicione uma nova Tarefa"}
        value={tarefa}
        onChangeText={onChangeText}
     style={styleAdd}
      />

      <BotaoImagemComponent
        name={"plus-circle-outline"}
        size={30}
        onPress={onPress}
        styleBtn={styleImg}
              />
      <View>
        <TxtComponent texto={"CRIADOS"} styleTxt={styleTxt}  />
        <View>
          <TxtComponent texto={QuantidadeTarefasCriadas}  styleTxt={styleTxtt}/>
        </View>
      </View>
      <View>
        <TxtComponent texto={"CONCLUÍDOS"}  styleTxt={styleTxt}/>
        <View>
          <TxtComponent texto={QuantidadeTarefasConcluidas} styleTxt={styleTxtt} />
        </View>
      </View>
    </View>
  );
}
