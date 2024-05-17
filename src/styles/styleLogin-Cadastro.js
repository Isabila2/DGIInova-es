import { StyleSheet } from "react-native";

export const stylesLoginCadastro = StyleSheet.create({
  img: {
    width: 340,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  txttitulo: {
    fontWeight: "200",
    fontSize: 20,
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
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#DBA3DB",
    padding: 10,
    marginBottom: 20,
    justifyContent: "left",
    alignItems: "center",
  },
  inputTxt: {
    fontSize: 20,

    marginLeft: 10,
    fontWeight: "300",
    marginTop: -10,
    height: 30,
    marginBottom: 10,
  },
  inputTxtemail: {
    fontSize: 20,

    marginLeft: 10,
    fontWeight: "300",
    marginTop: 20,
    height: 30,
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
    marginBottom: 10,
  },
  BotaoTxt: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "300",
  },
  inputs_cadastro: {
    width: 330,
    borderBottomWidth: 1,
    borderColor: "#d46dd4",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontWeight: "300",
    color: "black",
  },
  erro: {
    alignItems: "center",
    color: "#ff375b",
    marginBottom: 5,
    marginTop: 5,
  },
  textcadastrar: {
    fontWeight: "200",
  },
});
