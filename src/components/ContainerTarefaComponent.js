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
        backgroundColor: "#cc68cc",
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 1,
        height: 50,
        width: "95%",
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
        color="white"
      />
      <TxtComponent texto={TituloTarefa} styleTxt={styleTexto} />
      <View style={styleContai}>
        <BotaoImagemComponent
          name={"trash-can-outline"}
          size={33}
          onPress={onPressExcluir}
          color="white"
        />
      </View>
    </View>
  );
}
