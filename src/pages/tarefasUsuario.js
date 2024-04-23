import { View } from "react-native";
import { ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BotaoComponent from "../components/BotaoComponent";
import TxtComponent from "../components/TxtComponent";
import { styleUserHome } from "../styles/stylesUserHome";
import ListItem from "../components/ListItemComponent";

export default function Tarefas() {
  const navigation = useNavigation();
  const tarefas = [
    { id: "1", tarefa: "Teste 1" },
    { id: "2", tarefa: "Teste 2" },
    { id: "3", tarefa: "Teste 3" },
    { id: "4", tarefa: "Teste 4" },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
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
              <ListItem
                data={item}
                handleLeft={() => alert("Tarefa concluida com sucesso!")}
              />
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
      </ScrollView>
    </View>
  );
}

const Separator = () => (
  <View style={{ flex: 1, height: 1, backgroundColor: "#DDD" }}></View>
);
