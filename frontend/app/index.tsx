import { FlatList, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  id: string;
  title: string;
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
      title: inputValue.trim()
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);

    setInputValue("");
    Keyboard.dismiss();

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}>
        {/* Header Title */}
        <View style={styles.container}>
          <View>
            <Text style={styles.currentDay}>My Tasks</Text>
          </View>
          {/* Calendar Lists */}
          <View style={styles.calendarBlock}>
            <FlatList
              data={days}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.calendarList}
              keyExtractor={(item) => item.date.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.calendarItem}
                  >
                    <Text style={styles.calendarItemDay}>
                      {item.day}
                    </Text>
                    <Text style={styles.calendarItemDate}>
                      {item.date}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* Task Lists */}
          <View>
            <FlatList
              data={tasks}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.taskList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.taskItem}>
                    <Text style={styles.taskItemTitle}>{item.title}</Text>
                    <MaterialIcons name="delete" size={24} color="#555555" />
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text>Нет задач</Text>
              }
            />
          </View>
        </View>
      </ScrollView>
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
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 22,
  },
  currentDay: {
    color: "#000000",
    fontSize: 36,
    fontWeight: 700
  },
  calendarBlock: {
    paddingVertical: 32,
  },
  calendarList: {
    alignItems: "center",
    gap: 12,
  },
  calendarItem: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: 60,
    height: 68,
    borderRadius: 8,
    backgroundColor: "#F3EFEE",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  calendarItemDay: {
    fontSize: 12,
    fontWeight: "600",
    color: "#12121280"
  },
  calendarItemDate: {
    fontSize: 17,
    fontWeight: "600",
    color: "#12121280"
  },
  taskList: {
    gap: 16,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#F3EFEE",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  taskItemTitle: {
    color: "#121212",
    fontSize: 17,
    fontWeight: 500,
  },
  addTask: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
    paddingHorizontal: 22,
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