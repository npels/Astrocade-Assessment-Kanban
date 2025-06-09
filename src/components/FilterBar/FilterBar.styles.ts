// Styles for FilterBar component

import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.surface,
		paddingVertical: theme.spacing.sm,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border,
	},
	scrollContent: {
		paddingHorizontal: theme.spacing.md,
		alignItems: "center",
		gap: theme.spacing.sm,
	},
	counter: {
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.xs,
		backgroundColor: theme.colors.background,
		borderRadius: theme.borderRadius.sm,
	},
	counterText: {
		fontSize: 14,
		fontWeight: "600",
		color: theme.colors.text.secondary,
	},
	clearButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.xs,
		backgroundColor: theme.colors.background,
		borderRadius: theme.borderRadius.sm,
	},
	clearText: {
		fontSize: 14,
		color: theme.colors.text.secondary,
	},
	filterChip: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.xs,
		backgroundColor: theme.colors.primary + "20",
		borderRadius: theme.borderRadius.sm,
	},
	filterText: {
		fontSize: 14,
		fontWeight: "500",
		color: theme.colors.primary,
	},
});
