// File: src/components/DragOverlay/DragOverlay.tsx
// Overlay component with fixed numeric precision

import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	useAnimatedGestureHandler,
	withSpring,
	runOnJS,
} from "react-native-reanimated";
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useDragDrop } from "../contexts/DragDropContext";
import { theme } from "../../constants/theme";
import { BoardSection } from "../../types";

const { width: screenWidth } = Dimensions.get("window");

interface DragOverlayProps {
	onDropZoneEnter: (section: BoardSection) => void;
	onDropZoneLeave: () => void;
	dropZones: Array<{
		section: BoardSection;
		x: number;
		y: number;
		width: number;
		height: number;
	}>;
}

export const DragOverlay: React.FC<DragOverlayProps> = ({
	onDropZoneEnter,
	onDropZoneLeave,
	dropZones,
}) => {
	const { draggedTask, setDraggedTask, setTargetSection } = useDragDrop();
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const scale = useSharedValue(1);

	if (!draggedTask) return null;

	const checkDropZone = (x: number, y: number) => {
		"worklet";
		const roundedX = Math.round(x);
		const roundedY = Math.round(y);

		for (const zone of dropZones) {
			const zoneLeft = Math.round(zone.x);
			const zoneRight = Math.round(zone.x + zone.width);
			const zoneTop = Math.round(zone.y);
			const zoneBottom = Math.round(zone.y + zone.height);

			if (
				roundedX >= zoneLeft &&
				roundedX <= zoneRight &&
				roundedY >= zoneTop &&
				roundedY <= zoneBottom
			) {
				runOnJS(onDropZoneEnter)(zone.section);
				return;
			}
		}
		runOnJS(onDropZoneLeave)();
	};

	const gestureHandler = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		{ startX: number; startY: number }
	>({
		onStart: (event, ctx) => {
			ctx.startX = Math.round(event.absoluteX);
			ctx.startY = Math.round(event.absoluteY);
			scale.value = withSpring(1.1, { damping: 15 });
		},
		onActive: (event) => {
			translateX.value = Math.round(event.translationX);
			translateY.value = Math.round(event.translationY);
			checkDropZone(event.absoluteX, event.absoluteY);
		},
		onEnd: () => {
			translateX.value = withSpring(0, { damping: 15 });
			translateY.value = withSpring(0, { damping: 15 });
			scale.value = withSpring(1, { damping: 15 });
			runOnJS(setDraggedTask)(null);
			runOnJS(setTargetSection)(null);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
				{ scale: scale.value },
			],
		};
	});

	const priorityColor = theme.colors.priority[draggedTask.priority];

	return (
		<PanGestureHandler onGestureEvent={gestureHandler}>
			<Animated.View style={[styles.overlay, animatedStyle]}>
				<View style={styles.card}>
					<View
						style={[styles.priorityBar, { backgroundColor: priorityColor }]}
					/>
					<View style={styles.content}>
						<Text style={styles.title} numberOfLines={2}>
							{draggedTask.title}
						</Text>
						<View style={styles.metadata}>
							<View style={styles.metaItem}>
								<Feather
									name="user"
									size={12}
									color={theme.colors.text.secondary}
								/>
								<Text style={styles.metaText}>{draggedTask.assignee}</Text>
							</View>
						</View>
					</View>
				</View>
			</Animated.View>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		top: 100,
		left: 20,
		width: Math.round(screenWidth * 0.8),
		zIndex: 9999,
		elevation: 999,
	},
	card: {
		backgroundColor: theme.colors.surface,
		borderRadius: theme.borderRadius.md,
		...theme.shadow.md,
		overflow: "hidden",
		opacity: 0.95,
	},
	priorityBar: {
		height: 4,
		width: "100%",
	},
	content: {
		padding: theme.spacing.md,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.sm,
	},
	metadata: {
		flexDirection: "row",
		gap: theme.spacing.md,
	},
	metaItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
	},
	metaText: {
		fontSize: 12,
		color: theme.colors.text.secondary,
	},
});
