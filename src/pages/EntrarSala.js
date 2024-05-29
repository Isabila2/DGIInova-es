// Importação de pacotes, componentes, etc
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoComponent from "../components/BotaoComponent";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig";
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EntrarSala({ navigation }) {
  const [codigo, setCodigo] = useState("");
  const [salasEncontradas, setSalasEncontradas] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarSala = async () => {
    try {
      setLoading(true); // Ativando o Loading
      // fazendo uma busca usando o codigo fornecido no campo "codigo"
      const Codigo = query(
        collection(db, "Salas"),
        where("codigo", "==", codigo)
      );
      // Executa a const Codigo e retorna os resultados da pesquisa
      const querySnapshot = await getDocs(Codigo);
      const foundSalas = [];
      querySnapshot.forEach((doc) => {
        foundSalas.push({ id: doc.id, ...doc.data() });
      });
      // seta essa busca como SalasEncontradas
      setSalasEncontradas(foundSalas);
    } catch (error) {
      console.error("Erro ao buscar a sala:", error);
    } finally {
      setLoading(false); // Desativando o Loading
    }
  };

  // adicionar o usuario ao banco de dados para rastreio de cada usuario que entra na Sala
  const registrarEntradaUsuario = async (salaId, nomeUsuario) => {
    try {
      await addDoc(collection(db, "userEntries"), {
        salaId,
        nomeUsuario,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Erro ao registrar entrada do usuário:", error);
    }
  };

  // Salvar salas acessadas no Async Storage
  const salvarSalaAcessada = async (sala) => {
    try {
      const salasAcessadas = await AsyncStorage.getItem("salasAcessadas");
      const salasAcessadasArray = salasAcessadas
        ? JSON.parse(salasAcessadas)
        : [];
      const salaExistente = salasAcessadasArray.find((s) => s.id === sala.id);

      if (!salaExistente) {
        salasAcessadasArray.push(sala);
        await AsyncStorage.setItem(
          "salasAcessadas",
          JSON.stringify(salasAcessadasArray)
        );
      }
    } catch (error) {
      console.error("Erro ao salvar a sala acessada:", error);
    }
  };

  // pegando o email e e usuario do usuário para salvas seus dados antes de entrar na Sala
  const NavegarParaTarefasSala = async (sala) => {
    const user = auth.currentUser;
    if (user) {
      const nomeUsuario = user.displayName || user.email;
      await registrarEntradaUsuario(sala.id, nomeUsuario);
      await salvarSalaAcessada(sala);
    }
    navigation.navigate("TarefasSala", { salaId: sala.id });
  };

  return (
    // ScrollView começa aqui
    <ScrollView>
      {/* View Principal */}
      <View style={styles.container}>
        {/* View com a imagem principal */}
        <View>
          <ImagemComponent
            RotaImagem={require("../assets/images/entrarsala.png")}
            style={styles.img}
          />
        </View>

        {/* View com o Input para pesquisar e o botão de pesquisa */}
        <View style={styles.content}>
          {/* Input para digitar o código. O valor é "codigo" e ele tem o onChangeText para mudar seu "estado" */}
          <InputComponent
            placeholder={"Digite o Código da Sala"}
            onChangeText={setCodigo}
            value={codigo}
            style={styles.input}
          />

          {/* Esse é o botão que realiza a função de buscar a sala com o código digitado */}
          <BotaoComponent
            BtnTxt={"Buscar Sala"}
            OnPress={buscarSala}
            style={styles.btn}
            styleTxtBtn={styles.btntext}
          />
          <TxtComponent styleTxt={styles.txt} texto="Salas Encontradas" />

          {loading ? ( // Verificando se está carregando
            <ActivityIndicator style={{ marginTop: 10 }} color="#000" /> // Mostrar o Loading
          ) : (
            <FlatList
              data={salasEncontradas}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => NavegarParaTarefasSala(item)}
                  style={styles.sala}
                >
                  <ImagemComponent
                    RotaImagem={require("../assets/images/salasimgg.png")}
                    style={styles.imgsala}
                  />
                  <TxtComponent texto={item.nome} styleTxt={styles.salatxt} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>

      {/* View do footer */}
      <View style={styles.footer}>
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={styles.footerlogo}
        />
      </View>
    </ScrollView>
  );
}

// CSS do código
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 150,
  },
  img: {
    height: 310,
    width: 399,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 60,
    width: 300,
    textAlign: "center",
    borderBottomColor: "#d46dd4",
    borderBottomWidth: 1,
    marginTop: 20,
    fontSize: 17,
    fontWeight: "300",
  },
  btn: {
    backgroundColor: "#d46dd4",
    height: 50,
    width: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  btntext: {
    textAlign: "center",
    color: "white",
  },
  txt: {
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
  },
  sala: {
    backgroundColor: "#d46dd4",
    padding: 10,
    marginLeft: 0,
    borderRadius: 10,
    height: 110,
    width: 370,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "left",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
  },
  salatxt: {
    fontWeight: "400",
    color: "white",
    fontSize: 18,
    marginTop: -60,
  },
  imgsala: {
    height: 100,
    width: 70,
    marginLeft: 270,
    justifyContent: "center",
    marginTop: -38,
    alignItems: "center",
    textAlign: "center",
    opacity: 0.9,
  },
  footerlogo: {
    width: 120,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
