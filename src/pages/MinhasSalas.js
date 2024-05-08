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

  // Função para renderizar cada item da lista de salas
  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() => navigation.navigate("RoomDetail", { roomId: item.id })}
    >
      <Text style={styles.roomName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
    padding: 20,
  },
  roomList: {
    flexGrow: 1,
  },
  roomItem: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MinhasSalas;
