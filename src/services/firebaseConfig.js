// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração do Firebase fornecida pelo próprio no site do FireBase
const firebaseConfig = {
  apiKey: "AIzaSyDf_s64bD0cFyD_a-jio7KlmghNSKdWtGA",
  authDomain: "dgi-taskstodo.firebaseapp.com",
  projectId: "dgi-taskstodo",
  storageBucket: "dgi-taskstodo.appspot.com",
  messagingSenderId: "1085528541003",
  appId: "1:1085528541003:web:c7ce41c1c8bcee5f830ace",
  measurementId: "G-YTBS1Z86FQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

// Exportando os serviços de autenticação e banco de dados
export { auth, db, collection, getDocs };

// Função para cadastrar um novo usuário
export async function cadastrar(email, senha, usuario) {
  try {
    // const para criar um novo usuário com email e senha
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const user = userCredential.user;

    // Armazenar os dados do usuário no Firestore
    await setDoc(doc(db, "users", user.uid), {
      usuario: usuario,
      email: email,
      senha: senha,
    });
    // Mensagem no console caso cadastro efetuado
    console.log("Usuário cadastrado com sucesso:", user);
    return user;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}

// Função para atualizar os dados do usuário
export async function updateUserData(userId, updatedData) {
  try {
    // Referência ao documento do usuário no Firestore
    const userDocRef = doc(db, "users", userId);
    // Atualizar o documento do usuário com os novos dados
    await updateDoc(userDocRef, updatedData);
    console.log("Dados do usuário atualizados com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário:", error);
    throw error;
  }
}

// Função para login do usuário
export async function login(email, senha) {
  try {
    // Fazer login do usuário com email e senha
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    console.log("Usuário logado com sucesso:", user);
    return user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

// Função para obter dados do usuário no Firestore
export async function getUserData(userId) {
  try {
    // Obter o documento do usuário do Firestore
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      // Retornar dados do usuário se o documento existir
      return userDoc.data();
    } else {
      console.error("Documento de usuário não encontrado");
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    throw error;
  }
}
