import { TextInput, View, Text } from "react-native";

export default function InputComponent({
  placeholder,
  style,
  onChangeText,
  value,
  styleTxtBtn,
  BtnTxt,
  securetextentry,
}) {
  const changeTxt = (textInput) => {
    onChangeText(textInput);
  };
  return (
    // Props de um Input
    <View>
      <TextInput
        placeholder={placeholder}
        style={style}
        onChangeText={changeTxt}
        value={value}
        secureTextEntry={securetextentry}
      />
      <Text style={styleTxtBtn}> {BtnTxt} </Text>
    </View>
  );
}
