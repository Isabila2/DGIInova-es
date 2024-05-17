import { View } from "react-native";
import BotaoComponent from "./BotaoComponent";
import TxtComponent from "./TxtComponent";
import { auth } from "../services/firebaseConfig";
import { getUserData } from "../services/firebaseConfig";
import { useState, useEffect } from "react";
import ModalEditarPerfil from "./ModalEditarInformações";

export default function MinhaConta() {
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);

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
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <View>
        <View style>
          <TxtComponent
            texto={`Usuario: ${userData ? userData.usuario : ""}`}
          />
        </View>
        <View>
          <TxtComponent texto={`Email: ${userData ? userData.email : ""}`} />
        </View>
        <BotaoComponent
          BtnTxt={"Editar informações"}
          OnPress={() => setVisible(true)}
        />
        <ModalEditarPerfil
          visible={visible}
          FecharModal={() => setVisible(false)}
        />
        <View>
          <BotaoComponent BtnTxt={"Alterar Senha"} />
        </View>
        <View>
          <BotaoComponent BtnTxt={"Excluir minha conta"} />
        </View>
      </View>
    </View>
  );
}
