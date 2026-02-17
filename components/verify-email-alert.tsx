//Show this on index and verify credentials page to alert user their email still needs to be verified.

import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface VerifyEmailProps {
  email: string;
}

export default function VerifyEmailAlert({ email }: VerifyEmailProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Verification link sent. Please verify your email.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 165, 0, 0.15)", // soft translucent orange
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 165, 0, 0.4)",
    justifyContent: "center",
  },
  text: {
    color: "#b36b00",
    fontWeight: "600",
    fontSize: 14,
  },
});
