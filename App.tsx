// Main application entry point

import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KanbanBoard } from "./src/screens/KanbanBoard/KanbanBoard";
import { BoardConfigProvider } from "./src/components/contexts/BoardConfigContext";
import { DragDropProvider } from "./src/components/contexts/DragDropContext";

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar style="auto" />
			<BoardConfigProvider>
				<DragDropProvider>
					<KanbanBoard />
				</DragDropProvider>
			</BoardConfigProvider>
		</SafeAreaProvider>
	);
}
