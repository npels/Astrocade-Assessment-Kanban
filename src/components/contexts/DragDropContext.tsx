// Context for managing drag and drop state across the board

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";
import { Task, BoardSection } from "../../types";

interface DragDropContextType {
	draggedTask: Task | null;
	setDraggedTask: (task: Task | null) => void;
	targetSection: BoardSection | null;
	setTargetSection: (section: BoardSection | null) => void;
	isDragging: boolean;
}

const DragDropContext = createContext<DragDropContextType | undefined>(
	undefined
);

export const useDragDrop = () => {
	const context = useContext(DragDropContext);
	if (!context) {
		throw new Error("useDragDrop must be used within a DragDropProvider");
	}
	return context;
};

interface DragDropProviderProps {
	children: ReactNode;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({
	children,
}) => {
	const [draggedTask, setDraggedTask] = useState<Task | null>(null);
	const [targetSection, setTargetSection] = useState<BoardSection | null>(null);

	const isDragging = draggedTask !== null;

	const value = {
		draggedTask,
		setDraggedTask,
		targetSection,
		setTargetSection,
		isDragging,
	};

	return (
		<DragDropContext.Provider value={value}>
			{children}
		</DragDropContext.Provider>
	);
};
