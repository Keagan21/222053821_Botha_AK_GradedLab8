import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../navigation/RootNavigator";
import { ProjectProvider } from "../context/useContext";

export default function App() {
  return (
    <ProjectProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ProjectProvider>
  );
}
