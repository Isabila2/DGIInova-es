import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Modal,
  StyleSheet,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import ImagemComponent from "../components/ImagemComponent";
import { styleTarefa } from "../styles/styleTarefas";
import { useRoute } from "@react-navigation/native"; // Importe o hook useRoute
import TxtComponent from "../components/TxtComponent";
import BotaoComponent from "../components/BotaoComponent";

export default function TarefasSalaAdministrador() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [codigosala, setCodigosala] = useState("");
  const [codigoSalaAtual, setCodigoSalaAtual] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);

  const route = useRoute();

  useEffect(() => {
    if (auth.currentUser && route.params && route.params.salaId) {
      setCodigosala(route.params.salaId);
      buscarTarefasDaSala(route.params.salaId);
      fetchCodigoSala(route.params.salaId);
      buscarUsuariosDaSala(route.params.salaId);
      verificarUsuarioRegistrado();
    }
  }, [route.params]);

  const fetchCodigoSala = async (salaId) => {
    try {
      const salaDoc = await getDoc(doc(db, "Salas", salaId));
      const codigoSala = salaDoc.data().codigo;
      setCodigoSalaAtual(codigoSala);
    } catch (error) {
      console.error("Erro ao buscar código da sala:", error);
    }
  };

  const buscarTarefasDaSala = async (salaId) => {
    try {
      const q = query(
        collection(db, "adminTasks"),
        where("salaId", "==", salaId)
      );
      onSnapshot(q, (snapshot) => {
        const tarefasDaSala = [];
        snapshot.forEach((doc) => {
          tarefasDaSala.push({ id: doc.id, ...doc.data() });
        });
        setTarefas(tarefasDaSala);
      });
    } catch (error) {
      console.error("Erro ao buscar tarefas da sala:", error);
    }
  };

  const buscarUsuariosDaSala = async (salaId) => {
    try {
      const q = query(
        collection(db, "userEntries"),
        where("salaId", "==", salaId)
      );
      onSnapshot(q, (snapshot) => {
        const usuariosDaSala = [];
        snapshot.forEach((doc) => {
          usuariosDaSala.push({ id: doc.id, ...doc.data() });
        });
        setUsuarios(usuariosDaSala);
      });
    } catch (error) {
      console.error("Erro ao buscar usuários da sala:", error);
    }
  };

  // Função para verificar se o usuário já está registrado na sala
  const verificarUsuarioRegistrado = async () => {
    try {
      const user = auth.currentUser;
      const userId = user ? user.uid : null;
      const snapshot = await getDoc(doc(db, "userEntries", userId));
      if (snapshot.exists()) {
        // Se o usuário já estiver registrado, não faz nada
        console.log("Usuário já registrado na sala");
      } else {
        // Se o usuário não estiver registrado, registra-o
        await addDoc(collection(db, "userEntries"), {
          salaId: codigosala,
          nomeUsuario: user.displayName || user.email,
          timestamp: new Date(),
        });
        console.log("Usuário registrado na sala");
      }
    } catch (error) {
      console.error("Erro ao verificar usuário registrado:", error);
    }
  };

  const addTarefa = async () => {
    if (novaTarefa !== "" && novaTarefa.length >= 5 && codigosala !== "") {
      const novaTarefaObj = {
        completo: false,
        titulo: novaTarefa,
        salaId: codigosala,
        CodigoSala: codigoSalaAtual,
      };
      try {
        await addDoc(collection(db, "adminTasks"), novaTarefaObj);
        setNovaTarefa("");
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
  };

  // Função para contar tarefas concluídas por usuário
  const contarTarefasConcluidasPorUsuario = () => {
    const tarefasConcluidasPorUsuario = {};

    // Itere sobre as tarefas concluídas
    tarefas.forEach((tarefa) => {
      const userId = tarefa.userId;
      if (userId) {
        if (!tarefasConcluidasPorUsuario[userId]) {
          // Se este é
          tarefasConcluidasPorUsuario[userId] = 1;
        } else {
          tarefasConcluidasPorUsuario[userId]++;
        }
      }
    });

    return tarefasConcluidasPorUsuario;
  };

  // Função para verificar se todas as tarefas foram concluídas por todos os usuários
  const todasTarefasConcluidas = () => {
    const tarefasConcluidasPorUsuario = contarTarefasConcluidasPorUsuario();
    const totalUsuarios = usuarios.length;

    for (const userId in tarefasConcluidasPorUsuario) {
      if (tarefasConcluidasPorUsuario[userId] !== totalUsuarios) {
        return false;
      }
    }

    return true;
  };

  const marcarTarefaComoCompleta = async (id, completo) => {
    try {
      await updateDoc(doc(db, "adminTasks", id), {
        completo: !completo,
      });

      if (todasTarefasConcluidas()) {
        // Aqui você pode adicionar o código para marcar a tarefa como concluída para o administrador
        console.log("Todas as tarefas concluídas!");
      }
    } catch (error) {
      console.error("Erro ao marcar tarefa como completa:", error);
    }
  };

  const excluirTarefa = async (id) => {
    try {
      await deleteDoc(doc(db, "adminTasks", id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const TotalTarefasCriadas = tarefas.length;
  const TotalTarefasConcluidas = tarefas.filter(
    ({ completo }) => completo
  ).length;

  return (
    <View style={styleTarefa.inicio}>
      <ScrollView>
        <ImagemComponent
          RotaImagem={require("../assets/images/tarefassala.png")}
          style={styleTarefa.img}
        />
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TxtComponent
            texto={"Código da Sala: "}
            styleTxt={styleTarefa.txtcodigo}
          />
          <TxtComponent texto={codigoSalaAtual} />
        </View>
        <BotaoComponent
          BtnTxt={"Ver Usuários"}
          OnPress={() => setModalVisible(true)}
          styleTxtBtn={styleTarefa.ver}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Usuários na Sala:</Text>
              <ScrollView>
                <FlatList
                  data={usuarios}
                  keyExtractor={(usuario) => usuario.id}
                  renderItem={({ item }) => (
                    <Text style={styles.modalUsers}>{item.nomeUsuario}</Text>
                  )}
                />
              </ScrollView>
              <BotaoComponent
                BtnTxt={"Fechar"}
                OnPress={() => setModalVisible(false)}
                styleTxtBtn={{ color: "#d3d3d3" }}
              />
            </View>
          </View>
        </Modal>
        <View style={{ marginLeft: 2 }}>
          <AdicionarTarefa
            tarefa={novaTarefa}
            onChangeText={setNovaTarefa}
            onPress={addTarefa}
            QuantidadeTarefasCriadas={TotalTarefasCriadas}
            QuantidadeTarefasConcluidas={TotalTarefasConcluidas}
            styleAdd={styleTarefa.add}
            styleImg={styleTarefa.btnimg}
            styleTxt={styleTarefa.texto}
            styleTxtt={styleTarefa.textoo}
          />
        </View>
        <View>
          <FlatList
            data={tarefas}
            keyExtractor={(tarefa) => tarefa.id}
            renderItem={({ item }) => (
              <ContainerTarefa
                styleContainer={styleTarefa.iconeprimeiro}
                styleTexto={styleTarefa.textarefa}
                styleContai={styleTarefa.iconesegundo}
                TituloTarefa={item.titulo}
                styleIcone={styleTarefa.iconetrash}
                completo={item.completo}
                onPressCompleto={() =>
                  marcarTarefaComoCompleta(item.id, item.completo)
                }
                onPressExcluir={() => excluirTarefa(item.id)}
              />
            )}
            ListEmptyComponent={<SemTarefa />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 340,
    height: 650,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "300",
    fontSize: 18,
  },
  modalUsers: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "300",
  },
});
