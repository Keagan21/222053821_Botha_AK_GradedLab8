import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../fireBase";
import { ProjectContext } from "../context/useContext";
import { useNavigation } from "@react-navigation/native";

export default function ProjectScreens() {
  const [projects, setProjects] = useState([]);
  const { setSelectedProject } = useContext(ProjectContext);
  const navigation = useNavigation();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleSelect = (project) => {
    setSelectedProject(project);
    navigation.navigate("Tasks");
  };

  return (
    <FlatList
      data={projects}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelect(item)}>
          <View style={{ padding: 16, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>{item.tasksCount || 0} tasks</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
