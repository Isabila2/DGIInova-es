import { View } from "react-native";
import BotaoImagemComponent from "./BotaoImagemComponent";
import TxtComponent from "./TxtComponent";

export default function ContainerTarefa({
  // Props
  TituloTarefa,
  completo,
  onPressCompleto,
  onPressExcluir,
  styleContainer,
  styleTexto,
  styleContai,
  styleIcone,
}) {
  return (
    // View do props do container tarefas - a tarefa em si
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 1,
        height: 80,
        width: "95%",
        marginLeft: 10,
        marginTop: 20,
        flexDirection: "row",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10,
      }}
    >
      {/* Botão de confirmar as tarefas */}
      <BotaoImagemComponent
        // criando um if ternario para alternar o icone caso seja concluido a tarefa
        name={
          completo
            ? "checkbox-marked-circle-outline"
            : "checkbox-blank-circle-outline"
        }
        size={33}
        onPress={onPressCompleto}
        styleBtn={styleContainer}
        color="#a2a0a02"
      />

      {/* O texto da tarefa */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TxtComponent texto={TituloTarefa} styleTxt={styleTexto} />
      </View>

      {/* Botão de excluir tarefa */}
      <View style={styleContai}>
        <BotaoImagemComponent
          name={"trash-can-outline"}
          size={33}
          onPress={onPressExcluir}
          color="#a2a0a0"
          styleBtn={styleIcone}
        />
      </View>
    </View>
  );
}
