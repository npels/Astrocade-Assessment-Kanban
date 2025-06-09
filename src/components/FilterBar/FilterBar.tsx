// Filter bar component for filtering tasks

import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FilterOptions } from "../../types";
import { styles } from "./FilterBar.styles";
import { theme } from "../../constants/theme";

interface FilterBarProps {
	filters: FilterOptions;
	onFiltersChange: (filters: FilterOptions) => void;
	taskCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
	filters,
	onFiltersChange,
	taskCount,
}) => {
	const activeFiltersCount = Object.values(filters).filter(Boolean).length;

	const clearFilters = () => {
		onFiltersChange({});
	};

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.counter}>
					<Text style={styles.counterText}>{taskCount} tasks</Text>
				</View>

				{activeFiltersCount > 0 && (
					<>
						<TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
							<Feather name="x" size={16} color={theme.colors.text.secondary} />
							<Text style={styles.clearText}>Clear filters</Text>
						</TouchableOpacity>

						{filters.priority && (
							<View
								style={[
									styles.filterChip,
									{
										backgroundColor:
											theme.colors.priority[filters.priority] + "20",
									},
								]}
							>
								<Text
									style={[
										styles.filterText,
										{ color: theme.colors.priority[filters.priority] },
									]}
								>
									{filters.priority}
								</Text>
							</View>
						)}

						{filters.assignee && (
							<View style={styles.filterChip}>
								<Feather name="user" size={12} color={theme.colors.primary} />
								<Text style={styles.filterText}>{filters.assignee}</Text>
							</View>
						)}

						{filters.tags?.map((tag, index) => (
							<View key={index} style={styles.filterChip}>
								<Text style={styles.filterText}>#{tag}</Text>
							</View>
						))}
					</>
				)}
			</ScrollView>
		</View>
	);
};
