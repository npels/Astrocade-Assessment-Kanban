// Styles for TaskDetailModal component

import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
	},
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	content: {
		backgroundColor: theme.colors.surface,
		borderTopLeftRadius: theme.borderRadius.xl,
		borderTopRightRadius: theme.borderRadius.xl,
		maxHeight: "80%",
		...theme.shadow.md,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: theme.spacing.lg,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border,
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.md,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: theme.colors.text.primary,
	},
	priorityBadge: {
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.xs,
		borderRadius: theme.borderRadius.sm,
	},
	priorityText: {
		fontSize: 12,
		fontWeight: "700",
	},
	body: {
		padding: theme.spacing.lg,
	},
	section: {
		marginBottom: theme.spacing.xl,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: theme.colors.text.secondary,
		marginBottom: theme.spacing.sm,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.sm,
	},
	description: {
		fontSize: 16,
		color: theme.colors.text.secondary,
		lineHeight: 24,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: theme.spacing.sm,
	},
	infoItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.sm,
	},
	infoLabel: {
		fontSize: 14,
		color: theme.colors.text.secondary,
	},
	infoValue: {
		fontSize: 14,
		fontWeight: "500",
		color: theme.colors.text.primary,
	},
	tags: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: theme.spacing.sm,
	},
	tag: {
		backgroundColor: theme.colors.primary + "20",
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.xs,
		borderRadius: theme.borderRadius.md,
	},
	tagText: {
		fontSize: 14,
		color: theme.colors.primary,
		fontWeight: "500",
	},
	footer: {
		padding: theme.spacing.lg,
		gap: theme.spacing.md,
		borderTopWidth: 1,
		borderTopColor: theme.colors.border,
	},
	deleteButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing.sm,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.danger,
	},
	deleteText: {
		fontSize: 16,
		fontWeight: "600",
		color: theme.colors.danger,
	},
	sectionOptions: {
		flexDirection: "row",
		gap: theme.spacing.sm,
	},
	sectionOption: {
		flex: 1,
		paddingVertical: theme.spacing.sm,
		borderRadius: theme.borderRadius.md,
		borderWidth: 2,
		alignItems: "center",
	},
	sectionSelected: {
		borderWidth: 2,
	},
	statusText: {
		fontSize: 13,
		fontWeight: "600",
	},
});
