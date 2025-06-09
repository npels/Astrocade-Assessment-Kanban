// Styles for TaskCard component

import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.surface,
		borderRadius: theme.borderRadius.md,
		marginHorizontal: theme.spacing.md,
		marginVertical: theme.spacing.sm,
		...theme.shadow.sm,
		overflow: "hidden",
	},
	dragging: {
		opacity: 0.8,
		...theme.shadow.md,
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
		marginBottom: theme.spacing.xs,
	},
	description: {
		fontSize: 14,
		color: theme.colors.text.secondary,
		marginBottom: theme.spacing.sm,
	},
	metadata: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: theme.spacing.sm,
	},
	assignee: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
	},
	assigneeText: {
		fontSize: 12,
		color: theme.colors.text.secondary,
	},
	dueDate: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
	},
	dueDateText: {
		fontSize: 12,
		color: theme.colors.text.secondary,
	},
	overdue: {
		backgroundColor: "#FEE2E2",
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: 2,
		borderRadius: theme.borderRadius.sm,
	},
	overdueText: {
		color: theme.colors.danger,
		fontWeight: "500",
	},
	tags: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: theme.spacing.xs,
	},
	tag: {
		backgroundColor: theme.colors.primary + "20",
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: 2,
		borderRadius: theme.borderRadius.sm,
	},
	tagText: {
		fontSize: 11,
		color: theme.colors.primary,
		fontWeight: "500",
	},
	moreTag: {
		fontSize: 11,
		color: theme.colors.text.light,
		fontWeight: "500",
	},
});
