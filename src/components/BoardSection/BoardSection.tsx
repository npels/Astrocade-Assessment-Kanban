// Board section component that holds tasks

import React, { memo, useRef } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { TaskCard } from "../TaskCard/TaskCard";
import { Task, BoardSection as BoardSectionType } from "../../types";
import { styles } from "./BoardSection.styles";

interface BoardSectionProps {
	sectionId: BoardSectionType;
	title: string;
	tasks: Task[];
	color: string;
	onTaskPress: (task: Task) => void;
	onTaskDrop?: (taskId: string, newSection: BoardSectionType) => void;
}

export const BoardSection = memo(
	({
		sectionId,
		title,
		tasks,
		color,
		onTaskPress,
		onTaskDrop,
	}: BoardSectionProps) => {
		const scrollViewRef = useRef<ScrollView>(null);
		const dropZoneOpacity = useRef(new Animated.Value(0)).current;

		const handleDragEnter = () => {
			Animated.timing(dropZoneOpacity, {
				toValue: 0.1,
				duration: 200,
				useNativeDriver: true,
			}).start();
		};

		const handleDragLeave = () => {
			Animated.timing(dropZoneOpacity, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start();
		};

		return (
			<View style={styles.container}>
				<View style={[styles.header, { borderBottomColor: color }]}>
					<Text style={styles.title}>{title}</Text>
					<View style={[styles.badge, { backgroundColor: color + "20" }]}>
						<Text style={[styles.badgeText, { color }]}>{tasks.length}</Text>
					</View>
				</View>

				<ScrollView
					ref={scrollViewRef}
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<Animated.View
						style={[
							styles.dropZone,
							{ opacity: dropZoneOpacity, backgroundColor: color },
						]}
					/>

					{tasks.length === 0 ? (
						<View style={styles.emptyState}>
							<Text style={styles.emptyText}>No tasks</Text>
						</View>
					) : (
						tasks.map((task) => (
							<TaskCard key={task.id} task={task} onPress={onTaskPress} />
						))
					)}
				</ScrollView>
			</View>
		);
	}
);
