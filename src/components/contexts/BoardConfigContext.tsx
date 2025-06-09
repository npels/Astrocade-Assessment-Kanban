import React, { createContext, useContext, ReactNode, useState } from "react";
import { BoardSection } from "../../types";
import { theme } from "../../constants/theme";

export type Section = {
	id: BoardSection;
	title: string;
	color: string;
};

export type BoardConfig = {
	sections: Section[];
};

type BoardConfigContextType = {
	boardConfig: BoardConfig;
	setBoardConfig: React.Dispatch<React.SetStateAction<BoardConfig>>;
};

// Create the context
const BoardConfigContext = createContext<BoardConfigContextType | undefined>(
	undefined
);

// Exported hook for easy access
export const useBoardConfig = () => {
	const context = useContext(BoardConfigContext);
	if (!context) {
		throw new Error("useBoardConfig must be used within a BoardConfigProvider");
	}
	return context;
};

// Context provider component
export const BoardConfigProvider = ({ children }: { children: ReactNode }) => {
	const defaultBoardConfig: BoardConfig = {
		sections: [
			{ id: "todo", title: "To Do", color: theme.colors.section.todo },
			{ id: "doing", title: "In Progress", color: theme.colors.section.doing },
			{ id: "review", title: "Review", color: theme.colors.section.review },
			{ id: "done", title: "Done", color: theme.colors.section.done },
		],
	};

	const [boardConfig, setBoardConfig] =
		useState<BoardConfig>(defaultBoardConfig);

	return (
		<BoardConfigContext.Provider value={{ boardConfig, setBoardConfig }}>
			{children}
		</BoardConfigContext.Provider>
	);
};
