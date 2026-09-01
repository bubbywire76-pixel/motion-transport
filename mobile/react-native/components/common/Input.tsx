import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, useTheme, HelperText } from "react-native-paper";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  error?: boolean;
  errorMessage?: string;
  icon?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  editable = true,
  error = false,
  errorMessage,
  icon,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();

  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        error={error}
        left={icon ? <TextInput.Icon icon={icon} /> : undefined}
        mode="outlined"
        style={styles.input}
        theme={theme}
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint}
        accessibilityRole="text"
      />
      {error && errorMessage && (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
});
