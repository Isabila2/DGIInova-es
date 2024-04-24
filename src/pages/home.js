import { View, Animated } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import { stylesHome } from "../styles/styleHome";
import { ScrollView } from "react-native";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native";
import TxtComponent from "../components/TxtComponent";
import React, { useState } from "react";

export default function HomePrincipal() {
  const navigation = useNavigation();
  const [largura, setLargura] = useState(new Animated.Value(0));
  const [altura, setAltura] = useState(new Animated.Value(30));

  Animated.sequence([
    Animated.timing(largura, {
      toValue: 360,
      duration: 2000,
    }),
    Animated.timing(altura, {
      toValue: 500,
      duration: 1000,
    }),
  ]).start();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        {/* Parte do Boas-Vindas */}
        <Animated.View
          style={[
            stylesHome.inicio,
            { flex: 1, width: largura, height: altura },
          ]}
        >
          <ImagemComponent
            RotaImagem={require("../assets/images/LogoHome.png")}
            style={stylesHome.img}
          />
          <BotaoComponent
            BtnTxt="Começe agora"
            OnPress={() => navigation.navigate("TarefasPrivadas")}
            style={stylesHome.btn}
            styleTxtBtn={stylesHome.txtbtn}
          />
        </Animated.View>
        {/* Código da parte descritiva */}
        <View style={stylesHome.meio}>
          <View style={stylesHome.box}>
            <ImagemComponent
              RotaImagem={require("../assets/Gifs/Task.gif")}
              style={stylesHome.gif}
            />
            <ImagemComponent
              RotaImagem={require("../assets/images/frase1.png")}
              style={stylesHome.frase}
            />
          </View>
        </View>
      </ScrollView>
      <View style={stylesHome.footer}></View>
    </View>
  );
}
