import { View } from "react-native";
import BotaoImagemComponent from "./BotaoImagemComponent";
import TxtComponent from "./TxtComponent";

export default function ContainerTarefa({
  TituloTarefa,
  completo,
  onPressCompleto,
  onPressExcluir,
  styleContainer
}) {
  return (
    <View >
      <BotaoImagemComponent style={{BackgroundColor: "red"}}
        name={
          completo
            ? "checkbox-marked-circle-outline"
            : "checkbox-blank-circle-outline"
        }
        size={33}
        onPress={onPressCompleto}
        styles={styleContainer}
      />
      <TxtComponent texto={TituloTarefa} />
      <BotaoImagemComponent style={{BackgroundColor: "pink"}}
        name={"trash-can-outline"}
        size={33}
        onPress={onPressExcluir}
        styles={styleContainer}
      />
    </View>
  );
}
