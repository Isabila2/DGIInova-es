import { View } from "react-native";
import BotaoImagemComponent from "./BotaoImagemComponent";
import TxtComponent from "./TxtComponent";

export default function ContainerTarefa({
  TituloTarefa,
  completo,
  onPressCompleto,
  onPressExcluir,
  styleContainer,
  styleTexto,
  styleContai,
}) {
  return (
    <View
      style={{
        backgroundColor: "#ebebeb",
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        height: 50,
        width: "98%",
        marginLeft: 10,
        marginTop: 15,
        flex: 1,
      }}
    >
      <BotaoImagemComponent
        name={
          completo
            ? "checkbox-marked-circle-outline"
            : "checkbox-blank-circle-outline"
        }
        size={33}
        onPress={onPressCompleto}
        styleBtn={styleContainer}
      />
      <TxtComponent texto={TituloTarefa} styleTxt={styleTexto} />
      <View style={styleContai}>
        <BotaoImagemComponent
          name={"trash-can-outline"}
          size={33}
          onPress={onPressExcluir}
        />
      </View>
    </View>
  );
}
