import {
  View,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
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
  // Abrir modal
  const [visible, setVisible] = useState(false);

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

  // Const para o FlatList
  const data = [
    {
      id: 1,
      txtextra: "É DINAMICOO",
      txt: "Dinâmico",
    },
    {
      id: 2,
      txtextra: "É FÁCIL E CLARO",
      txt: "Fácil e claro",
    },
    {
      id: 3,
      txtextra: "É PRÁTICO",
      txt: "Prático",
    },
    {
      id: 4,
      txtextra: "É COMPLETO",
      txt: "Completo",
    },
  ];

  const renderItem = ({ item }) => (
    <View>
      {/* View do botão que aparece na home */}
      <View style={stylesHome.caixas}>
        <TouchableOpacity
          onPress={() => visModal(true)}
          style={stylesHome.touchable}
        >
          <TxtComponent texto={item.txt} />
        </TouchableOpacity>
      </View>
      {/*Modal e View do modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View style={stylesHome.modal}>
          <TxtComponent texto={item.txtextra} />
          <TouchableOpacity onPress={() => visModal(false)}>
            <TxtComponent texto="Fechar" styleTxt={stylesHome.txtmodal} />
          </TouchableOpacity>
        </View>
      </Modal>
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
