// No arquivo HomeUsuario.js

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, TextComponent } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import {
  getUserData,
  getDocs,
  collection,
  db,
} from "../services/firebaseConfig";
import ModalCriarSalaComponent from "../components/ModalCriarSalaComponent";

//importando style e configurações do vídeo
import { styleUserHome, VIDEO_HEIGHT } from "../styles/stylesUserHome";

//importando youtubeIframe
import YoutubeIframe from "react-native-youtube-iframe";

//importando componentes
import BotaoComponent from "../components/BotaoComponent";
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";
import { set } from "react-hook-form";

//exportando as variaveis
export default function HomeUsuario() {
  const navigation = useNavigation();
  const [videoReady, setVideoReady] = useState(false);
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

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

  function AbrirModal() {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  useEffect(() => {
    loadRooms(); // Carregue as salas quando o componente for montado
  }, []);

  const loadRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Salas")); // Obtenha todas as salas do banco de dados
      const loadedRooms = []; // Array para armazenar as salas carregadas

      // Itere sobre os documentos da coleção de salas
      querySnapshot.forEach((doc) => {
        // Extraia os dados de cada sala
        const roomData = doc.data();
        const roomId = doc.id;

        // Adicione a sala ao array de salas carregadas
        loadedRooms.push({
          id: roomId,
          name: roomData.nome,
          // Outros campos da sala, se houver
        });
      });

      // Atualize o estado das salas com as salas carregadas
      setRooms(loadedRooms);
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
    }
  };

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
            BtnTxt="Minhas Tarefas"
            OnPress={() => navigation.navigate("TarefasPrivadas")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
          <BotaoComponent
            BtnTxt="Entrar em uma Sala"
            OnPress={() => navigation.navigate("Entrar em uma Sala")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
          <BotaoComponent
            BtnTxt="Criar uma Sala"
            OnPress={AbrirModal}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
          {/**Botão para entrar em uma sala já criada */}
          <BotaoComponent
            BtnTxt="Minhas Salas"
            OnPress={() => navigation.navigate("Minhas Salas")}
            style={styleUserHome.btn}
            styleTxtBtn={styleUserHome.txtbtn}
          />
          <ModalCriarSalaComponent
            visible={visible}
            Close={() => setVisible(false)}
            updateRooms={loadRooms}
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
