
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importando as páginas que aparecerão
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Tarefas from "../pages/tarefasUsuario";
import HomeUsuario from "../pages/homeuser";
import HomeProfessor from "../pages/homeprofessor";
import TarefasPrivadas from "../pages/TarefasPrivadas";

import "react-native-get-random-values";
import RoutesDrawer from "./routsDrawer";
// Const para o uso do Stack (rotas)
const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={RoutesDrawer} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Cadastro" component={Cadastro} />
        <Tab.Screen name="Usuário(Aluno)" component={HomeUsuario} />
        <Tab.Screen name="Usuário(Professor)" component={HomeProfessor} />
        <Tab.Screen name="TarefasPrivadas" component={TarefasPrivadas} />
        <Tab.Screen name="Tarefas" component={Tarefas} />
      </Tab.Navigator>

  );
}
