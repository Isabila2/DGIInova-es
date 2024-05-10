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
  const [select, setSelect] = useState(null);

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
  const dinamico = require("../assets/Gifs/Dinamico.gif");
  const facil = require("../assets/Gifs/Facil.gif");
  const pratico = require("../assets/Gifs/Pratico.gif");
  const completo = require("../assets/Gifs/Completed.gif");

  const data = [
    {
      id: 1,
      txtextra:
        "Com um design dinâmico e intuitivo, o Task Management é a escolha ideal para quem busca otimizar sua produtividade. Este gerenciador de tarefas oferece uma variedade de recursos poderosos, desde a organização de projetos até o acompanhamento do progresso em tempo real. ",
      txt: "Dinâmico",
      img: dinamico,
    },
    {
      id: 2,
      txtextra:
        "Com uma abordagem fácil e clara, o Taks Management simplifica o gerenciamento de tarefas como nunca antes. Desde a atribuição de tarefas até o monitoramento do progresso, o Taks Management oferece todas as ferramentas necessárias para uma gestão eficaz.",
      txt: "Fácil e claro",
      img: facil,
    },
    {
      id: 3,
      txtextra:
        "O Taks Management é um gerenciador de tarefas prático, projetado para simplificar o seu dia a dia. Simplifique sua rotina e alcance seus objetivos com facilidade, utilizando essa poderosa plataforma de gestão de tarefas, garantindo produtividade e controle.",
      txt: "Prático",
      img: pratico,
    },
    {
      id: 4,
      txtextra:
        "O Taks Management é um gerenciador de tarefas completo, ideal para quem busca organização e eficiência em suas atividades diárias. Com uma ampla gama de recursos, desde a criação de listas personalizadas até a definição de lembretes e prioridades. ",
      txt: "Completo",
      img: completo,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {/* View do botão que aparece na home */}
      <View style={stylesHome.caixas}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
            setSelect(item.txtextra);
          }}
          style={stylesHome.touchable}
        >
          <ImagemComponent RotaImagem={item.img} style={stylesHome.gifmodal} />
          <TxtComponent texto={item.txt} />
        </TouchableOpacity>
      </View>
      {/*Modal e View do modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <View style={stylesHome.modal}>
          <View
            style={{
              backgroundColor: "#efd4ef",
              width: 280,
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TxtComponent texto={select} styleTxt={stylesHome.txtmodal} />
          </View>
          <TouchableOpacity onPress={() => visModal(false)}>
            <TxtComponent texto="Fechar" styleTxt={stylesHome.txtmodalbtn} />
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
                horizontal={false}
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
