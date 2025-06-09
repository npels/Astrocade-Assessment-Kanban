// Main application entry point

import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KanbanBoard } from "./src/screens/KanbanBoard/KanbanBoard";
import { BoardConfigProvider } from "./src/components/contexts/BoardConfigContext";

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar style="auto" />
			<BoardConfigProvider>
				<KanbanBoard />
			</BoardConfigProvider>
		</SafeAreaProvider>
	);
}
