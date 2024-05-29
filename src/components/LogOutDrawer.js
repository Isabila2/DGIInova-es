import { View } from "react-native";
import BotaoImagemComponent from "./BotaoImagemComponent";
import ImagemComponent from "./ImagemComponent";
import TxtComponent from "./TxtComponent";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { getUserData } from "../services/firebaseConfig";
import { styleUserHome } from "../styles/stylesUserHome";

export default function LogOutDrawer() {
  const [userData, setUserData] = useState(null);

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
        marginTop: 20,
        justifyContent: "flex-end",
      }}
    >
      <View style={{ flexDirection: "row", marginTop: 1 }}>
        <BotaoImagemComponent
          MaterialIcons
          name="logout"
          size={30}
          color="#c0c0c0"
          onPress={handleLogout}
          styleBtn={styleUserHome.lougout}
        />
        <TxtComponent texto="Sair" styleTxt={styleUserHome.sairtxt} />
      </View>
    </View>
  );
}
