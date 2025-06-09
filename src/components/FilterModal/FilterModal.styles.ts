// Styles for FilterModal component

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
	headerTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: theme.colors.text.primary,
	},
	body: {
		padding: theme.spacing.lg,
	},
	section: {
		marginBottom: theme.spacing.xl,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.md,
	},
	optionGroup: {
		flexDirection: "row",
		gap: theme.spacing.sm,
		flexWrap: "wrap",
	},
	option: {
		paddingVertical: theme.spacing.sm,
		paddingHorizontal: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.border,
		backgroundColor: theme.colors.surface,
	},
	optionSelected: {
		borderColor: theme.colors.primary,
		backgroundColor: theme.colors.primary + "20",
	},
	optionText: {
		fontSize: 14,
		color: theme.colors.text.primary,
	},
	selectedText: {
		color: theme.colors.primary,
		fontWeight: "500",
	},
	dateButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.sm,
		borderWidth: 1,
		borderColor: theme.colors.border,
		borderRadius: theme.borderRadius.md,
		padding: theme.spacing.md,
	},
	dateText: {
		flex: 1,
		fontSize: 16,
		color: theme.colors.text.primary,
	},
	tagGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: theme.spacing.sm,
	},
	tag: {
		paddingVertical: theme.spacing.sm,
		paddingHorizontal: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.border,
		backgroundColor: theme.colors.surface,
	},
	tagSelected: {
		borderColor: theme.colors.primary,
		backgroundColor: theme.colors.primary + "20",
	},
	tagText: {
		fontSize: 14,
		color: theme.colors.text.primary,
	},
	footer: {
		flexDirection: "row",
		gap: theme.spacing.md,
		padding: theme.spacing.lg,
		borderTopWidth: 1,
		borderTopColor: theme.colors.border,
	},
	resetButton: {
		flex: 1,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.border,
		alignItems: "center",
	},
	resetText: {
		fontSize: 16,
		fontWeight: "600",
		color: theme.colors.text.secondary,
	},
	applyButton: {
		flex: 1,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
	},
	applyText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#FFFFFF",
	},
});
