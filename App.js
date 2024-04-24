import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePrincipal from "./src/pages/home";
import Login from "./src/pages/login";
import Cadastro from "./src/pages/cadastro";
import Tarefas from "./src/pages/tarefasUsuario";
import HomeUsuario from "./src/pages/homeuser";
import TarefasPrivadas from "./src/pages/TarefasPrivadas";
import "react-native-get-random-values";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePrincipal} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Usuário(Aluno)" component={HomeUsuario} />
        <Stack.Screen name="TarefasPrivadas" component={TarefasPrivadas} />
        <Stack.Screen name="Tarefas" component={Tarefas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
