import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";
import { db } from "../fireBase";
import { ProjectContext } from "../context/useContext";
import { 
  doc, collection, onSnapshot, addDoc, deleteDoc, updateDoc, getDoc 
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function TaskScreens() {
  const { selectedProject } = useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (!selectedProject) return;

    const projectRef = doc(db, "projects", selectedProject.id);
    const unsubProject = onSnapshot(projectRef, (snap) => {
      if (!snap.exists()) {
        navigation.navigate("Projects");
      }
    });

    const tasksRef = collection(db, "projects", selectedProject.id, "tasks");
    const unsubTasks = onSnapshot(tasksRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    
      updateDoc(projectRef, { tasksCount: snapshot.size });
    });

    return () => {
      unsubProject();
      unsubTasks();
    };
  }, [selectedProject]);

  const addTask = async () => {
    if (!newTask.trim()) return;
    await addDoc(collection(db, "projects", selectedProject.id, "tasks"), {
      name: newTask
    });
    setNewTask("");
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "projects", selectedProject.id, "tasks", id));
  };

  if (!selectedProject) return <Text>No project selected.</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {tasks.length === 0 ? (
        <Text>No tasks found for this project.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 4 }}>
              <Text>{item.name}</Text>
              <Button title="Delete" onPress={() => deleteTask(item.id)} />
            </View>
          )}
        />
      )}

      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        placeholder="New Task"
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
}
