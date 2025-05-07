import { FlatList, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

const days = [
  { day: 'WED', date: 25 },
  { day: 'THU', date: 26 },
  { day: 'FRI', date: 27 },
  { day: 'SAT', date: 28 },
  { day: 'SUN', date: 29 },
  { day: 'MON', date: 30 },
];

const tasks = [
  { id: "1", title: "Drink 8 glasses of water" },
  { id: "2", title: "Meditate for 10 minutes" },
  { id: "3", title: "Read a chapter of a book" },
  { id: "4", title: "Go for a 30-minute walk" },
  { id: "5", title: "Write in a gratitude journal" },
  { id: "6", title: "Plan meals for the day" },
  { id: "7", title: "Practice deep breathing exercises" },
  { id: "8", title: "Stretch for 15 minutes" },
  { id: "9", title: "Limit screen time before bed" },
  { id: "10", title: "Limit screen" },
  { id: "11", title: "Take Nastya" },
  { id: "12", title: "Take Nastya" },
];

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          {/* Header Title */}
          <View style={styles.container}>
            <View>
              <Text style={styles.currentDay}>Today</Text>
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
                    </TouchableOpacity>
                  ); 
                }}
              />
            </View>
          </View>
        </ScrollView>
      {/* Bottom Action Write and Add Task */}
      <View style={styles.addTask}>
        <TextInput
          placeholder="Write a task..."
          placeholderTextColor={"#222222"}
          style={styles.addTaskInput}
        />
        <TouchableOpacity style={styles.addTaskBtn}>
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