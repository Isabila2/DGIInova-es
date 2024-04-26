import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TxtComponent from "./TxtComponent";


export default function SemTarefa() {
  return (
    <View>
      <MaterialCommunityIcons name="playlist-plus" size={55}  style={{ marginLeft: 10,}} />
      <TxtComponent texto={"Sem Tarefas adicionadas."} styleTxt={{marginLeft: 10,}} />
      <TxtComponent
        texto={"Adicione uma nova Tarefa e organize-se do seu jeito"} styleTxt={{marginLeft: 10,}}
      />
    
    </View>
  );
}
