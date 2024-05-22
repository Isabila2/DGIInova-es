import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import InputComponent from "../components/InputComponent";
import BotaoComponent from "../components/BotaoComponent";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import ImagemComponent from "../components/ImagemComponent";
import TxtComponent from "../components/TxtComponent";
import { ScrollView } from "react-native";

export default function EntrarSala({ navigation }) {
  const [codigo, setCodigo] = useState("");
  const [salasEncontradas, setSalasEncontradas] = useState([]);

  const buscarSala = async () => {
    try {
      console.log(codigo);
      const q = query(collection(db, "Salas"), where("codigo", "==", codigo));
      const querySnapshot = await getDocs(q);
      const foundSalas = [];
      console.log("Total de documentos encontrados:", querySnapshot.size);
      querySnapshot.forEach((doc) => {
        // Adiciona as informações da sala encontrada ao array
        console.log("Dados da sala encontrada:", doc.data());
        foundSalas.push({ id: doc.id, ...doc.data() });
      });
      console.log("Salas encontradas:", foundSalas);
      setSalasEncontradas(foundSalas);
    } catch (error) {
      console.error("Erro ao buscar a sala:", error);
    }
  };

  const navigateToTarefasSala = (salaId) => {
    navigation.navigate("TarefasSala", { salaId });
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
          backgroundColor: "white",
        }}
      >
        {/* Header Adicionar nova sala */}
        <View
          style={{
            backgroundColor: "white",
          }}
        >
          <ImagemComponent
            RotaImagem={require("../assets/images/entrarsala.png")}
            style={styles.img}
          />
        </View>

        {/* Lista de Salas encontradas */}
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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

          <FlatList
            data={salasEncontradas}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToTarefasSala(item.id)}
                style={styles.sala}
              >
                <ImagemComponent
                  RotaImagem={require("../assets/images/encontrarsala.png")}
                  style={styles.imgsala}
                />
                <TxtComponent texto={item.nome} styleTxt={styles.salatxt} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
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
  },
  img: {
    height: 310,
    width: 399,
    marginTop: 103,
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
    marginLeft: 8,
    borderRadius: 10,
    height: 110,
    width: 370,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "left",
    justifyContent: "center",
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
    marginLeft: 220,
    justifyContent: "center",
    marginTop: -40,
    alignItems: "center",
    textAlign: "center",
    marginLeft: 270,
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
