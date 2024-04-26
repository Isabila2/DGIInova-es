import { View, TouchableOpacity, Text } from "react-native";
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

      // Salva os dados do usuário no Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: data.email,
        usuario: data.usuario,
        senha: data.senha,
      });

      console.log("Usuário cadastrado com sucesso:", user.uid);

      // Navega para a tela de login após o cadastro
      navigation.navigate("Login", {
        successMessage: "Cadastro realizado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
      // Exibe mensagem de erro para o usuário
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  return (
    <View style={stylesLoginCadastro.tela}>
      <ImagemComponent
        RotaImagem={require("../assets/images/LogoHome.png")}
        style={stylesLoginCadastro.img}
      />
      {errors.usuario && (
        <Text style={stylesLoginCadastro.erro}>{errors.usuario?.message}</Text>
      )}
      <Controller
        control={control}
        name="usuario"
        render={({ field: { onChange, value } }) => (
          <InputComponent
            placeholder={"Digite seu Usuario"}
            onChangeText={onChange}
            value={value}
            style={stylesLoginCadastro.inputs_cadastro}
          />
        )}
      />
      {errors.email && (
        <Text style={stylesLoginCadastro.erro}>{errors.email?.message}</Text>
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
        <Text style={stylesLoginCadastro.erro}>{errors.senha?.message}</Text>
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
        <Text style={stylesLoginCadastro.erro}>
          {errors.ConfirmSenha?.message}
        </Text>
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
      <TouchableOpacity
        onPress={handleSubmit(handleCadastro)}
        style={stylesLoginCadastro.botao}
      >
        <Text style={stylesLoginCadastro.BotaoTxt}> Cadastrar </Text>
      </TouchableOpacity>
    </View>
  );
}
