import React from "react";
import { StyleSheet, TextInputProps } from "react-native";

import IconInput from "./icon-input";

type FacebookInputProps = TextInputProps & {
  value: string;
  onValueChange: (text: string) => void;
};

export default function FacebookInput({
  value,
  onValueChange,
  style,
  ...rest
}: FacebookInputProps) {
  const handleChange = (text: string) => {
    //Ensure all spaces are replaced with dots
    const formattedText = text.replace(/\s+/g, ".");
    onValueChange(formattedText);
  };

  return (
    <IconInput
      icon="at"
      {...rest}
      style={[styles.input, style]}
      value={value}
      onChangeText={handleChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
