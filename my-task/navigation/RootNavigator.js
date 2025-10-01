import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProjectScreens from "../screens/ProjectScreens";
import TaskScreens from "../screens/TaskScreens";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProjectsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects" component={ProjectScreens} />
      <Stack.Screen name="Tasks" component={TaskScreens} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ProjectsTab" component={ProjectsStack} options={{ title: "Projects" }}/>
    </Tab.Navigator>
  );
}
