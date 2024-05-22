import {
  View,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import { stylesHome, VIDEO_HEIGHT } from "../styles/styleHome";
import { ScrollView } from "react-native";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native";
import TxtComponent from "../components/TxtComponent";
import React, { useState } from "react";
import FlatComponent from "../components/FlatListComponent";
import YoutubeIframe from "react-native-youtube-iframe";
import { ActivityIndicator } from "react-native";

export default function HomePrincipal() {
  // Const para a navegação
  const navigation = useNavigation();

  // Consts para a Animação
  const [largura, setLargura] = useState(new Animated.Value(0));
  const [altura, setAltura] = useState(new Animated.Value(30));
  // Abrir modal
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState(null);

  //Rodar vídeo
  const [videoReady, setVideoReady] = useState(false);

  visModal = (vis) => {
    !visible ? setVisible(vis) : setVisible(vis);
  };

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
          </View>

          <YoutubeIframe
            videoId="A6PWu3EH7Xw"
            height={VIDEO_HEIGHT}
            onReady={() => setVideoReady(true)}
          />
          {!videoReady && <ActivityIndicator color="red" />}
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
