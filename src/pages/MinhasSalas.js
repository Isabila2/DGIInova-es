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
import TxtComponent from "../components/TxtComponent";
import { auth } from "../services/firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";

const MinhasSalas = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    loadRooms(); // Carregue as salas quando o componente for montado
  }, []);

  const loadRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Salas")); // Obtenha todas as salas do banco de dados
      const loadedRooms = []; // Array para armazenar as salas carregadas

      // Itere sobre os documentos da coleção de salas
      querySnapshot.forEach((doc) => {
        // Extraia os dados de cada sala
        const roomData = doc.data();
        const roomId = doc.id;

        // Verifique se o ID do usuário associado à sala corresponde ao ID do usuário atualmente autenticado
        if (userId === roomData.userId) {
          // Adicione a sala ao array de salas carregadas apenas se ela pertencer ao usuário atual
          loadedRooms.push({
            id: roomId,
            name: roomData.nome,
            // Outros campos da sala, se houver
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
            RotaImagem={require("../assets/images/logosalas.png")}
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
          <TouchableOpacity onPress={loadRooms} style={styles.butao}>
            <Text style={styles.txtbutao}>ATUALIZAR SALAS </Text>
          </TouchableOpacity>
          {/* Botão de atualização */}
          <View
            style={{ backgroundColor: "#D87AD8", marginTop: 20, width: "100%" }}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D87AD8",
  },
  imglogo: {
    width: 390,
    height: 220,
    marginTop: 0,
    marginBottom: 30,
  },
  roomList: {
    flexGrow: 1,
  },
  roomItem: {
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
    backgroundColor: "white",
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
  butao: {
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DBA3DB",
    backgroundColor: "#D87AD8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  txtbutao: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "300",
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

export default MinhasSalas;
