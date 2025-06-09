// File: src/types/index.ts
// Type definitions for the Kanban app with sort options

export interface Task {
	id: string;
	title: string;
	description: string;
	status: BoardSection;
	priority: "low" | "medium" | "high";
	assignee: string;
	dueDate: string;
	createdAt: string;
	tags: string[];
}

export type BoardSection = "todo" | "doing" | "review" | "done";

export interface BoardConfig {
	sections: {
		id: BoardSection;
		title: string;
		color: string;
	}[];
}

export interface FilterOptions {
	priority?: Task["priority"];
	assignee?: string;
	dueDateAfter?: string;
	tags?: string[];
}

export type SortField =
	| "priority"
	| "dueDate"
	| "createdAt"
	| "title"
	| "assignee";
export type SortDirection = "asc" | "desc";

export interface SortOptions {
	field: SortField;
	direction: SortDirection;
}
