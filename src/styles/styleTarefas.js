import { StyleSheet } from "react-native";

export const styleTarefa = StyleSheet.create({
  inicio: {
    backgroundColor: "#f6f6f6",
    flex: 1,
  },
  img: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 50,
  },
  btn: {
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
  add: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    color: "black",
    borderRadius: 5,
    height: 50,
    width: 335,
    backgroundColor: "white",
    marginLeft: 5,
  },
  btnimg: {
    marginLeft: 340,
    marginTop: -65,
  },
  textoo: {
    fontSize: 18,
    fontWeight: "200",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColo: "black",
  },
  iconeprimeiro: {
    alignItems: "flex-start",
    marginLeft: 10,
    justifyContent: "center",
    marginTop: 20,
  },
  textarefa: {
    color: "black",
    marginLeft: 10,
    fontWeight: "400",
    textAlign: "left",
    width: 270,
  },
  iconetrash: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  txtcodigo: {
    fontWeight: "300",
    textAlign: "center",
    marginLeft: 10,
  },
});
