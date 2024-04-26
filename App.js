import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importando as páginas que aparecerão
import HomePrincipal from "./src/pages/home";
import Login from "./src/pages/login";
import Cadastro from "./src/pages/cadastro";
import Tarefas from "./src/pages/tarefasUsuario";
import HomeUsuario from "./src/pages/homeuser";
import HomeProfessor from "./src/pages/homeprofessor";
import TarefasPrivadas from "./src/pages/TarefasPrivadas";

import "react-native-get-random-values";
import Routes from "./src/routes";
// Const para o uso do Stack (rotas)
const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      
        <Routes />
      
    </NavigationContainer>



  );
}
