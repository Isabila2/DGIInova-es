import { View } from "react-native";
import BotaoImagemComponent from "./BotaoImagemComponent";
import TxtComponent from "./TxtComponent";
import { styleTarefa } from "../styles/styleTarefas";

export default function ContainerTarefaSala({
  // Props
  TituloTarefa,
  completo,
  onPressCompleto,
}) {
  return (
    <View>
      <BotaoImagemComponent
        // usando novamente o if ternario  para mudar o icone caso seja concluido a tarefa
        name={
          completo
            ? "checkbox-marked-circle-outline"
            : "checkbox-blank-circle-outline"
        }
        size={20}
        onPress={onPressCompleto}
        styleTarefa={styleTarefa.btn}
      />
      <TxtComponent texto={TituloTarefa} />
    </View>
  );
}
