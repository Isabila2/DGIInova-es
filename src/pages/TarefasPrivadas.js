import { View } from "react-native";
import HeaderTarefas from "../components/HeaderTarefasComponent";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";

export default function TarefasPrivadas() {
  return (
    <View>
      <HeaderTarefas />
      <View>
        <AdicionarTarefa />
      </View>
    </View>
  );
}
