import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoComponent from "../components/BotaoComponent";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig"; // Certifique-se de importar auth se precisar do nome do usuário
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";
import { ScrollView } from "react-native";

export default function EntrarSala({ navigation }) {
  const [codigo, setCodigo] = useState("");
  const [salasEncontradas, setSalasEncontradas] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controle do indicador de carregamento

  const buscarSala = async () => {
    try {
      setLoading(true); // Ativando o indicador de carregamento
      const q = query(collection(db, "Salas"), where("codigo", "==", codigo));
      const querySnapshot = await getDocs(q);
      const foundSalas = [];
      querySnapshot.forEach((doc) => {
        foundSalas.push({ id: doc.id, ...doc.data() });
      });
      setSalasEncontradas(foundSalas);
    } catch (error) {
      console.error("Erro ao buscar a sala:", error);
    } finally {
      setLoading(false); // Desativando o indicador de carregamento
    }
  };

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

  const navigateToTarefasSala = async (salaId) => {
    const user = auth.currentUser;
    if (user) {
      const nomeUsuario = user.displayName || user.email; // Ajuste conforme necessário
      await registrarEntradaUsuario(salaId, nomeUsuario);
    }
    navigation.navigate("TarefasSala", { salaId });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <ImagemComponent
            RotaImagem={require("../assets/images/entrarsala.png")}
            style={styles.img}
          />
        </View>

        <View style={styles.content}>
          <InputComponent
            placeholder={"Digite o Código da Sala"}
            onChangeText={setCodigo}
            value={codigo}
            style={styles.input}
          />
          <BotaoComponent
            BtnTxt={"Buscar Sala"}
            OnPress={buscarSala}
            style={styles.btn}
            styleTxtBtn={styles.btntext}
          />
          <TxtComponent styleTxt={styles.txt} texto="Salas Encontradas" />

          {loading ? ( // Verificando se está carregando
            <ActivityIndicator style={{ marginTop: 10 }} color="#000" /> // Mostrar o indicador de carregamento
          ) : (
            <FlatList
              data={salasEncontradas}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigateToTarefasSala(item.id)}
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
      <View style={styles.footer}>
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={styles.footerlogo}
        />
      </View>
    </ScrollView>
  );
}

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
