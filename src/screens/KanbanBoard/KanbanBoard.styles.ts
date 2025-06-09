// Styles for KanbanBoard screen

import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.background,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
		backgroundColor: theme.colors.surface,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: theme.colors.text.primary,
	},
	filterButton: {
		padding: theme.spacing.sm,
	},
	errorBanner: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: theme.colors.danger + "20",
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
	},
	errorText: {
		color: theme.colors.danger,
		fontSize: 14,
	},
	retryText: {
		color: theme.colors.danger,
		fontSize: 14,
		fontWeight: "600",
	},
	boardContent: {
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.md,
	},
	fab: {
		position: "absolute",
		bottom: theme.spacing.xl,
		right: theme.spacing.lg,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: theme.colors.primary,
		justifyContent: "center",
		alignItems: "center",
		...theme.shadow.md,
	},
});
