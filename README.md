![Screenshot](./assets/screens/social-preview.png "Screenshot")

# Welcome to the Todo App 📋

This is a simple **Todo** application built using [Expo](https://expo.dev) and **React Native**, featuring:

- Local data storage (AsyncStorage)
- Adding and deleting tasks
- Marking tasks as completed
- Input field validation (empty input is not allowed)

### 🎥 Demo (GIF)

<img src="./assets/screens/demo.gif" alt="Demo App" height="600"/>

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/DanilaMarkin/todo-list-app.git
```

2. Navigate to the project directory:

```bash
cd todo-list-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the app:

```bash
npm start
```

Once running, you can:

- Open the app in [Expo Go](https://expo.dev/go)
- Run it on an Android emulator or iOS simulator
- Use a [development build](https://docs.expo.dev/develop/development-builds/introduction/) for full access to native features

## 🧩 Tech Stack

- React
- React Native
- Expo (including expo-router)
- TypeScript

## 🛠️ Features

- 📦 **Data Storage**
  All tasks are saved in local storage to ensure data persistence even after restarting the app.

- ➕ **Adding Tasks**
  Enter text and press the "Add" button to create a new task. Empty input is not allowed (validation).

- ✅ **Completing Tasks**
  You can mark a task as completed — it will be crossed out.

- 🗑️ **Deleting Tasks**
  Tasks can be deleted with a single click.
