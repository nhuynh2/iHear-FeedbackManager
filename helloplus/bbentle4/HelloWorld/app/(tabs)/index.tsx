import React, { useState } from "react";
                                      // For checklist
import { Image, StyleSheet, Platform, TouchableOpacity, TextInput, Button, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

//CHECKLIST INTERFACE
interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

// USER ADD NEW TASK
 const [newTask, setNewTask] = useState(''); 

export default function HomeScreen() {

   // CHECK LIST IMPLEMENTATION
   const [checklist, setChecklist] = useState<ChecklistItem[]>([
     { id: "1", text: "Hello World Plus", completed: false },
     { id: "2", text: "Sprint 1", completed: false },
     { id: "3", text: "Finish the semester (hopefully)", completed: false },
   ]);

   const toggleChecklistItem = (id: string) => {
     setChecklist((prevChecklist) =>
       prevChecklist.map((item) =>
         item.id === id ? { ...item, completed: !item.completed } : item
       )
     );
   }; 

   // USER ADD NEW TASK IMPLEMENTATION
   const addTask = () => {
     if (newTask.trim() !== "") {
       const newItem = {
         id: (checklist.length + 1).toString(),
         text: newTask,
         completed: false,
       };
       setChecklist([...checklist, newItem]); // Add new task 
       setNewTask(""); 
     }
   };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* SHOW CHECK LIST */}
      <ThemedView style={styles.checklistContainer}>
        <ThemedText type="subtitle" style={styles.subtitleText}>
          Checklist
        </ThemedText>
        {checklist.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggleChecklistItem(item.id)} // Toggle on press
            style={styles.checklistItem}
          >
            <ThemedText
              style={[
                styles.checklistText,
                item.completed && styles.completedItem,
              ]}
            >
              {item.completed ? "✓ " : "□ "} {item.text}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* ADD NEW ITEM INPUT */}
      <ThemedView style={styles.addTaskContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Add to Checklist" onPress={addTask} />
        </View>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add new task"
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  // MAKING THE BUTTON AND TEXT BOX FOR CHECKLIST/TASK NICER
  addTaskContainer: {
    marginTop: 20,
    alignItems: "center", 
  },
  buttonContainer: {
    width: 150, 
    marginBottom: 10, 
  },
  input: {
    width: "90%", 
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff", 
  },
});
