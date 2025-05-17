import { StyleSheet, Text, View } from "react-native";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";

export default function Home() {
    const {
        inputValue,
        setInputValue,
        inputValueError,
        setInputValueError,
        tasks,
        addTask,
        deleteTask,
        handleTaskCompletion
    } = useTasks();

    return (
        <>
            {/* Header Title */}
            <View>
                <Text style={styles.currentDay}>My Tasks</Text>
            </View>

            {/* Task Lists Blocks */}
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                handleTaskCompletion={handleTaskCompletion}
            />

            {/* Bottom Action Write and Add Task */}
            <AddTask
                inputValue={inputValue}
                setInputValue={setInputValue}
                inputValueError={inputValueError}
                setInputValueError={setInputValueError}
                addTask={addTask}
            />
        </>
    );
}

const styles = StyleSheet.create({
    currentDay: {
        color: "#000000",
        fontSize: 36,
        fontWeight: 700
    },
});