// Modal for viewing and editing task details

import React, { useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BoardSection, Task } from "../../types";
import { styles } from "./TaskDetailModal.styles";
import { theme } from "../../constants/theme";
import { useBoardConfig } from "../contexts/BoardConfigContext";

interface TaskDetailModalProps {
	visible: boolean;
	task: Task | null;
	onClose: () => void;
	onUpdate: (id: string, updates: Partial<Task>) => void;
	onDelete: (id: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
	visible,
	task,
	onClose,
	onUpdate,
	onDelete,
}) => {
	if (!task) return null;

	const handleDelete = () => {
		Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: () => {
					onDelete(task.id);
					onClose();
				},
			},
		]);
	};

	const handleUpdateStatus = (newStatus: BoardSection) => {
		if (status !== newStatus) {
			setStatus(newStatus);
			onUpdate(task.id, { status: newStatus });
		}
	};

	const priorityColor = theme.colors.priority[task.priority];
	const dueDate = new Date(task.dueDate);
	const createdDate = new Date(task.createdAt);

	const { boardConfig } = useBoardConfig();
	const [status, setStatus] = useState<BoardSection>(task.status);

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<View style={styles.backdrop} onTouchEnd={onClose} />

				<View style={styles.content}>
					<View style={styles.header}>
						<View style={styles.headerLeft}>
							<Text style={styles.headerTitle}>Task Details</Text>
							<View
								style={[
									styles.priorityBadge,
									{ backgroundColor: priorityColor + "20" },
								]}
							>
								<Text style={[styles.priorityText, { color: priorityColor }]}>
									{task.priority.toUpperCase()}
								</Text>
							</View>
						</View>
						<TouchableOpacity onPress={onClose}>
							<Feather name="x" size={24} color={theme.colors.text.primary} />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
						<View style={styles.section}>
							<Text style={styles.title}>{task.title}</Text>
							<Text style={styles.description}>{task.description}</Text>
						</View>

						<View style={styles.section}>
							<View style={styles.infoRow}>
								<View style={styles.infoItem}>
									<Feather
										name="user"
										size={16}
										color={theme.colors.text.secondary}
									/>
									<Text style={styles.infoLabel}>Assignee</Text>
								</View>
								<Text style={styles.infoValue}>{task.assignee}</Text>
							</View>

							<View style={styles.infoRow}>
								<View style={styles.infoItem}>
									<Feather
										name="folder"
										size={16}
										color={theme.colors.text.secondary}
									/>
									<Text style={styles.infoLabel}>Status</Text>
								</View>
								<Text style={styles.infoValue}>
									{status.charAt(0).toUpperCase() + status.slice(1)}
								</Text>
							</View>

							<View style={styles.infoRow}>
								<View style={styles.infoItem}>
									<Feather
										name="calendar"
										size={16}
										color={theme.colors.text.secondary}
									/>
									<Text style={styles.infoLabel}>Due Date</Text>
								</View>
								<Text style={styles.infoValue}>
									{dueDate.toLocaleDateString()}
								</Text>
							</View>

							<View style={styles.infoRow}>
								<View style={styles.infoItem}>
									<Feather
										name="clock"
										size={16}
										color={theme.colors.text.secondary}
									/>
									<Text style={styles.infoLabel}>Created</Text>
								</View>
								<Text style={styles.infoValue}>
									{createdDate.toLocaleDateString()}
								</Text>
							</View>
						</View>

						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Tags</Text>
							<View style={styles.tags}>
								{task.tags.map((tag, index) => (
									<View key={index} style={styles.tag}>
										<Text style={styles.tagText}>{tag}</Text>
									</View>
								))}
							</View>
						</View>
					</ScrollView>

					<View style={styles.footer}>
						<View style={styles.sectionOptions}>
							{(["todo", "doing", "review", "done"] as const).map((s) => (
								<TouchableOpacity
									key={s}
									style={[
										styles.sectionOption,
										status === s && styles.sectionSelected,
										{ borderColor: theme.colors.section[s] },
										status === s && {
											backgroundColor: theme.colors.section[s] + "35",
										},
									]}
									onPress={() => handleUpdateStatus(s)}
								>
									<Text
										style={[
											styles.statusText,
											{ color: theme.colors.section[s] },
										]}
									>
										{
											boardConfig.sections.find((section) => section.id === s)
												?.title
										}
									</Text>
								</TouchableOpacity>
							))}
						</View>

						<TouchableOpacity
							style={styles.deleteButton}
							onPress={handleDelete}
						>
							<Feather name="trash-2" size={20} color={theme.colors.danger} />
							<Text style={styles.deleteText}>Delete</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};
