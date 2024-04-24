import { Text, View } from "react-native";
import TxtComponent from "./TxtComponent";

export default function FlatComponent({ texto, styleTxt }) {
  return <TxtComponent texto={texto} styleTxt={styleTxt} />;
}
