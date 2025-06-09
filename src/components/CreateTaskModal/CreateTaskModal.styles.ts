// Styles for CreateTaskModal component

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
		maxHeight: "90%",
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
	form: {
		padding: theme.spacing.lg,
	},
	field: {
		marginBottom: theme.spacing.lg,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.sm,
	},
	input: {
		borderWidth: 1,
		borderColor: theme.colors.border,
		borderRadius: theme.borderRadius.md,
		padding: theme.spacing.md,
		fontSize: 16,
		color: theme.colors.text.primary,
	},
	textArea: {
		minHeight: 80,
		textAlignVertical: "top",
	},
	priorityOptions: {
		flexDirection: "row",
		gap: theme.spacing.sm,
	},
	priorityOption: {
		flex: 1,
		paddingVertical: theme.spacing.sm,
		paddingHorizontal: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		borderWidth: 2,
		alignItems: "center",
	},
	prioritySelected: {
		borderWidth: 2,
	},
	priorityText: {
		fontSize: 14,
		fontWeight: "600",
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
		fontSize: 16,
		color: theme.colors.text.primary,
	},
	footer: {
		flexDirection: "row",
		gap: theme.spacing.md,
		padding: theme.spacing.lg,
		borderTopWidth: 1,
		borderTopColor: theme.colors.border,
	},
	cancelButton: {
		flex: 1,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.border,
		alignItems: "center",
	},
	cancelText: {
		fontSize: 16,
		fontWeight: "600",
		color: theme.colors.text.secondary,
	},
	submitButton: {
		flex: 1,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
	},
	submitDisabled: {
		opacity: 0.5,
	},
	submitText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#FFFFFF",
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
