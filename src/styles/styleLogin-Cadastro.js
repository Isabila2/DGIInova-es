import { StyleSheet } from "react-native";

export const stylesLoginCadastro = StyleSheet.create({
  img: {
    width: 340,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  tela: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  icones: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  view_Inputs: {
    flexDirection: "row",
    width: "70%",
    borderBottomWidth: 1,
    borderBottomColor: "#DBA3DB",
    padding: 10,
    marginBottom: 20,
    justifyContent: "left",
    alignItems: "center",
  },
  inputTxt: {
    fontSize: 20,
    width: "150%",
    marginLeft: 10,
  },
  botao: {
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DBA3DB",
    backgroundColor: "#DBA3DB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  BotaoTxt: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
