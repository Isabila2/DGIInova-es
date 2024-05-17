import { View, TouchableOpacity, Text, Alert } from "react-native";
import InputComponent from "../components/InputComponent";
import ImagemComponent from "../components/ImagemComponent";
import { useNavigation } from "@react-navigation/native";
import { stylesLoginCadastro } from "../styles/styleLogin-Cadastro";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import TxtComponent from "../components/TxtComponent";

const schema = yup.object({
  usuario: yup.string().required("Informe seu Usuário"),
  email: yup.string().email("Email Inválido").required("Informe seu Email"),
  senha: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 dígitos")
    .required("Informe sua senha"),
  ConfirmSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas precisam ser iguais")
    .required("Confirme sua senha"),
});

export default function Cadastro() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();

  const handleCadastro = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: data.email,
        usuario: data.usuario,
        senha: data.senha,
      });

      console.log("Usuário cadastrado com sucesso:", user.uid);

      navigation.navigate("Login", {
        successMessage: "Cadastro realizado com sucesso!",
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Este Email já está em uso");
      }
      if (error.code === "auth/invalid-email") {
        Alert.alert("Email inválido");
      }
    }
  };

  return (
    // View principal
    <View style={stylesLoginCadastro.tela}>
      {/* Imagem da logo */}
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoHome.png")}
        style={stylesLoginCadastro.img}
      />
      <TxtComponent
        texto=" Fazer Cadastro"
        styleTxt={stylesLoginCadastro.txttitulo}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {errors.usuario && (
          <TxtComponent
            texto={errors.usuario?.message}
            styleTxt={stylesLoginCadastro.erro}
          />
        )}

        <Controller
          control={control}
          name="usuario"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Digite seu Usuário"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputs_cadastro}
            />
          )}
        />
        {errors.email && (
          <TxtComponent
            texto={errors.email?.message}
            styleTxt={stylesLoginCadastro.erro}
          />
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Digite seu Email"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputs_cadastro}
            />
          )}
        />
        {errors.senha && (
          <TxtComponent
            texto={errors.senha?.message}
            styleTxt={stylesLoginCadastro.erro}
          />
        )}

        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Digite seu senha"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputs_cadastro}
            />
          )}
        />
        {errors.ConfirmSenha && (
          <TxtComponent
            texto={errors.ConfirmSenha?.message}
            styleTxt={stylesLoginCadastro.erro}
          />
        )}

        <Controller
          control={control}
          name="ConfirmSenha"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder={"Confirme sua senha"}
              onChangeText={onChange}
              value={value}
              style={stylesLoginCadastro.inputs_cadastro}
            />
          )}
        />

        {/* Botão de Cadastrar */}
        <TouchableOpacity
          onPress={handleSubmit(handleCadastro)}
          style={stylesLoginCadastro.botao}
        >
          <TxtComponent
            texto="Cadastrar"
            styleTxt={stylesLoginCadastro.BotaoTxt}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
