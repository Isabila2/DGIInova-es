import { View } from "react-native";
import BotaoImagemComponent from "./BotaoImagemComponent";
import ImagemComponent from "./ImagemComponent";
import TxtComponent from "./TxtComponent";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { getUserData } from "../services/firebaseConfig";
import { styleUserHome } from "../styles/stylesUserHome";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LogInDrawer() {
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
      style={{
        marginTop: 50,
      }}
    >
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoPrincipal.png")}
        style={styleUserHome.img}
      />
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <MaterialCommunityIcons name="account-circle" size={70} />
        <TxtComponent texto={`Olá ${userData ? userData.usuario : ""}!`} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <BotaoImagemComponent
          name={"exit-run"}
          size={50}
          color={"gray"}
          onPress={handleLogout}
          styleBtn={styleUserHome.lougout}
        />
        <TxtComponent texto="Sair" styleTxt={styleUserHome.sairtxt} />
      </View>
    </View>
  );
}
