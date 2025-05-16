import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

// Имя для локального хранилища
const STORAGE_KEY = "tasks";

// Функция для первоначальной загрузки данных
export const loadTasks = async (): Promise<Task[]> => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
};

// Функция для сохранения задач в локальное хранилище
export const saveTasks = async (newTasks: Task[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
};