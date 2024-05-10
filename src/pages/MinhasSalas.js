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
const MinhasSalas = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);

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

        // Adicione a sala ao array de salas carregadas
        loadedRooms.push({
          id: roomId,
          name: roomData.nome,
          // Outros campos da sala, se houver
        });
      });

      // Atualize o estado das salas com as salas carregadas
      setRooms(loadedRooms);
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
    }
  };

  const imagem = require("../assets/images/caderno.png");

  // Função para renderizar cada item da lista de salas
  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() => navigation.navigate("TarefasAdmin", { salaId: item.id })}
    >
      <ImagemComponent RotaImagem={imagem} style={styles.img} />
      <Text style={styles.roomName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Imagem da logo e botão para começar */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImagemComponent
          RotaImagem={require("../assets/images/LogoPrincipal.png")}
          style={styles.imglogo}
        />
      </View>
      <TouchableOpacity onPress={loadRooms} style={styles.butao}>
        <Text style={styles.txtbutao}>ATUALIZAR SALAS </Text>
      </TouchableOpacity>
      {/* Botão de atualização */}
      <FlatList
        data={rooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.roomList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  imglogo: {
    width: 220,
    height: 100,
    marginTop: 60,
    marginBottom: 30,
  },
  roomList: {
    flexGrow: 1,
  },
  roomItem: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    height: 200,
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    opacity: 0.85,
    borderColor: "black",
    borderWidth: 1,
  },
  butao: {
    backgroundColor: "#b752b8",
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 
  },
  txtbutao: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "200",
  },
  roomName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: -110,
  },
});

export default MinhasSalas;
