import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TxtComponent from "./TxtComponent";

export default function SemTarefa() {
  return (
    <View>
      <MaterialCommunityIcons name="playlist-plus" size={50} />
      <TxtComponent texto={"Sem Tarefas adicionadas"} />
      <TxtComponent
        texto={"Adicione uma nova Tarefa e organize-se do seu jeito"}
      />
    </View>
  );
}
