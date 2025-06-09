// Modal for creating new tasks

import React, { useState } from "react";
import {
	Modal,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Task, BoardSection } from "../../types";
import { styles } from "./CreateTaskModal.styles";
import { theme } from "../../constants/theme";
import { useBoardConfig } from "../contexts/BoardConfigContext";

interface CreateTaskModalProps {
	visible: boolean;
	onClose: () => void;
	onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
	defaultSection: BoardSection;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
	visible,
	onClose,
	onSubmit,
	defaultSection,
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState<BoardSection>(defaultSection);
	const [assignee, setAssignee] = useState("");
	const [priority, setPriority] = useState<Task["priority"]>("medium");
	const [dueDate, setDueDate] = useState(new Date());
	const [tags, setTags] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { boardConfig } = useBoardConfig();

	const handleSubmit = () => {
		if (!title.trim()) return;

		onSubmit({
			title: title.trim(),
			description: description.trim(),
			assignee: assignee.trim() || "Unassigned",
			priority,
			dueDate: dueDate.toISOString(),
			status: status,
			tags: tags
				.split(",")
				.map((t) => t.trim())
				.filter(Boolean),
		});

		// Reset form
		setTitle("");
		setDescription("");
		setAssignee("");
		setPriority("medium");
		setDueDate(new Date());
		setTags("");
		setStatus(defaultSection);
		onClose();
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<View style={styles.backdrop} onTouchEnd={onClose} />

				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.headerTitle}>Create New Task</Text>
						<TouchableOpacity onPress={onClose}>
							<Feather name="x" size={24} color={theme.colors.text.primary} />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
						<View style={styles.field}>
							<Text style={styles.label}>Title *</Text>
							<TextInput
								style={styles.input}
								value={title}
								onChangeText={setTitle}
								placeholder="Enter task title"
								placeholderTextColor={theme.colors.text.light}
							/>
						</View>

						<View style={styles.field}>
							<Text style={styles.label}>Description</Text>
							<TextInput
								style={[styles.input, styles.textArea]}
								value={description}
								onChangeText={setDescription}
								placeholder="Enter task description"
								placeholderTextColor={theme.colors.text.light}
								multiline
								numberOfLines={3}
							/>
						</View>

						<View style={styles.field}>
							<Text style={styles.label}>Assignee</Text>
							<TextInput
								style={styles.input}
								value={assignee}
								onChangeText={setAssignee}
								placeholder="Enter assignee name"
								placeholderTextColor={theme.colors.text.light}
							/>
						</View>

						<View style={styles.field}>
							<Text style={styles.label}>Priority</Text>
							<View style={styles.priorityOptions}>
								{(["low", "medium", "high"] as const).map((p) => (
									<TouchableOpacity
										key={p}
										style={[
											styles.priorityOption,
											priority === p && styles.prioritySelected,
											{ borderColor: theme.colors.priority[p] },
											priority === p && {
												backgroundColor: theme.colors.priority[p] + "20",
											},
										]}
										onPress={() => setPriority(p)}
									>
										<Text
											style={[
												styles.priorityText,
												{ color: theme.colors.priority[p] },
											]}
										>
											{p.charAt(0).toUpperCase() + p.slice(1)}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>

						<View style={styles.field}>
							<Text style={styles.label}>Status</Text>
							<View style={styles.sectionOptions}>
								{(["todo", "doing", "review", "done"] as const).map((s) => (
									<TouchableOpacity
										key={s}
										style={[
											styles.sectionOption,
											status === s && styles.sectionSelected,
											{ borderColor: theme.colors.section[s] },
											status === s && {
												backgroundColor: theme.colors.section[s] + "35",
											},
										]}
										onPress={() => setStatus(s)}
									>
										<Text
											style={[
												styles.statusText,
												{ color: theme.colors.section[s] },
											]}
										>
											{
												boardConfig.sections.find((section) => section.id === s)
													?.title
											}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>

						<View style={styles.field}>
							<Text style={styles.label}>Due Date</Text>
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
									{dueDate.toLocaleDateString()}
								</Text>
							</TouchableOpacity>
							{showDatePicker && (
								<DateTimePicker
									value={dueDate}
									mode="date"
									onChange={(event, date) => {
										setShowDatePicker(false);
										if (date) setDueDate(date);
									}}
								/>
							)}
						</View>

						<View style={styles.field}>
							<Text style={styles.label}>Tags</Text>
							<TextInput
								style={styles.input}
								value={tags}
								onChangeText={setTags}
								placeholder="Enter tags separated by commas"
								placeholderTextColor={theme.colors.text.light}
							/>
						</View>
					</ScrollView>

					<View style={styles.footer}>
						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.cancelText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.submitButton,
								!title.trim() && styles.submitDisabled,
							]}
							onPress={handleSubmit}
							disabled={!title.trim()}
						>
							<Text style={styles.submitText}>Create Task</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};
