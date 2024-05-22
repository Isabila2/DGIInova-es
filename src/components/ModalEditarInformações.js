import React, { useEffect, useState } from "react";
import { Modal, View, Alert, Text, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import InputComponent from "./InputComponent";
import TxtComponent from "./TxtComponent";
import BotaoComponent from "./BotaoComponent";
import { auth, getUserData, updateUserData } from "../services/firebaseConfig";

const schema = yup.object({
  senha: yup.string().required("Informe sua senha"),
  usuario: yup.string().required("Informe seu nome de usuário"),
});

export default function ModalEditarPerfil({ visible, FecharModal }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const data = await getUserData(currentUser.uid);
          setUserData(data);
          setValue("usuario", data.usuario);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (data) => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          data.senha
        );
        await reauthenticateWithCredential(currentUser, credential);

        // Confirmar alteração de usuário
        Alert.alert(
          "Confirmação",
          "Você tem certeza que deseja alterar o nome de usuário?",
          [
            {
              text: "Cancelar",
              onPress: () => setLoading(false),
              style: "cancel",
            },
            {
              text: "Confirmar",
              onPress: async () => {
                try {
                  await updateUserData(currentUser.uid, {
                    usuario: data.usuario,
                  });
                  Alert.alert(
                    "Sucesso",
                    "Nome de usuário atualizado com sucesso."
                  );
                  FecharModal();
                } catch (error) {
                  console.error("Erro ao atualizar nome de usuário:", error);
                  Alert.alert(
                    "Erro",
                    "Não foi possível atualizar o nome de usuário. Por favor, tente novamente mais tarde."
                  );
                } finally {
                  setLoading(false);
                }
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setLoading(false);
      Alert.alert(
        "Erro",
        "Não foi possível atualizar o perfil. Verifique sua senha."
      );
    }
  };

  return (
    <Modal visible={visible}>
      <View style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <TxtComponent texto={"ome de usuário"} />
          <Controller
            control={control}
            name="usuario"
            render={({ field: { onChange, value } }) => (
              <InputComponent value={value} onChangeText={onChange} />
            )}
          />
          {errors.usuario && (
            <Text style={{ color: "red" }}>{errors.usuario.message}</Text>
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <TxtComponent texto={"Digite sua senha"} />
          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, value } }) => (
              <InputComponent
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.senha && (
            <Text style={{ color: "red" }}>{errors.senha.message}</Text>
          )}
        </View>
        <BotaoComponent
          BtnTxt={"Salvar"}
          OnPress={handleSubmit(handleUpdateProfile)}
        />
        <BotaoComponent BtnTxt={"Cancelar"} OnPress={FecharModal} />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      </View>
    </Modal>
  );
}
