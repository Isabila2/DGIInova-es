import React, { useState } from "react";
import { TextInput, View, Image, TouchableOpacity } from "react-native";

export default function InputSenhaComponent() {
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry={showPassword}
        style={{ fontSize: 20, width: "100%", marginLeft: 10 }}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={{ alignItems: "right" }}
      >
        <Image
          source={
            showPassword
              ? require("../assets/images/OlhoAberto.png")
              : require("../assets/images/OlhoFechado.png")
          }
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
}
