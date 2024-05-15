import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
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
import { MaterialIcons } from "@expo/vector-icons";
import { styleUserHome, VIDEO_HEIGHT } from "../styles/stylesUserHome";
import YoutubeIframe from "react-native-youtube-iframe";
import BotaoComponent from "../components/BotaoComponent";
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";

export default function HomeUsuario() {
  const navigation = useNavigation();
  const [videoReady, setVideoReady] = useState(false);
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Salas"));
      const loadedRooms = [];

      querySnapshot.forEach((doc) => {
        const roomData = doc.data();
        const roomId = doc.id;

        loadedRooms.push({
          id: roomId,
          name: roomData.nome,
        });
      });

      setRooms(loadedRooms);
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
    }
  };

  function AbrirModal() {
    setVisible(!visible);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styleUserHome.inicio}>
          <ImagemComponent
            RotaImagem={require("../assets/images/imghomeuser.png")}
            style={styleUserHome.imgHomeU}
          />
          <View
            style={{ backgroundColor: "white", width: "100%", height: "1" }}
          >
            <TxtComponent
              texto={`Seja Bem-Vindo(a), ${userData ? userData.usuario : ""}!`}
              styleTxt={styleUserHome.txtboasv}
              style={styleUserHome.bemvind}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Tarefas")}>
              <ImageBackground
                source={require("../assets/images/CriarSala.png")}
                style={styleUserHome.imgBtn1}
              >
                <TxtComponent
                  texto="Minhas Tarefas"
                  styleTxt={styleUserHome.txtbtn}
                />
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Entrar em uma Sala")}
            >
              <ImageBackground
                source={require("../assets/images/EntrarSala.png")}
                style={styleUserHome.imgBtn1}
              >
                <TxtComponent
                  texto="Entrar em uma Sala"
                  styleTxt={styleUserHome.txtbtn}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={AbrirModal}>
              <ImageBackground
                source={require("../assets/images/MinhaTarefas.png")}
                style={styleUserHome.imgBtn1}
              >
                <TxtComponent
                  texto="Criar uma Sala"
                  styleTxt={styleUserHome.txtbtn}
                />
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Minhas Salas")}
            >
              <ImageBackground
                source={require("../assets/images/MinhasSalas.png")}
                style={styleUserHome.imgBtn1}
              >
                <TxtComponent
                  texto="Minhas Salas"
                  styleTxt={styleUserHome.txtbtn}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        <ModalCriarSalaComponent
          visible={visible}
          Close={() => setVisible(false)}
          updateRooms={loadRooms}
        />

        <View style={{ marginTop: 100 }}>
          <View
            style={{ backgroundColor: "white", width: "100%", height: "1" }}
          />
          <YoutubeIframe
            videoId="A6PWu3EH7Xw"
            height={VIDEO_HEIGHT}
            onReady={() => setVideoReady(true)}
          />
          {!videoReady && <ActivityIndicator color="red" />}
        </View>
      </ScrollView>
    </View>
  );
}
