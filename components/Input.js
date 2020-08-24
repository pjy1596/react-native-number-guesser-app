import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  // 왜 여기서는 props로 적었냐? props로 넘겨주는(forwarding) 요소들이 너무
  // 많아서 일일이 적기 귀찮아서
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};
const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
export default Input;
