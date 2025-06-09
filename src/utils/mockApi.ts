// Mock API for simulating backend operations

import { Task, BoardSection } from "../types";

const generateMockTasks = (count: number): Task[] => {
	const titles = [
		"Design new feature",
		"Fix bug",
		"Update documentation",
		"Code review",
		"Deploy to production",
	];
	const assignees = [
		"John Doe",
		"Jane Smith",
		"Bob Johnson",
		"Alice Williams",
		"Charlie Brown",
	];
	const tags = [
		"frontend",
		"backend",
		"urgent",
		"feature",
		"bugfix",
		"documentation",
	];
	const statuses: BoardSection[] = ["todo", "doing", "review", "done"];

	return Array.from({ length: count }, (_, i) => ({
		id: `task-${i + 1}`,
		title: `${titles[i % titles.length]} #${i + 1}`,
		description: `This is a detailed description for task ${
			i + 1
		}. It contains important information about what needs to be done.`,
		status: statuses[Math.floor(Math.random() * statuses.length)],
		priority: ["low", "medium", "high"][
			Math.floor(Math.random() * 3)
		] as Task["priority"],
		assignee: assignees[Math.floor(Math.random() * assignees.length)],
		dueDate: new Date(
			Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
		).toISOString(),
		createdAt: new Date(
			Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
		).toISOString(),
		tags: tags.slice(0, Math.floor(Math.random() * 3) + 1),
	}));
};

class MockAPI {
	private tasks: Task[] = generateMockTasks(50);
	private delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	async getTasks(): Promise<Task[]> {
		await this.delay(800); // Simulate network delay
		return [...this.tasks];
	}

	async createTask(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
		await this.delay(500);
		const newTask: Task = {
			...task,
			id: `task-${Date.now()}`,
			createdAt: new Date().toISOString(),
		};
		this.tasks.unshift(newTask);
		return newTask;
	}

	async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
		await this.delay(300);
		const index = this.tasks.findIndex((t) => t.id === id);
		if (index === -1) throw new Error("Task not found");

		this.tasks[index] = { ...this.tasks[index], ...updates };
		return this.tasks[index];
	}

	async deleteTask(id: string): Promise<void> {
		await this.delay(300);
		this.tasks = this.tasks.filter((t) => t.id !== id);
	}
}

export const mockApi = new MockAPI();
