import { View, Animated, FlatList, Text } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import { stylesHome } from "../styles/styleHome";
import { ScrollView } from "react-native";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native";
import TxtComponent from "../components/TxtComponent";
import React, { useState } from "react";
import FlatComponent from "../components/FlatListComponent";

export default function HomePrincipal() {
  // Const para a navegação
  const navigation = useNavigation();

  // Consts para a Animação
  const [largura, setLargura] = useState(new Animated.Value(0));
  const [altura, setAltura] = useState(new Animated.Value(30));

  Animated.sequence([
    Animated.timing(largura, {
      toValue: 400,
      duration: 2000,
    }),
    Animated.timing(altura, {
      toValue: 400,
      duration: 1000,
    }),
  ]).start();

  // Const para o FlatList
  const data = [
    {
      id: 1,

      txt: "Dinâmico",
    },
    {
      id: 2,

      txt: "Fácil e claro",
    },
    {
      id: 3,

      txt: "Prático",
    },
    {
      id: 4,

      txt: "Completo",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={stylesHome.caixas}>
      <TxtComponent texto={item.txt} />
    </View>
  );

  return (
    // View Principal
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Parte do Scrool View */}
      <ScrollView>
        {/* Parte do Boas-Vindas com animação */}
        <Animated.View
          style={{
            flex: 1,
            width: largura,
            height: altura,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Imagem da logo e botão para começar */}
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

        {/* Código do meio */}
        <View style={stylesHome.meio}>
          {/* Parte das imagens com texto motivacional */}
          <View style={stylesHome.box}>
            <ImagemComponent
              RotaImagem={require("../assets/Gifs/Task.gif")}
              style={stylesHome.gif}
            />
            <ImagemComponent
              RotaImagem={require("../assets/images/frase1.png")}
              style={stylesHome.frase}
            />
            <ImagemComponent
              RotaImagem={require("../assets/Gifs/homememulher.gif")}
              style={stylesHome.gif2}
            />
            <ImagemComponent
              RotaImagem={require("../assets/images/frase2.png")}
              style={stylesHome.frase2}
            />

            {/* Parte do FlatList  */}
            <View style={stylesHome.listas}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                horizontal={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Parte do footer com a imagem da logo */}
      <View style={stylesHome.footer}>
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={stylesHome.footerlogo}
        />
      </View>
    </View>
  );
}
