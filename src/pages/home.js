import { View } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import { stylesHome } from "../styles/styleHome";
import { ScrollView } from "react-native";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native";

export default function HomePrincipal() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* Parte do Boas-Vindas */}
        <View style={[stylesHome.inicio, { flex: 1 }]}>
          <ImagemComponent
            RotaImagem={require("../assets/images/LogoHome.png")}
            style={stylesHome.img}
          />
          <BotaoComponent
            BtnTxt="Começe agora"
            OnPress={() => navigation.navigate("Login")}
            style={stylesHome.btn}
            styleTxtBtn={stylesHome.txtbtn}
          />
        </View>
        {/* Código da parte descritiva */}
        <View style={[stylesHome.meio, { flex: 1 }]}>
          <ImagemComponent
            RotaImagem={require("../assets/images/LogoHome.png")}
            style={stylesHome.img}
          />
          <BotaoComponent
            BtnTxt="Começe agora"
            OnPress={() => navigation.navigate("Login")}
            style={stylesHome.btn}
            styleTxtBtn={stylesHome.txtbtn}
          />
        </View>
      </ScrollView>
    </View>
  );
}
