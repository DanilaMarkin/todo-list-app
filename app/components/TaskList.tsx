import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { Task } from "../types/task";

export type TaskListProps = {
    tasks: Task[];
    deleteTask: (id: string) => void;
    handleTaskCompletion: (id: string) => void;
};

export default function TaskList({ tasks, deleteTask, handleTaskCompletion }: TaskListProps) {
    return (
        <ScrollView
            contentContainerStyle={styles.taskListBlocks}
            showsVerticalScrollIndicator={false}
        >
            {/* Task List(isCompleted = false) */}
            <FlatList
                data={tasks.filter((task) => !task.isCompleted)}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.taskList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.taskItem}>
                            <View style={styles.taskItemLeft}>
                                <TouchableOpacity onPress={() => handleTaskCompletion(item.id)}>
                                    <MaterialIcons name={item.isCompleted ? "check-box" : "check-box-outline-blank"} size={24} color={colors.icon} />
                                </TouchableOpacity>
                                <Text style={styles.taskItemTitle}>{item.title}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <MaterialIcons name="delete" size={24} color={colors.icon} />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                ListEmptyComponent={
                    <Text>No Tasks</Text>
                }
            />
            {/* Task List(isCompleted = true) */}
            {tasks.some(task => task.isCompleted) && (
                <Text style={styles.textCompleted}>COMPLETED</Text>
            )}

            <FlatList
                data={tasks.filter((task) => task.isCompleted)}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.taskListIsCompleted}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.taskItem, styles.completedTask]}>
                            <View style={styles.taskItemLeft}>
                                <TouchableOpacity onPress={() => handleTaskCompletion(item.id)}>
                                    <MaterialIcons name={item.isCompleted ? "check-box" : "check-box-outline-blank"} size={24} color={colors.icon} />
                                </TouchableOpacity>
                                <Text style={styles.taskItemTitle}>{item.title}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <MaterialIcons name="delete" size={24} color={colors.icon} />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    taskListBlocks: {
        paddingTop: 32,
        paddingBottom: 16,
    },
    taskList: {
        gap: 16,
    },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        borderRadius: 12,
        backgroundColor: colors.background,
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
        color: colors.primary,
        fontSize: 17,
        fontWeight: 500,
    },
    taskListIsCompleted: {
        gap: 16,
    },
    textCompleted: {
        paddingVertical: 16,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 1,
        color: "#D1A28B"
    },
    completedTask: {
        opacity: 0.5,
        backgroundColor: "#F7F7F7",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
});