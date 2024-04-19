import React, { useState } from "react";
import { TextInput, View, Image } from "react-native";
import BotaoComponent from "../components/BotaoComponent";

export default function InputSenhaComponent() {
  const ImgInputs_Password = {
    uri: "https://imgs.search.brave.com/KsYjHrNOAadHl2YPhHWacFSAyLXoNZfXMwZA5pQhQE0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvMTgxLzE4MTUz/NC5wbmc",
  };

  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <Image source={ImgInputs_Password} />
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry={showPassword}
      />
      <BotaoComponent
        BtnTxt={showPassword ? "Mostrar Senha" : "Esconder Senha"}
        OnPress={togglePasswordVisibility}
      />
    </View>
  );
}
