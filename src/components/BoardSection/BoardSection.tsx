// File: src/components/BoardSection/BoardSection.tsx
// Board section component with fixed numeric precision

import React, { memo, useRef, useCallback } from "react";
import { View, Text, ScrollView, LayoutChangeEvent } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { TaskCard } from "../TaskCard/TaskCard";
import { Task, BoardSection as BoardSectionType } from "../../types";
import { styles } from "./BoardSection.styles";
import { useDragDrop } from "../contexts/DragDropContext";

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
		const { draggedTask, targetSection, setTargetSection } = useDragDrop();
		const dropZoneOpacity = useSharedValue(0);
		const dropZoneScale = useSharedValue(1);
		const sectionLayout = useRef({ x: 0, y: 0, width: 0, height: 0 });

		const isDropTarget = targetSection === sectionId;
		const isDraggingOver = draggedTask && isDropTarget;

		// Update drop zone animation when target changes
		React.useEffect(() => {
			if (isDraggingOver) {
				dropZoneOpacity.value = withSpring(0.1, { damping: 15 });
				dropZoneScale.value = withSpring(1.02, { damping: 15 });
			} else {
				dropZoneOpacity.value = withTiming(0, { duration: 200 });
				dropZoneScale.value = withSpring(1, { damping: 15 });
			}
		}, [isDraggingOver, dropZoneOpacity, dropZoneScale]);

		const handleLayout = useCallback((event: LayoutChangeEvent) => {
			const { x, y, width, height } = event.nativeEvent.layout;
			sectionLayout.current = {
				x: Math.round(x),
				y: Math.round(y),
				width: Math.round(width),
				height: Math.round(height),
			};
		}, []);

		const handleDragEnd = useCallback(() => {
			if (draggedTask && targetSection === sectionId && onTaskDrop) {
				onTaskDrop(draggedTask.id, sectionId);
			}
		}, [draggedTask, targetSection, sectionId, onTaskDrop]);

		// Listen for drag end
		React.useEffect(() => {
			if (!draggedTask && targetSection === sectionId) {
				handleDragEnd();
				setTargetSection(null);
			}
		}, [
			draggedTask,
			targetSection,
			sectionId,
			handleDragEnd,
			setTargetSection,
		]);

		const animatedDropZoneStyle = useAnimatedStyle(() => {
			return {
				opacity: dropZoneOpacity.value,
				transform: [{ scale: dropZoneScale.value }],
			};
		});

		const animatedContainerStyle = useAnimatedStyle(() => {
			return {
				borderWidth: isDraggingOver ? 2 : 0,
				borderColor: isDraggingOver ? color : "transparent",
			};
		});

		return (
			<Animated.View
				style={[styles.container, animatedContainerStyle]}
				onLayout={handleLayout}
			>
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
					nestedScrollEnabled
					scrollEventThrottle={16}
				>
					<Animated.View
						style={[
							styles.dropZone,
							{ backgroundColor: color },
							animatedDropZoneStyle,
						]}
						pointerEvents="none"
					/>

					{tasks.length === 0 && !isDraggingOver ? (
						<View style={styles.emptyState}>
							<Text style={styles.emptyText}>No tasks</Text>
						</View>
					) : (
						<>
							{isDraggingOver && (
								<View style={styles.dropPlaceholder}>
									<Text style={[styles.dropPlaceholderText, { color }]}>
										Drop here
									</Text>
								</View>
							)}
							{tasks.map((task) => (
								<TaskCard key={task.id} task={task} onPress={onTaskPress} />
							))}
						</>
					)}
				</ScrollView>
			</Animated.View>
		);
	}
);
