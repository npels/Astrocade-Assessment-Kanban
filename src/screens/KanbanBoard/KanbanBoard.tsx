// Main Kanban board screen with filter functionality

import React, { useState, useCallback, useRef, useMemo } from "react";
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
import { FilterModal } from "../../components/FilterModal/FilterModal";
import {
	Task,
	BoardSection as BoardSectionType,
	BoardConfig,
} from "../../types";
import { styles } from "./KanbanBoard.styles";
import { theme } from "../../constants/theme";
import { SortModal } from "../../components/SortModal/SortModal";
import { useBoardConfig } from "../../components/contexts/BoardConfigContext";

export const KanbanBoard: React.FC = () => {
	const {
		tasks,
		loading,
		error,
		filters,
		setFilters,
		sortOptions,
		setSortOptions,
		createTask,
		updateTask,
		deleteTask,
		refetch,
	} = useTasks();

	const { boardConfig } = useBoardConfig();
	const [createModalVisible, setCreateModalVisible] = useState(false);
	const [filterModalVisible, setFilterModalVisible] = useState(false);
	const [sortModalVisible, setSortModalVisible] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [activeSection, setActiveSection] = useState<BoardSectionType>("todo");
	const [refreshing, setRefreshing] = useState(false);

	const scrollViewRef = useRef<ScrollView>(null);

	// Extract unique assignees and tags from all tasks
	const { availableAssignees, availableTags } = useMemo(() => {
		const assignees = new Set<string>();
		const tags = new Set<string>();

		// Get from ALL tasks, not just filtered ones
		const allTasks = tasks; // This should ideally come from a separate source

		allTasks.forEach((task) => {
			assignees.add(task.assignee);
			task.tags.forEach((tag) => tags.add(tag));
		});

		return {
			availableAssignees: Array.from(assignees).sort(),
			availableTags: Array.from(tags).sort(),
		};
	}, [tasks]);

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

	const hasActiveFilters = Object.values(filters).some(
		(value) =>
			value !== undefined && (Array.isArray(value) ? value.length > 0 : true)
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
					style={[styles.sortButton, sortOptions && styles.sortButtonActive]}
					onPress={() => setSortModalVisible(true)}
				>
					<Feather
						name="bar-chart-2"
						size={20}
						color={
							sortOptions ? theme.colors.primary : theme.colors.text.primary
						}
					/>
					{sortOptions && (
						<View style={styles.sortIndicator}>
							<Feather
								name={
									sortOptions.direction === "asc" ? "arrow-up" : "arrow-down"
								}
								size={12}
								color="#FFFFFF"
							/>
						</View>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.filterButton,
						hasActiveFilters && styles.filterButtonActive,
					]}
					onPress={() => setFilterModalVisible(true)}
				>
					<Feather
						name="filter"
						size={20}
						color={
							hasActiveFilters
								? theme.colors.primary
								: theme.colors.text.primary
						}
					/>
					{hasActiveFilters && (
						<View style={styles.filterBadge}>
							<Text style={styles.filterBadgeText}>
								{
									Object.values(filters).filter(
										(v) =>
											v !== undefined &&
											(Array.isArray(v) ? v.length > 0 : true)
									).length
								}
							</Text>
						</View>
					)}
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

			{sortOptions && (
				<View style={styles.sortBanner}>
					<Text style={styles.sortBannerText}>
						Sorted by {sortOptions.field} (
						{sortOptions.direction === "asc" ? "ascending" : "descending"})
					</Text>
				</View>
			)}

			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled={false}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.boardContent}
				nestedScrollEnabled
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

			<FilterModal
				visible={filterModalVisible}
				onClose={() => setFilterModalVisible(false)}
				filters={filters}
				onApply={setFilters}
				availableAssignees={availableAssignees}
				availableTags={availableTags}
			/>

			<SortModal
				visible={sortModalVisible}
				onClose={() => setSortModalVisible(false)}
				currentSort={sortOptions}
				onApply={setSortOptions}
			/>
		</SafeAreaView>
	);
};
