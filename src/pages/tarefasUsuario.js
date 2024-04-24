import React from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BotaoComponent from "../components/BotaoComponent";
import TxtComponent from "../components/TxtComponent";
import { styleUserHome } from "../styles/stylesUserHome";
import ListItem from "../components/ListItemComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Tarefas() {
  const navigation = useNavigation();
  const tarefas = [
    { id: "1", tarefa: "Teste 1", descricao: "Descrição teste 1" },
    { id: "2", tarefa: "Teste 2", descricao: "Descrição teste 2" },
    { id: "3", tarefa: "Teste 3", descricao: "Descrição teste 3" },
    { id: "4", tarefa: "Teste 4", descricao: "Descrição teste 4" },
  ];

  const handleTarefaConcluida = (id) => {
    alert(`Tarefa ${id} concluída com sucesso!`);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Parte do Boas-Vindas */}
      <View style={styleUserHome.inicio}>
        <TxtComponent
          texto="Minhas Tarefas"
          styleTxt={styleUserHome.txtboasv}
        />
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem data={item} handleLeft={handleTarefaConcluida} />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
        <BotaoComponent
          BtnTxt="Home"
          OnPress={() => navigation.navigate("Home")}
          style={styleUserHome.btn}
          styleTxtBtn={styleUserHome.txtbtn}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const Separator = () => <View style={{ height: 1, backgroundColor: "#DDD" }} />;
