import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { auth } from "../services/firebaseConfig";
import BotaoImagemComponent from "../components/BotaoImagemComponent";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogOutDrawer from "../components/LogOutDrawer";
import LogInDrawer from "../components/LogInDrawer";

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
        drawerActiveBackgroundColor: "#F6E1F6",
        drawerActiveTintColor: "white",
        drawerInactiveBackgroundColor: "white",
        drawerInactiveTintColor: "#DBA3DB",
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
      navigation={navigation} // Passando a propriedade navigation
      {...rest} // Espalhando as outras props
    >
      <Drawer.Screen name="Usuário(Aluno)" component={HomeUsuario} />
      <Drawer.Screen name="Tarefas" component={TarefasPrivadas} />
      <Drawer.Screen name="Minhas Salas" component={MinhasSalas} />
    </Drawer.Navigator>
  );
}
