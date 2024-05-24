import React, { useState, useEffect } from "react";
import {
  View,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import { stylesHome, VIDEO_HEIGHT } from "../styles/styleHome";
import { ScrollView } from "react-native";
import BotaoComponent from "../components/BotaoComponent";
import { useNavigation } from "@react-navigation/native";
import TxtComponent from "../components/TxtComponent";
import FlatComponent from "../components/FlatListComponent";
import YoutubeIframe from "react-native-youtube-iframe";

export default function HomePrincipal() {
  const navigation = useNavigation();
  const [largura, setLargura] = useState(new Animated.Value(0));
  const [altura, setAltura] = useState(new Animated.Value(30));
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  visModal = (vis) => {
    setVisible(vis);
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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView>
        <Animated.View
          style={{
            flex: 1,
            width: largura,
            height: altura,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImagemComponent
            RotaImagem={require("../assets/images/LogoHome.png")}
            style={stylesHome.img}
          />
        </Animated.View>

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
          {loading && <ActivityIndicator color="red" />}
          {!loading && !videoReady && (
            <Text style={{ color: "red", marginTop: 10 }}>
              Failed to load video.
            </Text>
          )}
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
