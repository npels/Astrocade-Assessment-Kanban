// File: src/hooks/useTasks.ts
// Custom hook for task management with filtering and sorting

import { useState, useEffect, useCallback, useMemo } from "react";
import { Task, FilterOptions, SortOptions } from "../types";
import { mockApi } from "../utils/mockApi";

export const useTasks = () => {
	const [allTasks, setAllTasks] = useState<Task[]>([]); // Store all tasks
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<FilterOptions>({});
	const [sortOptions, setSortOptions] = useState<SortOptions | null>(null);

	const fetchTasks = useCallback(async () => {
		try {
			setLoading(true);
			const data = await mockApi.getTasks();
			setAllTasks(data);
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
				setAllTasks((prev) => [newTask, ...prev]);
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
			setAllTasks((prev) =>
				prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
			);

			try {
				const updated = await mockApi.updateTask(id, updates);
				setAllTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
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
			const backup = allTasks.find((t) => t.id === id);

			// Optimistic delete
			setAllTasks((prev) => prev.filter((t) => t.id !== id));

			try {
				await mockApi.deleteTask(id);
			} catch (err) {
				// Restore on error
				if (backup) setAllTasks((prev) => [...prev, backup]);
				setError("Failed to delete task");
				throw err;
			}
		},
		[allTasks]
	);

	// Filter and sort tasks
	const processedTasks = useMemo(() => {
		// First, filter tasks
		let filtered = allTasks.filter((task) => {
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

		// Then, sort if sort options are set
		if (sortOptions) {
			filtered = [...filtered].sort((a, b) => {
				let compareValue = 0;

				switch (sortOptions.field) {
					case "priority":
						const priorityOrder = { high: 3, medium: 2, low: 1 };
						compareValue =
							priorityOrder[a.priority] - priorityOrder[b.priority];
						break;

					case "dueDate":
						compareValue =
							new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
						break;

					case "createdAt":
						compareValue =
							new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
						break;

					case "title":
						compareValue = a.title.localeCompare(b.title);
						break;

					case "assignee":
						compareValue = a.assignee.localeCompare(b.assignee);
						break;
				}

				// Apply sort direction
				return sortOptions.direction === "desc" ? -compareValue : compareValue;
			});
		}

		return filtered;
	}, [allTasks, filters, sortOptions]);

	return {
		tasks: processedTasks,
		allTasks, // Expose all tasks for getting available filters
		loading,
		error,
		filters,
		setFilters,
		sortOptions,
		setSortOptions,
		createTask,
		updateTask,
		deleteTask,
		refetch: fetchTasks,
	};
};
