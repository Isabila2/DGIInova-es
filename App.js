import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importando as páginas que aparecerão

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
