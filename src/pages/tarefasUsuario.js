import { View } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BotaoComponent from "../components/BotaoComponent";
import TxtComponent from "../components/TxtComponent";
import { styleUserHome } from "../styles/stylesUserHome";

export default function Tarefas() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* Parte do Boas-Vindas */}
        <View style={styleUserHome.inicio}>
          <TxtComponent
            texto="Minhas Tarefas"
            styleTxt={styleUserHome.txtboasv}
          />

          <BotaoComponent
            BtnTxt="Home só"
            OnPress={() => navigation.navigate("Home")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
        </View>
      </ScrollView>
    </View>
  );
}
