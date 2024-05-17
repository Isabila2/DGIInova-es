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
  styleIcone,
}) {
  return (
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
        color="black"
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TxtComponent texto={TituloTarefa} styleTxt={styleTexto} />
      </View>
      <View style={styleContai}>
        <BotaoImagemComponent
          name={"trash-can-outline"}
          size={33}
          onPress={onPressExcluir}
          color="black"
          styleBtn={styleIcone}
        />
      </View>
    </View>
  );
}
