import { View } from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoComponent from "../components/BotaoComponent";
import TxtComponent from "../components/TxtComponent";
import { useState } from "react";

export default function EntrarSala() {
  const [codigo, setCodigo] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Header Adicionar nova sala */}
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 0.2,
          width: "100%",
        }}
      >
        <InputComponent
          placeholder={"Entrar em nova Sala"}
          onChangeText={setCodigo}
          value={codigo}
        />
        <BotaoComponent BtnTxt={"Buscar Sala"} />
      </View>
      {/* Lista de Salas já Adicionadas */}
      <View>
        <TxtComponent texto={"Salas recentes"} />
      </View>
    </View>
  );
}
