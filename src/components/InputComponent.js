import { TextInput, View, Text } from "react-native";

export default function InputComponent({
  placeholder,
  style,
  onChangeText,
  value,
  styleTxtBtn,
  BtnTxt,
}) {
  const changeTxt = (textInput) => {
    onChangeText(textInput);
  };
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={style}
        onChangeText={changeTxt}
        value={value}
      />
      <Text style={styleTxtBtn}> {BtnTxt} </Text>
    </View>
  );
}
