import { View } from "react-native";
import BotaoComponent from "./BotaoComponent";
import InputComponent from "./InputComponent";

export default function AdicionarTarefa() {
  return (
    <View>
      <InputComponent placeholder={"Adicione uma nova Tarefa"} />
      <BotaoComponent BtnTxt={"Add"} />
    </View>
  );
}
