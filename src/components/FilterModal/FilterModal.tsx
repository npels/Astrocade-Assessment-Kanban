// Modal for filtering tasks

import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FilterOptions, Task } from "../../types";
import { styles } from "./FilterModal.styles";
import { theme } from "../../constants/theme";

interface FilterModalProps {
	visible: boolean;
	onClose: () => void;
	filters: FilterOptions;
	onApply: (filters: FilterOptions) => void;
	availableAssignees: string[];
	availableTags: string[];
}

export const FilterModal: React.FC<FilterModalProps> = ({
	visible,
	onClose,
	filters,
	onApply,
	availableAssignees,
	availableTags,
}) => {
	const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedTags, setSelectedTags] = useState<Set<string>>(
		new Set(filters.tags || [])
	);

	useEffect(() => {
		setLocalFilters(filters);
		setSelectedTags(new Set(filters.tags || []));
	}, [filters, visible]);

	const handleApply = () => {
		onApply({
			...localFilters,
			tags: selectedTags.size > 0 ? Array.from(selectedTags) : undefined,
		});
		onClose();
	};

	const handleReset = () => {
		setLocalFilters({});
		setSelectedTags(new Set());
	};

	const toggleTag = (tag: string) => {
		const newTags = new Set(selectedTags);
		if (newTags.has(tag)) {
			newTags.delete(tag);
		} else {
			newTags.add(tag);
		}
		setSelectedTags(newTags);
	};

	const setPriority = (priority: Task["priority"] | undefined) => {
		setLocalFilters((prev) => ({ ...prev, priority }));
	};

	const setAssignee = (assignee: string | undefined) => {
		setLocalFilters((prev) => ({ ...prev, assignee }));
	};

	const setDueDateAfter = (date: string | undefined) => {
		setLocalFilters((prev) => ({ ...prev, dueDateAfter: date }));
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<View style={styles.backdrop} onTouchEnd={onClose} />

				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.headerTitle}>Filter Tasks</Text>
						<TouchableOpacity onPress={onClose}>
							<Feather name="x" size={24} color={theme.colors.text.primary} />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
						{/* Priority Filter */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Priority</Text>
							<View style={styles.optionGroup}>
								<TouchableOpacity
									style={[
										styles.option,
										!localFilters.priority && styles.optionSelected,
									]}
									onPress={() => setPriority(undefined)}
								>
									<Text style={styles.optionText}>All</Text>
								</TouchableOpacity>
								{(["low", "medium", "high"] as const).map((priority) => (
									<TouchableOpacity
										key={priority}
										style={[
											styles.option,
											localFilters.priority === priority &&
												styles.optionSelected,
											localFilters.priority === priority && {
												backgroundColor: theme.colors.priority[priority] + "20",
												borderColor: theme.colors.priority[priority],
											},
										]}
										onPress={() => setPriority(priority)}
									>
										<Text
											style={[
												styles.optionText,
												localFilters.priority === priority && {
													color: theme.colors.priority[priority],
												},
											]}
										>
											{priority.charAt(0).toUpperCase() + priority.slice(1)}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>

						{/* Assignee Filter */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Assignee</Text>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.optionGroup}
							>
								<TouchableOpacity
									style={[
										styles.option,
										!localFilters.assignee && styles.optionSelected,
									]}
									onPress={() => setAssignee(undefined)}
								>
									<Text style={styles.optionText}>All</Text>
								</TouchableOpacity>
								{availableAssignees.map((assignee) => (
									<TouchableOpacity
										key={assignee}
										style={[
											styles.option,
											localFilters.assignee === assignee &&
												styles.optionSelected,
										]}
										onPress={() => setAssignee(assignee)}
									>
										<Text
											style={[
												styles.optionText,
												localFilters.assignee === assignee &&
													styles.selectedText,
											]}
										>
											{assignee}
										</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>

						{/* Due Date Filter */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Due Date After</Text>
							<TouchableOpacity
								style={styles.dateButton}
								onPress={() => setShowDatePicker(true)}
							>
								<Feather
									name="calendar"
									size={16}
									color={theme.colors.text.secondary}
								/>
								<Text style={styles.dateText}>
									{localFilters.dueDateAfter
										? new Date(localFilters.dueDateAfter).toLocaleDateString()
										: "Select date"}
								</Text>
								{localFilters.dueDateAfter && (
									<TouchableOpacity
										onPress={() => setDueDateAfter(undefined)}
										hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
									>
										<Feather
											name="x"
											size={16}
											color={theme.colors.text.secondary}
										/>
									</TouchableOpacity>
								)}
							</TouchableOpacity>
							{showDatePicker && (
								<DateTimePicker
									value={
										localFilters.dueDateAfter
											? new Date(localFilters.dueDateAfter)
											: new Date()
									}
									mode="date"
									onChange={(event, date) => {
										setShowDatePicker(false);
										if (date) setDueDateAfter(date.toISOString());
									}}
								/>
							)}
						</View>

						{/* Tags Filter */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Tags</Text>
							<View style={styles.tagGrid}>
								{availableTags.map((tag) => (
									<TouchableOpacity
										key={tag}
										style={[
											styles.tag,
											selectedTags.has(tag) && styles.tagSelected,
										]}
										onPress={() => toggleTag(tag)}
									>
										<Text
											style={[
												styles.tagText,
												selectedTags.has(tag) && styles.selectedText,
											]}
										>
											{tag}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>
					</ScrollView>

					<View style={styles.footer}>
						<TouchableOpacity style={styles.resetButton} onPress={handleReset}>
							<Text style={styles.resetText}>Reset</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.applyButton} onPress={handleApply}>
							<Text style={styles.applyText}>Apply Filters</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};
