import React, { useState } from "react";
import { TextInput, View, Image } from "react-native";
import BotaoComponent from "../components/BotaoComponent";

export default function InputSenhaComponent() {
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
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
