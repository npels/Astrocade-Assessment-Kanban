// Main Kanban board screen

import React, { useState, useCallback, useRef } from "react";
import {
	View,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	Text,
	Alert,
	RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTasks } from "../../hooks/useTasks";
import { BoardSection } from "../../components/BoardSection/BoardSection";
import { CreateTaskModal } from "../../components/CreateTaskModal/CreateTaskModal";
import { TaskDetailModal } from "../../components/TaskDetailModal/TaskDetailModal";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import {
	Task,
	BoardSection as BoardSectionType,
	BoardConfig,
} from "../../types";
import { styles } from "./KanbanBoard.styles";
import { theme } from "../../constants/theme";

const defaultBoardConfig: BoardConfig = {
	sections: [
		{ id: "todo", title: "To Do", color: "#6B7280" },
		{ id: "doing", title: "In Progress", color: "#3B82F6" },
		{ id: "review", title: "Review", color: "#F59E0B" },
		{ id: "done", title: "Done", color: "#10B981" },
	],
};

export const KanbanBoard: React.FC = () => {
	const {
		tasks,
		loading,
		error,
		filters,
		setFilters,
		createTask,
		updateTask,
		deleteTask,
		refetch,
	} = useTasks();

	const [boardConfig] = useState<BoardConfig>(defaultBoardConfig);
	const [createModalVisible, setCreateModalVisible] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [activeSection, setActiveSection] = useState<BoardSectionType>("todo");
	const [refreshing, setRefreshing] = useState(false);

	const scrollViewRef = useRef<ScrollView>(null);

	const handleRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, [refetch]);

	const handleTaskPress = useCallback((task: Task) => {
		setSelectedTask(task);
	}, []);

	const handleTaskUpdate = useCallback(
		async (id: string, updates: Partial<Task>) => {
			try {
				await updateTask(id, updates);
			} catch (err) {
				Alert.alert("Error", "Failed to update task");
			}
		},
		[updateTask]
	);

	const handleTaskDelete = useCallback(
		async (id: string) => {
			try {
				await deleteTask(id);
			} catch (err) {
				Alert.alert("Error", "Failed to delete task");
			}
		},
		[deleteTask]
	);

	const handleCreateTask = useCallback(
		async (task: Omit<Task, "id" | "createdAt">) => {
			try {
				await createTask(task);
			} catch (err) {
				Alert.alert("Error", "Failed to create task");
			}
		},
		[createTask]
	);

	const handleOpenCreateModal = useCallback((section: BoardSectionType) => {
		setActiveSection(section);
		setCreateModalVisible(true);
	}, []);

	const getTasksForSection = useCallback(
		(sectionId: BoardSectionType) => {
			return tasks.filter((task) => task.status === sectionId);
		},
		[tasks]
	);

	if (loading && tasks.length === 0) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={theme.colors.primary} />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Kanban Board</Text>
				<TouchableOpacity
					style={styles.filterButton}
					onPress={() => {
						// In a real app, this would open a filter modal
						Alert.alert(
							"Filters",
							"Filter functionality would be implemented here"
						);
					}}
				>
					<Feather name="filter" size={20} color={theme.colors.text.primary} />
				</TouchableOpacity>
			</View>

			<FilterBar
				filters={filters}
				onFiltersChange={setFilters}
				taskCount={tasks.length}
			/>

			{error && (
				<View style={styles.errorBanner}>
					<Text style={styles.errorText}>{error}</Text>
					<TouchableOpacity onPress={refetch}>
						<Text style={styles.retryText}>Retry</Text>
					</TouchableOpacity>
				</View>
			)}

			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled={false}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.boardContent}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
			>
				{boardConfig.sections.map((section) => (
					<BoardSection
						key={section.id}
						sectionId={section.id}
						title={section.title}
						color={section.color}
						tasks={getTasksForSection(section.id)}
						onTaskPress={handleTaskPress}
					/>
				))}
			</ScrollView>

			<TouchableOpacity
				style={styles.fab}
				onPress={() => handleOpenCreateModal("todo")}
			>
				<Feather name="plus" size={24} color="#FFFFFF" />
			</TouchableOpacity>

			<CreateTaskModal
				visible={createModalVisible}
				onClose={() => setCreateModalVisible(false)}
				onSubmit={handleCreateTask}
				defaultSection={activeSection}
			/>

			<TaskDetailModal
				visible={!!selectedTask}
				task={selectedTask}
				onClose={() => setSelectedTask(null)}
				onUpdate={handleTaskUpdate}
				onDelete={handleTaskDelete}
			/>
		</SafeAreaView>
	);
};
