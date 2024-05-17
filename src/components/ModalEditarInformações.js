import { Modal, View, Alert } from "react-native";
import InputComponent from "./InputComponent";
import TxtComponent from "./TxtComponent";
import { useEffect, useState } from "react";
import { auth } from "../services/firebaseConfig";
import { getUserData, updateUserData } from "../services/firebaseConfig";
import BotaoComponent from "./BotaoComponent";

export default function ModalEditarPerfil({ visible, FecharModal }) {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Função para obter os dados do usuário após o login
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const data = await getUserData(currentUser.uid);
          setUserData(data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setUser(userData.usuario);
      setEmail(userData.email);
    }
  }, [userData]);

  const handleUpdateProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateUserData(currentUser.uid, { usuario: user, email: email });
        Alert.alert("Sucesso", "Perfil atualizado com sucesso");
        FecharModal();
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil");
    }
  };

  return (
    <Modal visible={visible}>
      <View style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <TxtComponent texto={"Usuário"} />
          <InputComponent value={user} onChangeText={setUser} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TxtComponent texto={"Email"} />
          <InputComponent value={email} onChangeText={setEmail} />
        </View>
        <BotaoComponent BtnTxt={"Salvar"} OnPress={handleUpdateProfile} />
        <BotaoComponent BtnTxt={"Cancelar"} OnPress={FecharModal} />
      </View>
    </Modal>
  );
}
