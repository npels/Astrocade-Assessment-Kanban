// File: src/components/TaskCard/TaskCard.tsx
// Individual task card component with fixed numeric precision

import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	useAnimatedGestureHandler,
	withSpring,
	runOnJS,
	interpolate,
	withTiming,
} from "react-native-reanimated";
import { Task } from "../../types";
import { styles } from "./TaskCard.styles";
import { theme } from "../../constants/theme";
import { useDragDrop } from "../contexts/DragDropContext";

interface TaskCardProps {
	task: Task;
	onPress: (task: Task) => void;
	onDragStart?: (task: Task) => void;
	onDragEnd?: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const TaskCard = memo(
	({ task, onPress, onDragStart, onDragEnd }: TaskCardProps) => {
		const { setDraggedTask, draggedTask } = useDragDrop();
		const priorityColor = theme.colors.priority[task.priority];
		const dueDate = new Date(task.dueDate);
		const isOverdue = dueDate < new Date() && task.status !== "done";

		const translateX = useSharedValue(0);
		const translateY = useSharedValue(0);
		const scale = useSharedValue(1);
		const opacity = useSharedValue(1);
		const zIndex = useSharedValue(0);
		const isDragging = useSharedValue(false);

		const handleDragStart = (task: Task) => {
			"worklet";
			runOnJS(setDraggedTask)(task);
			if (onDragStart) {
				runOnJS(onDragStart)(task);
			}
		};

		const handleDragEnd = () => {
			"worklet";
			runOnJS(setDraggedTask)(null);
			if (onDragEnd) {
				runOnJS(onDragEnd)();
			}
		};

		const gestureHandler = useAnimatedGestureHandler<
			PanGestureHandlerGestureEvent,
			{ startX: number; startY: number }
		>({
			onStart: (_, ctx) => {
				ctx.startX = Math.round(translateX.value);
				ctx.startY = Math.round(translateY.value);
				isDragging.value = true;
				scale.value = withSpring(1.05, { damping: 15 });
				opacity.value = withSpring(0.9);
				zIndex.value = 1000;
				handleDragStart(task);
			},
			onActive: (event) => {
				translateX.value = Math.round(event.translationX);
				translateY.value = Math.round(event.translationY);
			},
			onEnd: () => {
				translateX.value = withSpring(0, { damping: 15 });
				translateY.value = withSpring(0, { damping: 15 });
				scale.value = withSpring(1, { damping: 15 });
				opacity.value = withSpring(1);
				zIndex.value = withTiming(0, { duration: 200 });
				isDragging.value = false;
				handleDragEnd();
			},
		});

		const animatedStyle = useAnimatedStyle(() => {
			const elevationValue = Math.round(
				interpolate(scale.value, [1, 1.05], [2, 8])
			);

			return {
				transform: [
					{ translateX: translateX.value },
					{ translateY: translateY.value },
					{ scale: scale.value },
				],
				opacity: opacity.value,
				zIndex: Math.round(zIndex.value),
				elevation: elevationValue,
			};
		});

		// Hide this card if it's being dragged (the dragged version will be shown as overlay)
		const isThisTaskBeingDragged = draggedTask?.id === task.id;

		return (
			<PanGestureHandler
				onGestureEvent={gestureHandler}
				minPointers={1}
				maxPointers={1}
				shouldCancelWhenOutside={false}
			>
				<Animated.View
					style={[animatedStyle, isThisTaskBeingDragged && { opacity: 0.3 }]}
				>
					<AnimatedTouchable
						onPress={() => onPress(task)}
						activeOpacity={0.8}
						style={[styles.container]}
					>
						<View
							style={[styles.priorityBar, { backgroundColor: priorityColor }]}
						/>

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
											isOverdue
												? theme.colors.danger
												: theme.colors.text.secondary
										}
									/>
									<Text
										style={[
											styles.dueDateText,
											isOverdue && styles.overdueText,
										]}
									>
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
					</AnimatedTouchable>
				</Animated.View>
			</PanGestureHandler>
		);
	}
);
