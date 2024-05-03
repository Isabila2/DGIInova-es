// No arquivo HomeUsuario.js

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, TextComponent } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import { getUserData } from "../services/firebaseConfig";

//importando style e configurações do vídeo
import { styleUserHome, VIDEO_HEIGHT } from "../styles/stylesUserHome";

//importando youtubeIframe
import YoutubeIframe from "react-native-youtube-iframe";

//importando componentes
import BotaoComponent from "../components/BotaoComponent";
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";

//exportando as variaveis
export default function HomeUsuario() {
  const navigation = useNavigation();
  const [videoReady, setVideoReady] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Função para obter os dados do usuário após o login
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userData = await getUserData(user.uid);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* Parte do Boas-Vindas */}
        <View style={styleUserHome.inicio}>
          <TxtComponent
            texto={`Seja Bem-Vindo, ${userData ? userData.usuario : ""}!`}
            styleTxt={styleUserHome.txtboasv}
          />
          {/**imagem da Logo principal */}
          <ImagemComponent
            RotaImagem={require("../assets/images/LogoPrincipal.png")}
            style={styleUserHome.img}
          />
          {/**Botão para criar uma sala */}
          <BotaoComponent
            BtnTxt="Entrar em uma Sala"
            OnPress={() => navigation.navigate("TarefasPrivadas")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />

          {/**Botão para entrar em uma sala já criada */}
          <BotaoComponent
            BtnTxt="Criar uma Sala Privada"
            OnPress={() => navigation.navigate("Tarefas")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
        </View>
        <View style={{ marginTop: 100 }}>
          {/**Vídeo explicativo sobre "como usar o site" */}
          <TxtComponent texto="Tutorial" styleTxt={styleUserHome.txttutorial} />
          <YoutubeIframe
            videoId="A6PWu3EH7Xw"
            height={VIDEO_HEIGHT}
            onReady={() => setVideoReady(true)}
          />
          {/** Carregamento do vídeo */}
          {!videoReady && <ActivityIndicator color="red" />}
        </View>
      </ScrollView>
    </View>
  );
}
