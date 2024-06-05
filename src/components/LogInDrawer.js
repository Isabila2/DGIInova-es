import { View } from "react-native";
import ImagemComponent from "./ImagemComponent";
import TxtComponent from "./TxtComponent";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { getUserData } from "../services/firebaseConfig";
import { styleUserHome } from "../styles/stylesUserHome";

import { Feather } from "@expo/vector-icons";

export default function LogInDrawer() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Função para tentar pegar os dados do usuário após o login
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
    <View
      style={{
        marginTop: 50,
      }}
    >
      {/* A Imagem que fica no menu */}
      <ImagemComponent
        RotaImagem={require("../assets/images/DrawerFnd.png")}
        style={styleUserHome.img}
      />
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        {/* Icone de usuário (transparente) e texto de Boas-Vindas*/}
        <Feather name="user" size={24} color="white" />
        <TxtComponent
          // Para aparecer o nome do usuario, caso não consiga aparecer ""
          texto={`Olá, ${userData ? userData.usuario : ""}!`}
          styleTxt={{ marginLeft: 5, color: "#00000080" }}
        />
      </View>
    </View>
  );
}
