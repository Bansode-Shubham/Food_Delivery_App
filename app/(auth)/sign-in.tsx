import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from "@/lib/superbase";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        router.push('/');
      
        if (error) Alert.alert(error.message);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <ThemedText style={styles.title}>Sign In</ThemedText>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
            />
            <Button
                mode="contained"
                onPress={handleSignIn}
                loading={loading}
                style={styles.button}
            >
                Sign In
            </Button>
            <Button
                mode="text"
                onPress={() => router.push('/sign-up')}
            >
                Don't have an account? Sign Up
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
        marginBottom: 8,
    },
});