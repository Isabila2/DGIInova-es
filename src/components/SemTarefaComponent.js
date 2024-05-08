import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TxtComponent from "./TxtComponent";

export default function SemTarefa() {
  return (
    <View
      style={{
        backgroundColor: "#f6def6",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 90,
      }}
    >
      <MaterialCommunityIcons name="playlist-plus" size={60} />
      <TxtComponent
        texto={"Sem Tarefas adicionadas."}
        styleTxt={{ marginLeft: 10, fontWeight: "400" }}
      />
      <TxtComponent
        texto={"Crie novas Tarefas e se organize melhor!"}
        styleTxt={{ marginLeft: 10, fontWeight: "200" }}
      />
    </View>
  );
}
