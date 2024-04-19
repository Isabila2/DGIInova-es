import { View } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BotaoComponent from "../components/BotaoComponent";
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";
import { styleUserHome } from "../styles/stylesUserHome";

export default function HomeUsuario() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* Parte do Boas-Vindas */}
        <View style={styleUserHome.inicio}>
          <TxtComponent
            texto="Seja Bem-Vindo!"
            styleTxt={styleUserHome.txtboasv}
          />
          <ImagemComponent
            RotaImagem={require("../assets/images/LogoPrincipal.png")}
            style={styleUserHome.img}
          />
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
