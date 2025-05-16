import { StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Text } from "react-native";
import { colors } from "../styles/colors";

export type AddTaskProps = {
    inputValue: string;
    setInputValue: (value: string) => void;
    inputValueError: boolean;
    setInputValueError: (value: boolean) => void;
    addTask: () => void
}

export default function AddTask({ inputValue, setInputValue, inputValueError, setInputValueError, addTask }: AddTaskProps) {
    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.addTask}>
            <TextInput
                value={inputValue}
                onChangeText={(text) => {
                    setInputValue(text)
                    if (text.trim() !== "") {
                        setInputValueError(false);
                    }
                }}
                placeholder="Write a task..."
                placeholderTextColor={"#222222"}
                style={[
                    styles.addTaskInput,
                    inputValueError && styles.inputError
                ]}
            />
            <TouchableOpacity
                onPress={addTask}
                style={styles.addTaskBtn}>
                <Text style={styles.addTaskBtnText}>Add</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    addTask: {
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
        backgroundColor: colors.background,
        fontSize: 18,
        fontWeight: "500",
        color: colors.primary,
    },
    inputError: {
        borderWidth: 1,
        borderColor: colors.errorBorder,
        backgroundColor: colors.errorBg,
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
