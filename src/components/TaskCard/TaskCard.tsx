// Individual task card component

import React, { memo } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Task } from "../../types";
import { styles } from "./TaskCard.styles";
import { theme } from "../../constants/theme";

interface TaskCardProps {
	task: Task;
	onPress: (task: Task) => void;
	isDragging?: boolean;
}

export const TaskCard = memo(({ task, onPress, isDragging }: TaskCardProps) => {
	const priorityColor = theme.colors.priority[task.priority];
	const dueDate = new Date(task.dueDate);
	const isOverdue = dueDate < new Date() && task.status !== "done";

	return (
		<TouchableOpacity
			onPress={() => onPress(task)}
			activeOpacity={0.8}
			style={[styles.container, isDragging && styles.dragging]}
		>
			<View style={[styles.priorityBar, { backgroundColor: priorityColor }]} />

			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={2}>
					{task.title}
				</Text>

				<Text style={styles.description} numberOfLines={2}>
					{task.description}
				</Text>

				<View style={styles.metadata}>
					<View style={styles.assignee}>
						<Feather
							name="user"
							size={12}
							color={theme.colors.text.secondary}
						/>
						<Text style={styles.assigneeText}>{task.assignee}</Text>
					</View>

					<View style={[styles.dueDate, isOverdue && styles.overdue]}>
						<Feather
							name="calendar"
							size={12}
							color={
								isOverdue ? theme.colors.danger : theme.colors.text.secondary
							}
						/>
						<Text style={[styles.dueDateText, isOverdue && styles.overdueText]}>
							{dueDate.toLocaleDateString()}
						</Text>
					</View>
				</View>

				<View style={styles.tags}>
					{task.tags.slice(0, 2).map((tag, index) => (
						<View key={index} style={styles.tag}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
					{task.tags.length > 2 && (
						<Text style={styles.moreTag}>+{task.tags.length - 2}</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
});
