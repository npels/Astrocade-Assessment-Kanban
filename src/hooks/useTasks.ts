// Custom hook for task management

import { useState, useEffect, useCallback } from "react";
import { Task, FilterOptions } from "../types";
import { mockApi } from "../utils/mockApi";

export const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<FilterOptions>({});

	const fetchTasks = useCallback(async () => {
		try {
			setLoading(true);
			const data = await mockApi.getTasks();
			setTasks(data);
			setError(null);
		} catch (err) {
			setError("Failed to fetch tasks");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	const createTask = useCallback(
		async (task: Omit<Task, "id" | "createdAt">) => {
			try {
				const newTask = await mockApi.createTask(task);
				setTasks((prev) => [newTask, ...prev]);
				return newTask;
			} catch (err) {
				setError("Failed to create task");
				throw err;
			}
		},
		[]
	);

	const updateTask = useCallback(
		async (id: string, updates: Partial<Task>) => {
			// Optimistic update
			setTasks((prev) =>
				prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
			);

			try {
				const updated = await mockApi.updateTask(id, updates);
				setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
				return updated;
			} catch (err) {
				// Revert on error
				fetchTasks();
				setError("Failed to update task");
				throw err;
			}
		},
		[fetchTasks]
	);

	const deleteTask = useCallback(
		async (id: string) => {
			const backup = tasks.find((t) => t.id === id);

			// Optimistic delete
			setTasks((prev) => prev.filter((t) => t.id !== id));

			try {
				await mockApi.deleteTask(id);
			} catch (err) {
				// Restore on error
				if (backup) setTasks((prev) => [...prev, backup]);
				setError("Failed to delete task");
				throw err;
			}
		},
		[tasks]
	);

	const filteredTasks = tasks.filter((task) => {
		if (filters.priority && task.priority !== filters.priority) return false;
		if (filters.assignee && task.assignee !== filters.assignee) return false;
		if (
			filters.dueDateAfter &&
			new Date(task.dueDate) < new Date(filters.dueDateAfter)
		)
			return false;
		if (
			filters.tags?.length &&
			!filters.tags.some((tag) => task.tags.includes(tag))
		)
			return false;
		return true;
	});

	return {
		tasks: filteredTasks,
		loading,
		error,
		filters,
		setFilters,
		createTask,
		updateTask,
		deleteTask,
		refetch: fetchTasks,
	};
};
