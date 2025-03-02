import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useState } from "react";
import { Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { supabase } from "@/lib/superbase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);


  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      
      email: email,
      password: password,
    });
  
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // Add your sign-up logic here
      console.log("Sign up:", { email, password, name });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Create Account</ThemedText>

      {/* <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      /> */}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={signUpWithEmail}
        loading={loading}
        style={styles.button}
      >
        Sign Up
      </Button>
      <Button style={styles.button} mode="contained" onPress={() => router.push("/sign-in")}>
        Sign In
      </Button>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
