import { Image } from "react-native";

export default function ImagemComponent({ RotaImagem, style }) {
  return <Image source={RotaImagem} style={style} />;
}
