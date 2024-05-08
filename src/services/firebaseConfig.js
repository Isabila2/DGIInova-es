// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const auth = getAuth();
export const db = getFirestore();
export { collection, getDocs };
export async function cadastrar(email, senha, usuario) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      usuario: usuario,
      email: email,
      senha: senha,
    });

    console.log("Usuário cadastrado com sucesso:", user);
    return user;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}

// Função de Login
export async function login(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    console.log("Usuário logado com sucesso:", user);
    return user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

export async function getUserData(userId) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
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
