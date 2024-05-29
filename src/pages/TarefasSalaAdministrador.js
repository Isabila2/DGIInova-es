// Importações necessárias do React Native e do Firebase Firestore
// Importação de pacotes, componentes, styleTarefa, etc
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

// Importações de componentes personalizados e configurações
import { db, auth } from "../services/firebaseConfig";
import AdicionarTarefa from "../components/AdicionarTarefaComponent";
import ContainerTarefa from "../components/ContainerTarefaComponent";
import SemTarefa from "../components/SemTarefaComponent";
import ImagemComponent from "../components/ImagemComponent";
import { styleTarefa } from "../styles/styleTarefas";
import { useRoute } from "@react-navigation/native";
import TxtComponent from "../components/TxtComponent";
import BotaoComponent from "../components/BotaoComponent";

export default function TarefasSalaAdministrador() {
  // Estados para gerenciar as tarefas, nova tarefa, código da sala, etc.
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [codigosala, setCodigosala] = useState("");
  const [codigoSalaAtual, setCodigoSalaAtual] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailsExibidos, setEmailsExibidos] = useState(new Set());

  // Acesso aos parâmetros de rota
  const route = useRoute();

  // useEffect para buscar tarefas, código da sala e usuários quando há uma mudança nos parâmetros da rota
  useEffect(() => {
    if (auth.currentUser && route.params && route.params.salaId) {
      setCodigosala(route.params.salaId);
      buscarTarefasDaSala(route.params.salaId);
      fetchCodigoSala(route.params.salaId);
      buscarUsuariosDaSala(route.params.salaId);
      verificarUsuarioRegistrado();
    }
  }, [route.params]);

  // Função para buscar o código da sala no banco de dados
  const fetchCodigoSala = async (salaId) => {
    try {
      const salaDoc = await getDoc(doc(db, "Salas", salaId));
      const codigoSala = salaDoc.data().codigo;
      setCodigoSalaAtual(codigoSala);
    } catch (error) {
      console.error("Erro ao buscar código da sala:", error);
    }
  };

  // Função para buscar tarefas da sala no banco de dados
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

  // Função para buscar usuários da sala no banco de dados
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

  // Função para verificar se o usuário é o dono da sala
  const verificarDonoSala = async (salaId) => {
    try {
      const user = auth.currentUser;
      if (!user) return false; // Retorna falso se não houver usuário logado
      const salaDoc = await getDoc(doc(db, "Salas", salaId));
      const DonoId = salaDoc.data().DonoId;
      return user.uid === DonoId;
    } catch (error) {
      console.error("Erro ao verificar dono da sala:", error);
      return false;
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

  // Função para buscar e verificar usuário antes de registrá-lo
  const buscarEVerificarUsuario = async () => {
    try {
      const Dono = await verificarDonoSala(codigosala);
      if (!Dono) {
        // Se o usuário não for o dono da sala, registra-lo
        const user = auth.currentUser;
        const userId = user ? user.uid : null;
        const snapshot = await getDoc(doc(db, "userEntries", userId));
        if (!snapshot.exists()) {
          // Se o usuário ainda não foi registrado, registra-lo
          await verificarUsuarioRegistrado();
        } else {
          // Se o usuário já foi registrado, adiciona o email ao conjunto de emails exibidos
          const emailUsuario = user.displayName || user.email;
          setEmailsExibidos(new Set(emailsExibidos).add(emailUsuario));
        }
      }
    } catch (error) {
      console.error("Erro ao buscar e verificar usuário:", error);
    }
  };

  // Exibir apenas os emails únicos
  const emailsUnicos = Array.from(emailsExibidos);

  // Chama a função para buscar e verificar usuário na sala
  useEffect(() => {
    buscarEVerificarUsuario();
  }, []);

  // Função para adicionar uma nova tarefa
  const addTarefa = async () => {
    if (novaTarefa.length <= 4) {
      Alert.alert("Erro", "Digite no minimo 5 letras para adicionar");
    }
    // verifica se o campo de tarefa não está vazio, se a tarefa tem mais de 5 letras e se o codigo está sendo passado corretamente
    if (novaTarefa !== "" && novaTarefa.length >= 5 && codigosala !== "") {
      const novaTarefaObj = {
        completo: false,
        titulo: novaTarefa,
        salaId: codigosala,
        CodigoSala: codigoSalaAtual,
      };
      try {
        // adiciona a tarefa no Banco de Dados AdminTasks, feita exclusivamente para tarefas dos Admins
        await addDoc(collection(db, "adminTasks"), novaTarefaObj);
        setNovaTarefa("");
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
  };

  const marcarTarefaComoCompleta = async (id, completo) => {
    try {
      // atualiza o estado de Completo para o oposto do estado atual
      await updateDoc(doc(db, "adminTasks", id), {
        completo: !completo,
      });
    } catch (error) {
      console.error("Erro ao marcar tarefa como completa:", error);
    }
  };

  const excluirTarefa = async (id) => {
    try {
      // deleta a tarefa do Banco de Dados
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
    // View principal com a imagem principal
    <View style={styleTarefa.inicio}>
      {/* ScrollView começa aqui */}
      <ScrollView>
        <ImagemComponent
          RotaImagem={require("../assets/images/tarefassala.png")}
          style={styleTarefa.img}
        />

        {/* View com o TxtComponent com o código da sala e os usuário */}
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

        {/* Código modal dos usuários */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styleTarefa.centeredView}>
            <View style={styleTarefa.modalView}>
              <Text style={styleTarefa.modalText}>Usuários na Sala:</Text>
              {/* ScrollView do modal */}
              <ScrollView>
                <FlatList
                  data={usuarios}
                  keyExtractor={(usuario) => usuario.id}
                  renderItem={({ item }) => (
                    <Text style={styleTarefa.modalUsers}>
                      {item.nomeUsuario}
                    </Text>
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

        {/* View de adicionar tarefas */}
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

        {/* View da Flatlist das tarefas, com o Component ContainerTarefa */}
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
            // caso não houver nenhum item na lista, renderiza o component "SemTarefa"
            ListEmptyComponent={<SemTarefa />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
