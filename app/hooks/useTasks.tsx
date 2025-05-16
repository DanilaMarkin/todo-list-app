import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { loadTasks, saveTasks } from "../utils/storage";
import { Task } from "../types/task";

export const useTasks = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputValueError, setInputValueError] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    // Проверка при загрузке на наличие задач
    useEffect(() => {
        const loadData = async () => {
            const savedTasks = await loadTasks();
            setTasks(savedTasks);
        }

        loadData();
    }, []);

    // Функия добавление в список задач
    const addTask = async () => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: inputValue.trim(),
            isCompleted: false,
        };

        if (inputValue.trim() === "") {
            setInputValueError(true);
            return;
        }

        const updatedTasks = [newTask, ...tasks];
        setTasks(updatedTasks);
        await saveTasks(updatedTasks);

        setInputValue("");
        setInputValueError(false);
        Keyboard.dismiss();
    };

    // Функция для удаление задач
    const deleteTask = async (id: string) => {
        const updatedTasks = tasks.filter((task: { id: string }) => task.id !== id);

        setTasks(updatedTasks);
        await saveTasks(updatedTasks);
    };

    // Функция для отметки задачи как выполненной
    const handleTaskCompletion = async (id: string) => {
        const updatedTasks = tasks.map((task: Task) => {
            if (task.id === id) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return task;
        });

        setTasks(updatedTasks);
        await saveTasks(updatedTasks);
    }

    return {
        inputValue,
        setInputValue,
        inputValueError,
        setInputValueError,
        tasks,
        addTask,
        deleteTask,
        handleTaskCompletion
    }
};