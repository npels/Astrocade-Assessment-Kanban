// Styles for KanbanBoard screen with filter button updates

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
		position: "relative",
	},
	filterButtonActive: {
		backgroundColor: theme.colors.primary + "10",
		borderRadius: theme.borderRadius.md,
	},
	filterBadge: {
		position: "absolute",
		top: 0,
		right: 0,
		backgroundColor: theme.colors.primary,
		borderRadius: 10,
		minWidth: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 4,
	},
	filterBadgeText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontWeight: "600",
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
	sortButton: {
		padding: theme.spacing.sm,
		position: "relative",
	},
	sortButtonActive: {
		backgroundColor: theme.colors.primary + "10",
		borderRadius: theme.borderRadius.md,
	},
	sortBanner: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
	},
	sortBannerText: {
		color: theme.colors.text.primary,
		fontSize: 14,
	},
	sortIndicator: {
		width: 20,
		height: 0,
	},
	headerActions: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.sm,
	},
});
