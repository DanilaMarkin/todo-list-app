import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const days = [
  { day: 'WED', date: 25 },
  { day: 'THU', date: 26 },
  { day: 'FRI', date: 27 },
  { day: 'SAT', date: 28 },
  { day: 'SUN', date: 29 },
  { day: 'MON', date: 30 },
];

interface Task {
  id: string
  title: string
  isCompleted: boolean
}

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Проверка при загрузке на наличие задач
  useEffect(() => {
    loadTasks();
  }, []);

  // Функция для первоначальной загрузки данных
  const loadTasks = async () => {
    const saved = await AsyncStorage.getItem("tasks");

    if (saved) {
      setTasks(JSON.parse(saved));
    }
  };

  // Функция для сохранения задач в локальное хранилище
  const saveTasks = async (newTasks: Task[]) => {
    await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // Функия добавление в список задач
  const addTask = async () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: inputValue.trim(),
      isCompleted: false,
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);

    setInputValue("");
    Keyboard.dismiss();
  };

  // Функция для удаление задач
  const deleteTask = async (id: string) => {
    const localTasks = await AsyncStorage.getItem("tasks");
    const parsedTasks = localTasks ? JSON.parse(localTasks) : [];

    const updatedTasks = parsedTasks.filter((task: { id: string }) => task.id !== id);

    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  // Функция для отметки задачи как выполненной
  const handleTaskCompletion = async (id: string) => {
    const localTasks = await AsyncStorage.getItem("tasks");
    const parsedTasks = localTasks ? JSON.parse(localTasks) : [];

    const updatedTasks = parsedTasks.map((task: Task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {/* Header Title */}
      <View style={{ flex: 1 }}>

        <View>
          <Text style={styles.currentDay}>My Tasks</Text>
        </View>

        {/* Task Lists */}
        <View style={{ flex: 1, paddingBottom: 56 + 16 }}>
          <FlatList
            data={tasks}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.taskList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.taskItem}>
                  <View style={styles.taskItemLeft}>
                    <TouchableOpacity onPress={() => handleTaskCompletion(item.id)}>
                      <MaterialIcons name={item.isCompleted ? "check-box" : "check-box-outline-blank"} size={24} color="#555555" />
                    </TouchableOpacity>
                    <Text style={styles.taskItemTitle}>{item.title}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <MaterialIcons name="delete" size={24} color="#555555" />
                  </TouchableOpacity>
                </View>
              );
            }}
            ListEmptyComponent={
              <Text>No Tasks</Text>
            }
          />
        </View>



        {/* Bottom Action Write and Add Task */}
        <View style={styles.addTask}>
          <TextInput
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            placeholder="Write a task..."
            placeholderTextColor={"#222222"}
            style={styles.addTaskInput}
          />
          <TouchableOpacity
            onPress={addTask}
            style={styles.addTaskBtn}>
            <Text style={styles.addTaskBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 22,
    paddingHorizontal: 22
  },
  currentDay: {
    color: "#000000",
    fontSize: 36,
    fontWeight: 700
  },
  taskList: {
    paddingVertical: 32,
    gap: 16,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    borderRadius: 12,
    backgroundColor: "#F3EFEE",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  taskItemLeft: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  taskItemTitle: {
    flexShrink: 1,
    color: "#121212",
    fontSize: 17,
    fontWeight: 500,
  },
  addTask: {
    position: "absolute",
    left: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addTaskInput: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 21,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F3EFEE",
    fontSize: 18,
    fontWeight: "500",
    color: "#121212"
  },
  addTaskBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 77,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#393433",
  },
  addTaskBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 500,
  },
});