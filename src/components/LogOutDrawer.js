import { View } from "react-native";
import BotaoImagemComponent from "./BotaoImagemComponent";
import ImagemComponent from "./ImagemComponent";
import TxtComponent from "./TxtComponent";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { getUserData } from "../services/firebaseConfig";
import { styleUserHome } from "../styles/stylesUserHome";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LogOutDrawer() {
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}
    >
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoPrincipal.png")}
        style={styleUserHome.img}
      />
      <MaterialCommunityIcons name="account-circle" size={100} />
      <TxtComponent texto={`Olá ${userData ? userData.usuario : ""}!`} />
      <BotaoImagemComponent
        name={"exit-run"}
        size={50}
        color={"gray"}
        onPress={handleLogout}
        texto={"Sair"}
      />
    </View>
  );
}
