import { View, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BotaoComponent from "../components/BotaoComponent";
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";
import { styleUserHome, VIDEO_HEIGHT } from "../styles/stylesUserHome";
import YoutubeIframe from "react-native-youtube-iframe";
import React, { useState } from "react";

export default function HomeUsuario() {
  const navigation = useNavigation();
  const [videoReady, setVideoReady] = useState(false);
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
            BtnTxt="Criar uma Sala Privada"
            OnPress={() => navigation.navigate("Tarefas")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
          <BotaoComponent
            BtnTxt="Entrar em uma Sala"
            OnPress={() => navigation.navigate("Tarefas")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
        </View>
        <View>
          <YoutubeIframe
            videoId="A6PWu3EH7Xw"
            height={VIDEO_HEIGHT}
            onReady={() => setVideoReady(true)}
          />
          {!videoReady && <ActivityIndicator color="#d3d3d3" />}
        </View>
      </ScrollView>
    </View>
  );
}
