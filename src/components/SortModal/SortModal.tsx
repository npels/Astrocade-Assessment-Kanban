// File: src/components/SortModal/SortModal.tsx
// Modal for sorting tasks

import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SortOptions, SortField, SortDirection } from "../../types";
import { styles } from "./SortModal.styles";
import { theme } from "../../constants/theme";

interface SortModalProps {
	visible: boolean;
	onClose: () => void;
	currentSort: SortOptions | null;
	onApply: (sort: SortOptions | null) => void;
}

const sortFields = [
	{ field: "priority" as SortField, label: "Priority", icon: "flag" },
	{ field: "dueDate" as SortField, label: "Due Date", icon: "calendar" },
	{ field: "createdAt" as SortField, label: "Created Date", icon: "clock" },
	{ field: "title" as SortField, label: "Title", icon: "type" },
	{ field: "assignee" as SortField, label: "Assignee", icon: "user" },
];

export const SortModal: React.FC<SortModalProps> = ({
	visible,
	onClose,
	currentSort,
	onApply,
}) => {
	const [selectedField, setSelectedField] = useState<SortField | null>(
		currentSort?.field || null
	);
	const [selectedDirection, setSelectedDirection] = useState<SortDirection>(
		currentSort?.direction || "asc"
	);

	useEffect(() => {
		if (visible) {
			setSelectedField(currentSort?.field || null);
			setSelectedDirection(currentSort?.direction || "asc");
		}
	}, [visible, currentSort]);

	const handleApply = () => {
		if (selectedField) {
			onApply({
				field: selectedField,
				direction: selectedDirection,
			});
		} else {
			onApply(null);
		}
		onClose();
	};

	const handleFieldSelect = (field: SortField) => {
		if (selectedField === field) {
			// Toggle direction if same field is selected
			setSelectedDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSelectedField(field);
			// Reset to ascending when new field is selected
			setSelectedDirection("asc");
		}
	};

	const handleClearSort = () => {
		setSelectedField(null);
		setSelectedDirection("asc");
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
						<Text style={styles.headerTitle}>Sort Tasks</Text>
						<TouchableOpacity onPress={onClose}>
							<Feather name="x" size={24} color={theme.colors.text.primary} />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
						<Text style={styles.sectionTitle}>Sort by</Text>

						{sortFields.map(({ field, label, icon }) => {
							const isSelected = selectedField === field;
							return (
								<TouchableOpacity
									key={field}
									style={[
										styles.sortOption,
										isSelected && styles.sortOptionSelected,
									]}
									onPress={() => handleFieldSelect(field)}
								>
									<View style={styles.sortOptionLeft}>
										<Feather
											name={icon as any}
											size={20}
											color={
												isSelected
													? theme.colors.primary
													: theme.colors.text.secondary
											}
										/>
										<Text
											style={[
												styles.sortOptionText,
												isSelected && styles.sortOptionTextSelected,
											]}
										>
											{label}
										</Text>
									</View>

									{isSelected && (
										<View style={styles.directionIndicator}>
											<Feather
												name={
													selectedDirection === "asc"
														? "arrow-up"
														: "arrow-down"
												}
												size={16}
												color={theme.colors.primary}
											/>
											<Text style={styles.directionText}>
												{selectedDirection === "asc"
													? "Ascending"
													: "Descending"}
											</Text>
										</View>
									)}
								</TouchableOpacity>
							);
						})}

						{selectedField && (
							<View style={styles.directionSection}>
								<Text style={styles.sectionTitle}>Direction</Text>
								<View style={styles.directionOptions}>
									<TouchableOpacity
										style={[
											styles.directionOption,
											selectedDirection === "asc" &&
												styles.directionOptionSelected,
										]}
										onPress={() => setSelectedDirection("asc")}
									>
										<Feather
											name="arrow-up"
											size={16}
											color={
												selectedDirection === "asc"
													? theme.colors.primary
													: theme.colors.text.secondary
											}
										/>
										<Text
											style={[
												styles.directionOptionText,
												selectedDirection === "asc" && styles.selectedText,
											]}
										>
											Ascending
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										style={[
											styles.directionOption,
											selectedDirection === "desc" &&
												styles.directionOptionSelected,
										]}
										onPress={() => setSelectedDirection("desc")}
									>
										<Feather
											name="arrow-down"
											size={16}
											color={
												selectedDirection === "desc"
													? theme.colors.primary
													: theme.colors.text.secondary
											}
										/>
										<Text
											style={[
												styles.directionOptionText,
												selectedDirection === "desc" && styles.selectedText,
											]}
										>
											Descending
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					</ScrollView>

					<View style={styles.footer}>
						<TouchableOpacity
							style={styles.clearButton}
							onPress={handleClearSort}
						>
							<Text style={styles.clearText}>Clear Sort</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.applyButton} onPress={handleApply}>
							<Text style={styles.applyText}>Apply Sort</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};
