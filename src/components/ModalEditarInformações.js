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
import ImagemComponent from "./ImagemComponent";

// aqui usando o Yup para configurar melhor meus Formularios, facilitando e otimizando o formulário
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
          // setando o valor usuario com o nome do usuario cadastrado no Banco de Dados usando o id dele
          setValue("usuario", data.usuario);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const AtualizarPerfil = async (data) => {
    try {
      // Setando o Loading como true para ele aparecer
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          data.senha
        );
        // Usando a função do Auth para verificar se a senha está correta
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
                  // Rodando a função para atualizar o nome do Usuario, foi feita no firebaseConfig.js
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
                  // Fazendo o loading desaparecer depois e concluido
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
      <View
        style={{
          backgroundColor: "white",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Imagem principal */}
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={{ height: 80, width: 200, marginTop: 100 }}
        />
        <View
          style={{
            height: 410,
            width: 350,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            borderRadius: 30,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.7,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          {/* View de editar informações */}
          <TxtComponent
            texto="EDITAR INFORMAÇÕES"
            styleTxt={{
              fontSize: 20,
              fontWeight: "300",
              marginBottom: 20,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              height: 30,
              width: "90%",
              marginLeft: 5,
              borderBottomColor: "#a2a0a0",
              borderBottomWidth: 1,
              marginTop: 30,
            }}
          >
            <TxtComponent
              texto={"Nome de usuário:  "}
              styleTxt={{ fontWeight: "300" }}
            />
            <Controller
              control={control}
              name="usuario"
              render={({ field: { onChange, value } }) => (
                <InputComponent
                  value={value}
                  onChangeText={onChange}
                  style={{
                    width: 190,
                    height: 40,
                    marginTop: -8,
                  }}
                  styleTxtBtn={{ color: "red" }}
                />
              )}
            />
          </View>
          {errors.usuario && (
            <TxtComponent
              styleTxt={{ color: "red" }}
              texto={errors.usuario.message}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              height: 30,
              width: "90%",
              marginLeft: 5,
              borderBottomColor: "#a2a0a0",
              borderBottomWidth: 1,
              marginTop: 30,
            }}
          >
            <TxtComponent
              texto={"Digite sua senha:  "}
              styleTxt={{ fontWeight: "300" }}
            />
            <Controller
              control={control}
              name="senha"
              render={({ field: { onChange, value } }) => (
                <InputComponent
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  style={{
                    width: 190,
                    height: 40,
                    marginTop: -8,
                  }}
                />
              )}
            />
          </View>
          {errors.senha && (
            <Text style={{ color: "red" }}>{errors.senha.message}</Text>
          )}

          <BotaoComponent
            BtnTxt={"Salvar"}
            OnPress={handleSubmit(AtualizarPerfil)}
            style={{
              marginTop: 40,
              width: 230,
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#DBA3DB",
              backgroundColor: "#DBA3DB",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
            styleTxtBtn={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "300",
            }}
          />
          <BotaoComponent
            BtnTxt={"Cancelar"}
            OnPress={FecharModal}
            style={{ marginTop: 10 }}
            styleTxtBtn={{ color: "#d3d3d3" }}
          />

          {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
        </View>
      </View>
    </Modal>
  );
}
