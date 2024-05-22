import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { auth } from "../services/firebaseConfig";
import BotaoImagemComponent from "../components/BotaoImagemComponent";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogOutDrawer from "../components/LogOutDrawer";
import LogInDrawer from "../components/LogInDrawer";
import EntrarSala from "../pages/EntrarSala";
import MinhaConta from "../components/MinhaConta";
import { styleUserHome } from "../styles/stylesUserHome";

// Importando as páginas que aparecerão

import Tarefas from "../pages/tarefasUsuario";
import HomeUsuario from "../pages/homeuser";
import TarefasPrivadas from "../pages/TarefasPrivadas";

import "react-native-get-random-values";
import MinhasSalas from "../pages/MinhasSalas";
// Const para o uso do Stack (rotas)
const Drawer = createDrawerNavigator();

export default function RoutesDrawer({ navigation, ...rest }) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: "white" },
        drawerActiveBackgroundColor: "#D87AD880",
        drawerActiveTintColor: "white",
        drawerInactiveBackgroundColor: "white",
        drawerInactiveTintColor: "#c0c0c0",
      }}
      style={{
        borderRadius: 100,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 5,
      }}
      drawerContent={(drawerProps) => (
        <View style={{ flex: 1 }}>
          <LogInDrawer />
          <DrawerContentScrollView {...drawerProps}>
            <DrawerItemList {...drawerProps} />
          </DrawerContentScrollView>
          <LogOutDrawer />
        </View>
      )}
      navigation={navigation}
      {...rest}
    >
      <Drawer.Screen name="Home" component={HomeUsuario} />
      <Drawer.Screen name="Minhas Tarefas" component={TarefasPrivadas} />
      <Drawer.Screen name="Entrar em uma Sala" component={EntrarSala} />
      <Drawer.Screen name="Minhas Salas" component={MinhasSalas} />
      <Drawer.Screen name="Minha Conta" component={MinhaConta} />
    </Drawer.Navigator>
  );
}
