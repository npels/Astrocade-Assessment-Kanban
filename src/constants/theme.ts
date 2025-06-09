// Theme constants for consistent styling

export const theme = {
	colors: {
		primary: "#3B82F6",
		secondary: "#8B5CF6",
		success: "#10B981",
		warning: "#F59E0B",
		danger: "#EF4444",
		background: "#F3F4F6",
		surface: "#FFFFFF",
		text: {
			primary: "#1F2937",
			secondary: "#6B7280",
			light: "#9CA3AF",
		},
		border: "#E5E7EB",
		priority: {
			low: "#10B981",
			medium: "#F59E0B",
			high: "#EF4444",
		},
		section: {
			todo: "#6B7280",
			doing: "#3B82F6",
			review: "#F59E0B",
			done: "#10B981",
		},
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	borderRadius: {
		sm: 4,
		md: 8,
		lg: 12,
		xl: 16,
	},
	shadow: {
		sm: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.05,
			shadowRadius: 2,
			elevation: 2,
		},
		md: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 4,
		},
	},
};
