import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importando as páginas que aparecerão
import HomePrincipal from "../pages/home";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Tarefas from "../pages/tarefasUsuario";
import HomeUsuario from "../pages/homeuser";
import HomeProfessor from "../pages/homeprofessor";
import TarefasPrivadas from "../pages/TarefasPrivadas";

import "react-native-get-random-values";
// Const para o uso do Stack (rotas)
const Drawer = createDrawerNavigator();

export default function RoutesDrawer() {
  return (
      <Drawer.Navigator
        screenOptions={{
            drawerStyle: {backgroundColor : "white"},
            drawerActiveBackgroundColor: "#F6E1F6",
            drawerActiveTintColor: "white",

            drawerInactiveBackgroundColor: "white",
            drawerInactiveTintColor: "#DBA3DB",
        }}>

        
        <Drawer.Screen name="Home" component={HomePrincipal} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Cadastro" component={Cadastro} />
        <Drawer.Screen name="Usuário(Aluno)" component={HomeUsuario} />
        <Drawer.Screen name="Usuário(Professor)" component={HomeProfessor} />
        <Drawer.Screen name="TarefasPrivadas" component={TarefasPrivadas} />
        <Drawer.Screen name="Tarefas" component={Tarefas} />
      </Drawer.Navigator>

  );
}
