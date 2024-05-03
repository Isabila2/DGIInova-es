import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";

// Importando as páginas que aparecerão
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Tarefas from "../pages/tarefasUsuario";
import HomeUsuario from "../pages/homeuser";
import HomeProfessor from "../pages/homeprofessor";
import TarefasPrivadas from "../pages/TarefasPrivadas";
import TarefasSemLogin from "../pages/Tarefas-SemCadastro";
import TarefasSala from "../pages/tarefasUsuario";

import "react-native-get-random-values";
import RoutesDrawer from "./routsDrawer";
import HomePrincipal from "../pages/home";
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
            }}
          />
          <Tab.Screen
            name="Usuário(Professor)"
            component={HomeProfessor}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="TarefasPrivadas"
            component={TarefasPrivadas}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="TarefasSala"
            component={TarefasSala}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen name="Home" component={HomePrincipal} />
          <Tab.Screen name="TarefaSemLogin" component={TarefasSemLogin} />
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Cadastro" component={Cadastro} />
        </>
      )}
    </Tab.Navigator>
  );
}
