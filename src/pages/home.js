// Importação de pacotes, componentes, stylesHome, etc
import React, { useState, useEffect } from "react";
import { View, Animated, Text, ActivityIndicator } from "react-native";
import ImagemComponent from "../components/ImagemComponent";
import { stylesHome, VIDEO_HEIGHT } from "../styles/styleHome";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import YoutubeIframe from "react-native-youtube-iframe";

export default function HomePrincipal() {
  // Variáveis para a animação: definindo a altura e a largura para 0, e fazendo o valor mudar quando a animação acontecer
  const navigation = useNavigation();
  const [largura, setLargura] = useState(new Animated.Value(0));
  const [altura, setAltura] = useState(new Animated.Value(30));

  // Variáveis para o vídeo
  const [select, setSelect] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // UseEffect do vídeo
  useEffect(() => {
    // Simulação de carregamento
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Código da animação: Os valores da largura e da altura se alteram durante o intervalo de tempo determinado
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
    // View Principal com alinhamento central e fundo branco com flex 1
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ScrollView e View animada. Apenas o que está dentro desta View irá receber a animação. O width e o height estão conectados ao código de animação acima e as variáveis */}
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
          {/* Component de Imagem com a imagem de LogoHome. */}
          <ImagemComponent
            RotaImagem={require("../assets/images/LogoHome.png")}
            style={stylesHome.img}
          />
        </Animated.View>

        {/* Essa é a View da parte do meio. Ela não recebe animação.  */}
        <View style={stylesHome.meio}>
          {/* Essa View está dento da View meio e apenas contém os Gifs e as Imagens */}
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

          {/* Esse é o código do vídeo do Youtube. Ele está dentro da View meio ainda. Ele tem o ID do vídeo para carregar o vídeo específico, além de ter uma animação de carregamento do vídeo*/}
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

          {/* A View do meio e o ScrollView acabam aqui */}
        </View>
      </ScrollView>

      {/* Essa é a View do rodapé. Está fora do ScrollView para não sair da tela e estar sempre frizada. Contém uma imagem */}
      <View style={stylesHome.footer}>
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={stylesHome.footerlogo}
        />
      </View>
    </View>
  );
}
