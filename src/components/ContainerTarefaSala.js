import { View } from "react-native";
import BotaoImagemComponent from "./BotaoImagemComponent";
import TxtComponent from "./TxtComponent";

export default function ContainerTarefaSala({
  TituloTarefa,
  completo,
  onPressCompleto,
}) {
  return (
    <View>
      <BotaoImagemComponent
        name={
          completo
            ? "checkbox-marked-circle-outline"
            : "checkbox-blank-circle-outline"
        }
        size={20}
        onPress={onPressCompleto}
      />
      <TxtComponent texto={TituloTarefa} />
    </View>
  );
}
