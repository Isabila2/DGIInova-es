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
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeUsuario() {
  const navigation = useNavigation();
  const [videoReady, setVideoReady] = useState(false);
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loadingVideo, setLoadingVideo] = useState(true); // Estado para controle do indicador de carregamento do vídeo

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TxtComponent
                texto={`Seja Bem-Vindo(a),`}
                styleTxt={styleUserHome.txtboasv}
                style={styleUserHome.bemvind}
              />
              <TxtComponent
                texto={` ${userData ? userData.usuario : ""}!`}
                styleTxt={styleUserHome.txtboasvinda}
                style={styleUserHome.bemvind}
              />
            </View>
            <ImagemComponent
              RotaImagem={require("../assets/images/txtRec.png")}
              style={styleUserHome.imgRec}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Minhas Tarefas")}
              style={styleUserHome.btn}
            >
              <MaterialIcons name="folder-shared" size={110} color="#D87AD8" />
              <TxtComponent
                texto="   Minhas Tarefas   "
                styleTxt={styleUserHome.txtbtn2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Entrar em uma Sala")}
              style={styleUserHome.btn}
            >
              <MaterialCommunityIcons
                name="folder-search"
                size={110}
                color="#D87AD8"
              />
              <TxtComponent
                texto="Entrar em uma Sala"
                styleTxt={styleUserHome.txtbtn2}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={AbrirModal} style={styleUserHome.btn}>
              <MaterialIcons
                name="create-new-folder"
                size={110}
                color="#D87AD8"
              />
              <TxtComponent
                texto="   Criar uma Sala   "
                styleTxt={styleUserHome.txtbtn}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Minhas Salas")}
              style={styleUserHome.btn}
            >
              <MaterialIcons name="folder-copy" size={110} color="#D87AD8" />
              <TxtComponent
                texto="     Minhas Salas     "
                styleTxt={styleUserHome.txtbtn}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ModalCriarSalaComponent
          visible={visible}
          Close={() => setVisible(false)}
          updateRooms={loadRooms}
        />
        <ImagemComponent
          RotaImagem={require("../assets/images/txtAnun.png")}
          style={styleUserHome.imgAnun}
        />

        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <View
            style={{ backgroundColor: "white", width: "100%", height: "1" }}
          />
          <YoutubeIframe
            videoId="3XzQ7jErQnc"
            height={VIDEO_HEIGHT}
            onReady={() => {
              setVideoReady(true);
              setLoadingVideo(false); // Quando o vídeo estiver pronto, desativa o indicador de carregamento
            }}
          />
          {loadingVideo && <ActivityIndicator color="red" />}
          {/* Mostra o indicador de carregamento enquanto o vídeo está sendo carregado */}
        </View>

        <View style={styleUserHome.footer}>
          <ImagemComponent
            RotaImagem={require("../assets/images/LogoPrincipal.png")}
            style={styleUserHome.footerlogo}
          />
        </View>
      </ScrollView>
    </View>
  );
}
