import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";

// Importando as páginas que aparecerão
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import TarefasPrivadas from "../pages/TarefasPrivadas";
import TarefasSala from "../pages/tarefasUsuario";
import TarefasSemLogin from "../pages/Tarefas-SemCadastro";
import "react-native-get-random-values";
import RoutesDrawer from "./routsDrawer";
import HomePrincipal from "../pages/home";
import EntrarSala from "../pages/EntrarSala";
import HomeUsuario from "../pages/homeuser";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MinhasSalas from "../pages/MinhasSalas";
import TarefasSalaAdministrador from "../pages/TarefasSalaAdministrador";

// Const para o uso do Stack (rotas)
const Tab = createBottomTabNavigator();

export default function Routes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cancela a inscrição do listener ao desmontar o componente
    return unsubscribe;
  }, []);
  return (
    <Tab.Navigator>
      {isAuthenticated ? (
        <>
          <Tab.Screen
            name="Usuário(Aluno)"
            component={RoutesDrawer}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return <AntDesign name="home" size={24} color="#c0c0c0" />;
              },
            }}
          />

          <Tab.Screen
            name="Tarefas"
            component={TarefasPrivadas}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialIcons
                    name="playlist-add"
                    size={24}
                    color="#c0c0c0"
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="TarefasSala"
            component={TarefasSala}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialIcons
                    name="playlist-add-check"
                    size={24}
                    color="#c0c0c0"
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="TarefasAdmin"
            component={TarefasSalaAdministrador}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialIcons
                    name="playlist-add-check"
                    size={24}
                    color="#c0c0c0"
                  />
                );
              },
            }}
          />

          <Tab.Screen
            name="Entrar em uma Sala"
            component={EntrarSala}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return <Feather name="user" size={24} color="#c0c0c0" />;
              },
            }}
          />
          <Tab.Screen
            name="Minhas Salas"
            component={MinhasSalas}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return <Feather name="user" size={24} color="#c0c0c0" />;
              },
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={HomePrincipal}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return <AntDesign name="home" size={24} color="#c0c0c0" />;
              },
            }}
          />
          <Tab.Screen
            name="TarefaSemLogin"
            component={TarefasSemLogin}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialIcons
                    name="playlist-add"
                    size={24}
                    color="#c0c0c0"
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return <Feather name="user" size={24} color="#c0c0c0" />;
              },
            }}
          />
          <Tab.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return <Feather name="user-plus" size={24} color="#c0c0c0" />;
              },
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
