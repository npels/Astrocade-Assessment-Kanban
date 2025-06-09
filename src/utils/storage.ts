// Local storage utilities for persisting board configuration

import { BoardConfig, FilterOptions } from "../types";

const BOARD_CONFIG_KEY = "kanban_board_config";
const FILTER_KEY = "kanban_filters";

export const storage = {
	getBoardConfig(): BoardConfig | null {
		try {
			const stored = localStorage.getItem(BOARD_CONFIG_KEY);
			return stored ? JSON.parse(stored) : null;
		} catch {
			return null;
		}
	},

	saveBoardConfig(config: BoardConfig): void {
		localStorage.setItem(BOARD_CONFIG_KEY, JSON.stringify(config));
	},

	getFilters(): FilterOptions | null {
		try {
			const stored = localStorage.getItem(FILTER_KEY);
			return stored ? JSON.parse(stored) : null;
		} catch {
			return null;
		}
	},

	saveFilters(filters: FilterOptions): void {
		localStorage.setItem(FILTER_KEY, JSON.stringify(filters));
	},
};
