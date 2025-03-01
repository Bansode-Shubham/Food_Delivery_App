import { Redirect } from "expo-router";
import React from "react";

/**
 * HomeScreen is a React functional component that redirects the user to the
 * menu screen when the app is opened.
 */
export default function TabIndex() {
  return <Redirect href={"/(user)/menu/"} />;
}
