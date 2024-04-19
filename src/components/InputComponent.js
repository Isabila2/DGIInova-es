import { TextInput, View } from "react-native";

export default function InputComponent({ placeholder, style, onChangeText }) {
  const changeTxt = (textInput) => {
    onChangeText(textInput);
  };
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={style}
        onChangeText={changeTxt}
      />
    </View>
  );
}
