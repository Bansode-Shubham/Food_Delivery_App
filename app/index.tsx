import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/Button_react_paper";
import { Link, Redirect } from "expo-router";
import { useAuth } from "./providers/AuthProvider";
import { ActivityIndicator } from "react-native-paper";
import { supabase } from "@/lib/superbase";

const index = () => {
  const { session, loading, isAdmin } = useAuth();
  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  // if(!isAdmin){
  //   return <Redirect href={'/(user)'} />
  // }

  if (isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Link href={"/(user)"} asChild>
          <Button text="User" />
        </Link>
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>
        <Link href={"/sign-in"} asChild>
          <Button text="Sign in" />
        </Link>
        <Button text="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link>
      <Button text="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default index;
