import React from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./App/src/navigation/AppNavigator";
import ErrorBoundary from "./ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <>
        <AppNavigator />
        <StatusBar style="auto" />
      </>
    </ErrorBoundary>
  );
}
