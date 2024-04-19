import { View } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BotaoComponent from "../components/BotaoComponent";
import { styleUserHome } from "../styles/stylesUserHome";

export default function Footer() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* Parte do Boas-Vindas */}
        <View style={styleUserHome.inicio}>
          <BotaoComponent
            BtnTxt="Visualizar tarefas"
            OnPress={() => navigation.navigate("Tarefas")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
        </View>
      </ScrollView>
    </View>
  );
}
