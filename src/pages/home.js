import { View } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import { stylesHome } from "../styles/styleHome";
import { ScrollView } from "react-native";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native";
import TxtComponent from "../components/TxtComponent";

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
        <View style={stylesHome.meio}>
          <View style={stylesHome.box}>
            <ImagemComponent
              RotaImagem={require("../assets/images/Sobre.png")}
              style={stylesHome.titulo}
            />
            <View style={stylesHome.cardtxt}>
              <TxtComponent
                styleTxt={stylesHome.txt}
                texto=" O Task Management é um site voltado para a organização e o gerenciamento de tarefas."
              />
              <TxtComponent
                styleTxt={stylesHome.txt}
                texto="Usando o site, o usuário tem total acesso ás suas atividades pendentes, além de poder visualizar as passadas."
              />
              <TxtComponent
                styleTxt={stylesHome.txt}
                texto="Com seu design limpo, moderno e claro, qualquer um pode se tornar organizado de forma simples e rápido."
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={stylesHome.footer}>
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={stylesHome.footerlogo}
        />
      </View>
    </View>
  );
}
