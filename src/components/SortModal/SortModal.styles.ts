// File: src/components/SortModal/SortModal.styles.ts
// Styles for SortModal component

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
		maxHeight: "70%",
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
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: theme.colors.text.secondary,
		marginBottom: theme.spacing.md,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	sortOption: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		marginBottom: theme.spacing.sm,
		backgroundColor: theme.colors.background,
	},
	sortOptionSelected: {
		backgroundColor: theme.colors.primary + "10",
		borderWidth: 1,
		borderColor: theme.colors.primary + "30",
	},
	sortOptionLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.md,
	},
	sortOptionText: {
		fontSize: 16,
		color: theme.colors.text.primary,
	},
	sortOptionTextSelected: {
		color: theme.colors.primary,
		fontWeight: "500",
	},
	directionIndicator: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
	},
	directionText: {
		fontSize: 14,
		color: theme.colors.primary,
	},
	directionSection: {
		marginTop: theme.spacing.xl,
	},
	directionOptions: {
		flexDirection: "row",
		gap: theme.spacing.md,
	},
	directionOption: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing.sm,
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.border,
		backgroundColor: theme.colors.surface,
	},
	directionOptionSelected: {
		borderColor: theme.colors.primary,
		backgroundColor: theme.colors.primary + "10",
	},
	directionOptionText: {
		fontSize: 14,
		color: theme.colors.text.primary,
	},
	selectedText: {
		color: theme.colors.primary,
		fontWeight: "500",
	},
	footer: {
		flexDirection: "row",
		gap: theme.spacing.md,
		padding: theme.spacing.lg,
		borderTopWidth: 1,
		borderTopColor: theme.colors.border,
	},
	clearButton: {
		flex: 1,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.border,
		alignItems: "center",
	},
	clearText: {
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
