// Importação de pacotes, componentes, styleUserHome, etc
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
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
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeUsuario() {
  // Variáveis de navegação, para o vídeo e para as outras funções
  const navigation = useNavigation();
  const [videoReady, setVideoReady] = useState(false);
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loadingVideo, setLoadingVideo] = useState(true);

  // useEffect para atualizar e colocar o nome do Usuário na Home
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
      // faz uma consulta para pegar todos os Documentos na coleção "Salas"
      const querySnapshot = await getDocs(collection(db, "Salas"));
      // Cria um Array vazio para armazenar as informações encontradas
      const loadedRooms = [];

      querySnapshot.forEach((doc) => {
        // Obtém os dados do Documento do Banco de Dados
        const roomData = doc.data();
        // Salva o Id da Sala
        const roomId = doc.id;

        // Passa as informações para a const "loadedRooms"
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
    // View Principal com fundo branco e flex 1
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Scroll View começa aqui  */}
      <ScrollView>
        {/* View de Início com a imagem principal */}
        <View style={styleUserHome.inicio}>
          <ImagemComponent
            RotaImagem={require("../assets/images/imghomeuser.png")}
            style={styleUserHome.imgHomeU}
          />

          {/* View para alinhamento, pois sem ela, os botões ficam tortos */}
          <View
            style={{ backgroundColor: "white", width: "100%", height: "1" }}
          >
            {/* View de Boas Vindas. Ela tem 2 TxtComponents com um texto pronto e outro com o texto que puxa o nome do usuário  */}
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

            {/* Imagem de Recursos */}
            <ImagemComponent
              RotaImagem={require("../assets/images/txtRec.png")}
              style={styleUserHome.imgRec}
            />
          </View>

          {/* View com 2 botões de recursos. Os Touchables são os botões. Eles direcionam para outras páginas */}
          <View style={{ flexDirection: "row" }}>
            {/* Botão Minhas Tarefas */}
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

            {/* Botão Entrar em uma Sala */}
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

          {/* View com 2 botões de recursos. Os Touchables são os botões. Eles direcionam para outras páginas ou abrem um modal (Criar uma Sala) */}
          <View style={{ flexDirection: "row" }}>
            {/* Botão modal Criar Sala */}
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

            {/* Botão Minhas Salas */}
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

        {/* Código do Modal */}
        <ModalCriarSalaComponent
          visible={visible}
          Close={() => setVisible(false)}
          updateRooms={loadRooms}
        />

        {/* Imagem em cima do vídeo */}
        <ImagemComponent
          RotaImagem={require("../assets/images/txtAnun.png")}
          style={styleUserHome.imgAnun}
        />

        {/* View para o vídeo */}
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <View
            style={{ backgroundColor: "white", width: "100%", height: "1" }}
          />
          {/* Esse é o código do vídeo do Youtube. Ele está dentro da View meio ainda. Ele tem o ID do vídeo para carregar o vídeo específico, além de ter uma animação de carregamento do vídeo*/}

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

        {/* Essa é a View do rodapé. Está fora do ScrollView para não sair da tela e estar sempre frizada. Contém uma imagem */}
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
