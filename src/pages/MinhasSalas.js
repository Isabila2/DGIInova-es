// Importação de pacotes, componentes, style, etc
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { collection, getDocs } from "firebase/firestore"; // Importe a função getDocs
import { db } from "../services/firebaseConfig"; // Importe a referência ao banco de dados Firebase
import ImagemComponent from "../components/ImagemComponent";
import { auth } from "../services/firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";

export default function MinhasSalas({ navigation }) {
  const [rooms, setRooms] = useState([]);
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    loadRooms(); // Carrega as salas quando o componente for preenchido
  }, []);

  const loadRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Salas")); // Obtém todas as salas do banco de dados
      const loadedRooms = []; // Array para armazenar as salas carregadas

      querySnapshot.forEach((doc) => {
        const roomData = doc.data();
        const roomId = doc.id;

        // Verifica se o Id do usuario é igual ao Id do Dono da Sala
        if (userId === roomData.userId) {
          // Adicione a sala ao array de salas carregadas apenas se ela pertencer ao usuário atual
          loadedRooms.push({
            id: roomId,
            name: roomData.nome,
          });
        }
      });

      // Atualize o estado das salas com as salas carregadas
      setRooms(loadedRooms);
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
    }
  };

  // Função para renderizar cada item da lista de salas
  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() => navigation.navigate("TarefasAdmin", { salaId: item.id })}
    >
      <ImagemComponent
        RotaImagem={require("../assets/images/salasimg.png")}
        style={styles.img}
      />
      <Text style={styles.roomName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Imagem da logo e botão para começar */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <ImagemComponent
            RotaImagem={require("../assets/images/minhassalaas.png")}
            style={styles.imglogo}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity onPress={loadRooms} style={styles.btn}>
            <Text style={styles.btntext}>ATUALIZAR SALAS </Text>
          </TouchableOpacity>
          {/* Botão de atualização */}
          <View
            style={{ backgroundColor: "white", marginTop: 20, width: "100%" }}
          >
            <FlatList
              data={rooms}
              renderItem={renderRoomItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.roomList}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imglogo: {
    width: 380,
    height: 330,
    marginTop: 0,
    marginBottom: 30,
  },
  roomList: {
    flexGrow: 1,
  },
  roomItem: {
    padding: 10,
    marginLeft: 5,
    borderRadius: 10,
    height: 110,
    width: 370,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "left",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
  },
  img: {
    height: 70,
    width: 80,
    marginLeft: 220,
    justifyContent: "center",
    marginTop: -10,
    alignItems: "center",
    textAlign: "center",
    marginLeft: 270,
  },

  btn: {
    backgroundColor: "#d46dd4",

    height: 50,
    width: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  btntext: {
    textAlign: "center",
    color: "white",
  },
  roomName: {
    fontSize: 25,
    fontWeight: "400",
    color: "black",
    textAlign: "left",
    justifyContent: "center",
    marginTop: -50,
  },
});
