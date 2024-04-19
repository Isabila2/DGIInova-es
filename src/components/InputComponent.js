import { TextInput, View } from "react-native";

export default function InputComponent({ placeholder }) {
  return (
    <View>
      <TextInput placeholder={placeholder} />
    </View>
  );
}
