// Styles for BoardSection component

import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		minWidth: 300,
		maxWidth: 350,
	},
	header: {
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.md,
		backgroundColor: theme.colors.surface,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 3,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: theme.colors.text.primary,
	},
	badge: {
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.xs,
		borderRadius: theme.borderRadius.sm,
	},
	badgeText: {
		fontSize: 14,
		fontWeight: "600",
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingVertical: theme.spacing.sm,
	},
	dropZone: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	emptyState: {
		padding: theme.spacing.xl,
		alignItems: "center",
	},
	emptyText: {
		color: theme.colors.text.light,
		fontSize: 14,
	},
	dropPlaceholder: {
		margin: theme.spacing.md,
		padding: theme.spacing.lg,
		borderRadius: theme.borderRadius.md,
		borderWidth: 2,
		borderStyle: "dashed",
		borderColor: theme.colors.border,
		alignItems: "center",
	},
	dropPlaceholderText: {
		fontSize: 14,
		fontWeight: "600",
	},
});
