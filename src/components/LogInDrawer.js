import { View } from "react-native";
import ImagemComponent from "./ImagemComponent";
import TxtComponent from "./TxtComponent";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { getUserData } from "../services/firebaseConfig";
import { styleUserHome } from "../styles/stylesUserHome";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import BotaoComponent from "./BotaoComponent";

export default function LogInDrawer() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

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
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <MaterialCommunityIcons name="account-circle" size={70} />
        <TxtComponent
          texto={`Olá, ${userData ? userData.usuario : ""}!`}
          styleTxt={{ marginLeft: 5 }}
        />
        <View>
          <BotaoComponent
            BtnTxt={"Minha Conta"}
            OnPress={() => navigation.navigate("Minha Conta")}
          />
        </View>
      </View>
    </View>
  );
}
