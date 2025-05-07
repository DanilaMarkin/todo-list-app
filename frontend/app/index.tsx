import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

export default function Index() {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      {/* Header Title */}
      <View style={styles.container}>
        <Text style={styles.currentDay}>
          Today
        </Text>
        {/* Calendar Lists */}
        <View style={styles.calendarBlocks}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 22
  },
  currentDay: {
    color: "#000000",
    fontSize: 36,
    fontWeight: 700
  },
  calendarBlocks: {
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
});