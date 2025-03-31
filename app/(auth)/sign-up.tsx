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
  const [user, setUser] = useState("");

  // async function signUpWithEmail() {
  //   setLoading(true);
  //   const { error } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   });

  //   if (error) Alert.alert(error.message);
  //   setLoading(false);
  // }

//  async function signUpWithEmail() {
//   setLoading(true);

//   try {
//     // Step 1: Sign up the user
//     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });

//     if (signUpError) {
//       Alert.alert("Sign Up Error", signUpError.message);
//       return;
//     }

//     // Step 2: Get the user's ID from the sign-up response
//     const userId = signUpData.user?.id;
//     if (!userId) {
//       Alert.alert("Error", "User ID not found.");
//       return;
//     }

//     // Step 3: Insert user details into the profiles table
//     const { error: profileError } = await supabase.from("profiles").insert({
//       id: userId, // Use the user's ID as the primary key
//       full_name: name,
//       username: user,
//     });

//     if (profileError) {
//       Alert.alert("Profile Error", profileError.message);
//       return;
//     }

//     Alert.alert("Success", "Account created successfully!");
//     router.push("/sign-in"); // Redirect to the sign-in page
//   } catch (error) {
//     console.error("Sign Up Error:", error);
//     Alert.alert("Error", "An unexpected error occurred.");
//   } finally {
//     setLoading(false);
//   }
// }

// async function signUpWithEmail() {
//   setLoading(true);

//   try {
//     // Step 1: Sign up the user
//     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });

//     if (signUpError) {
//       Alert.alert("Sign Up Error", signUpError.message);
//       return;
//     }

//     // Step 2: Get the user's ID from the sign-up response
//     const userId = signUpData.user?.id;
//     if (!userId) {
//       Alert.alert("Error", "User ID not found.");
//       return;
//     }

//     // Step 3: Check if the profile already exists
//     const { data: existingProfile, error: fetchError } = await supabase
//       .from("profiles")
//       .select("id")
//       .eq("id", userId)
//       .single();

//     if (fetchError && fetchError.code !== "PGRST116") {
//       // If the error is not "Row not found", show the error
//       Alert.alert("Profile Fetch Error", fetchError.message);
//       return;
//     }

//     if (!existingProfile) {
//       // Step 4: Insert user details into the profiles table if no profile exists
//       const { error: profileError } = await supabase.from("profiles").insert({
//         id: userId, // Use the user's ID as the primary key
//         full_name: name,
//         username: user,
//       });
//       Alert.alert("Success", "Account created successfully!");
//       if (profileError) {
//         Alert.alert("Profile Error", profileError.message);
//         return;
//       }
//     }

  
//     router.push("/sign-in"); // Redirect to the sign-in page
//   } catch (error) {
//     console.error("Sign Up Error:", error);
//     Alert.alert("Error", "An unexpected error occurred.");
//   } finally {
//     setLoading(false);
//   }
// }

// async function signUpWithEmail() {
//   setLoading(true);
//   try {
//     // Sign up the user
//     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (signUpError) {
//       Alert.alert("Sign Up Error", signUpError.message);
//       return;
//     }

//     const userId = signUpData.user?.id;
//     if (!userId) {
//       Alert.alert("Error", "User ID not found.");
//       return;
//     }

//     // Upsert user details into the profiles table
//     const { data: profileData, error: profileError } = await supabase
//       .from("profiles")
//       .upsert({
//         id: userId,
//         full_name: name,
//         username: user,
//         updated_at: new Date().toISOString(),
//       })
//       .select();

//     if (profileError) {
//       console.error("Profile Error:", profileError);
//       Alert.alert("Profile Error", profileError.message);
//       return;
//     }

//     console.log("Profile created/updated:", profileData);
//     Alert.alert("Success", "Account created successfully!", [
//       { text: "OK", onPress: () => router.push("/sign-in") },
//     ]);
//   } catch (error) {
//     console.error("Sign Up Error:", error);
//     Alert.alert("Error", "An unexpected error occurred.");
//   } finally {
//     setLoading(false);
//   }
// }

async function signUpWithEmail() {
  setLoading(true);
  try {
    // Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      Alert.alert("Sign Up Error", signUpError.message);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      Alert.alert("Error", "User ID not found.");
      return;
    }

    // Upsert user details into the profiles table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name: name,
        username: user,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (profileError) {
      console.error("Profile Error:", profileError);
      Alert.alert("Profile Error", profileError.message);
      return;
    }

    console.log("Profile created/updated:", profileData);
    
    // Use a Promise to handle the navigation after alert
    new Promise((resolve) => {
      Alert.alert(
        "Success",
        "Account created successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              resolve(true);
            },
          },
        ],
        { cancelable: false }
      );
    }).then(() => {
      router.navigate("/(auth)/sign-in");
    });

  } catch (error) {
    console.error("Sign Up Error:", error);
    Alert.alert("Error", "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Create Account</ThemedText>

      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Username"
        value={user}
        onChangeText={setUser}
        mode="outlined"
        style={styles.input}
      />

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
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => router.push("/sign-in")}
      >
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

// import { View, StyleSheet, Alert } from "react-native";
// import { TextInput, Button } from "react-native-paper";
// import { useState } from "react";
// import { router } from "expo-router";
// import { ThemedText } from "@/components/ThemedText";
// import { supabase } from "@/lib/superbase";

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);

//   // async function signUpWithEmail() {
//   //   setLoading(true);

//   //   try {
//   //     // Step 1: Sign up the user
//   //     const { data: signUpData, error: signUpError } =
//   //       await supabase.auth.signUp({
//   //         email: email,
//   //         password: password,
//   //       });

//   //     if (signUpError) {
//   //       Alert.alert("Sign Up Error", signUpError.message);
//   //       return;
//   //     }

//   //     // Step 2: Insert user details into the profiles table
//   //     const userId = signUpData.user?.id; // Get the user's ID from the sign-up response
//   //     if (userId) {
//   //       const { error: profileError } = await supabase.from("profiles").insert({
//   //         id: userId, // Use the user's ID as the primary key
//   //         full_name: name,
//   //         username: username,
//   //       });

//   //       if (profileError) {
//   //         Alert.alert("Profile Error", profileError.message);
//   //         return;
//   //       }

//   //       Alert.alert("Success", "Account created successfully!");
//   //       router.push("/sign-in"); // Redirect to the sign-in page
//   //     }
//   //   } catch (error) {
//   //     console.error("Sign Up Error:", error);
//   //     Alert.alert("Error", "An unexpected error occurred.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

// // async function signUpWithEmail() {
// //   setLoading(true);

// //   try {
// //     // Step 1: Sign up the user
// //     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
// //       email: email,
// //       password: password,
// //     });

// //     if (signUpError) {
// //       Alert.alert("Sign Up Error", signUpError.message);
// //       return;
// //     }

// //     // Step 2: Get the user's ID from the sign-up response
// //     const userId = signUpData.user?.id;
// //     if (userId) {
// //       // Step 3: Check if the profile already exists
// //       const { data: existingProfile, error: fetchError } = await supabase
// //         .from("profiles")
// //         .select("id")
// //         .eq("id", userId)
// //         .single();

// //       if (fetchError && fetchError.code !== "PGRST116") {
// //         // If the error is not "Row not found", show the error
// //         Alert.alert("Profile Fetch Error", fetchError.message);
// //         return;
// //       }

// //       if (!existingProfile) {
// //         // Step 4: Insert user details into the profiles table if no profile exists
// //         const { error: profileError } = await supabase.from("profiles").insert({
// //           id: userId, // Use the user's ID as the primary key
// //           full_name: name,
// //           username: username,
// //         });

// //         if (profileError) {
// //           Alert.alert("Profile Error", profileError.message);
// //           return;
// //         }
// //       }

// //       Alert.alert("Success", "Account created successfully!");
// //       router.push("/sign-in"); // Redirect to the sign-in page
// //     }
// //   } catch (error) {
// //     console.error("Sign Up Error:", error);
// //     Alert.alert("Error", "An unexpected error occurred.");
// //   } finally {
// //     setLoading(false);
// //   }
// // }

// // async function signUpWithEmail() {
// //   setLoading(true);

// //   try {
// //     // Step 1: Sign up the user
// //     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
// //       email: email,
// //       password: password,
// //     });

// //     if (signUpError) {
// //       Alert.alert("Sign Up Error", signUpError.message);
// //       return;
// //     }

// //     // Step 2: Get the user's ID from the sign-up response
// //     const userId = signUpData.user?.id;
// //     if (!userId) {
// //       Alert.alert("Error", "User ID not found.");
// //       return;
// //     }

// //     // Step 3: Check if the profile already exists
// //     const { data: existingProfile, error: fetchError } = await supabase
// //       .from("profiles")
// //       .select("id")
// //       .eq("id", userId)
// //       .single();

// //     if (fetchError && fetchError.code !== "PGRST116") {
// //       // If the error is not "Row not found", show the error
// //       Alert.alert("Profile Fetch Error", fetchError.message);
// //       return;
// //     }

// //     if (!existingProfile) {
// //       // Step 4: Insert user details into the profiles table if no profile exists
// //       const { error: profileError } = await supabase.from("profiles").insert({
// //         id: userId, // Use the user's ID as the primary key
// //         full_name: name,
// //         username: username,
// //       });

// //       if (profileError) {
// //         console.error("Profile Insert Error:", profileError);
// //         Alert.alert("Profile Error", profileError.message);
// //         return;
// //       }
// //     }

// //     Alert.alert("Success", "Account created successfully!");
// //     router.push("/sign-in"); // Redirect to the sign-in page
// //   } catch (error) {
// //     console.error("Sign Up Error:", error);
// //     Alert.alert("Error", "An unexpected error occurred.");
// //   } finally {
// //     setLoading(false);
// //   }
// // }

// async function signUpWithEmail() {
//   setLoading(true);

//   try {
//     // Step 1: Sign up the user
//     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });

//     if (signUpError) {
//       Alert.alert("Sign Up Error", signUpError.message);
//       return;
//     }

//     // Step 2: Get the user's ID from the sign-up response
//     const userId = signUpData.user?.id;
//     if (!userId) {
//       Alert.alert("Error", "User ID not found.");
//       return;
//     }

//     // Step 3: Check if the profile already exists
//     const { data: existingProfile, error: fetchError } = await supabase
//       .from("profiles")
//       .select("id")
//       .eq("id", userId)
//       .single();

//     if (fetchError && fetchError.code !== "PGRST116") {
//       // If the error is not "Row not found", show the error
//       Alert.alert("Profile Fetch Error", fetchError.message);
//       return;
//     }

//     if (!existingProfile) {
//       // Step 4: Insert user details into the profiles table if no profile exists
//       const { data: insertedProfile, error: profileError } = await supabase
//         .from("profiles")
//         .insert({
//           id: userId, // Use the user's ID as the primary key
//           full_name: name,
//           username: username,
//         })
//         .select(); // Return the inserted data

//       if (profileError) {
//         console.error("Profile Insert Error:", profileError);
//         Alert.alert("Profile Error", profileError.message);
//         return;
//       }

//       console.log("Inserted Profile:", insertedProfile);
//     }

//     Alert.alert("Success", "Account created successfully!");
//     router.push("/sign-in"); // Redirect to the sign-in page
//   } catch (error) {
//     console.error("Sign Up Error:", error);
//     Alert.alert("Error", "An unexpected error occurred.");
//   } finally {
//     setLoading(false);
//   }
// }

//   return (
//     <View style={styles.container}>
//       <ThemedText style={styles.title}>Create Account</ThemedText>

//       <TextInput
//         label="Full Name"
//         value={name}
//         onChangeText={setName}
//         mode="outlined"
//         style={styles.input}
//       />

//       <TextInput
//         label="Username"
//         value={username}
//         onChangeText={setUsername}
//         mode="outlined"
//         style={styles.input}
//       />

//       <TextInput
//         label="Email"
//         value={email}
//         onChangeText={setEmail}
//         mode="outlined"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         style={styles.input}
//       />

//       <TextInput
//         label="Password"
//         value={password}
//         onChangeText={setPassword}
//         mode="outlined"
//         secureTextEntry
//         style={styles.input}
//       />

//       <Button
//         mode="contained"
//         onPress={signUpWithEmail}
//         loading={loading}
//         style={styles.button}
//       >
//         Sign Up
//       </Button>
//       <Button
//         style={styles.button}
//         mode="contained"
//         onPress={() => router.push("/sign-in")}
//       >
//         Sign In
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     marginBottom: 16,
//   },
//   button: {
//     marginTop: 8,
//   },
// });
