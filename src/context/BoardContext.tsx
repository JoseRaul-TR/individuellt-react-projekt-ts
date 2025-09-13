import React, { createContext, useReducer, useContext } from "react";
import type { BoardState, Task } from "../types";
import { userId } from "../utils/id";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Action =
  | {
      type: "ADD_TASK";
      playload: { columnId: string; title: string; description?: string };
    }
  | { type: "UPDATE_TASK"; playload: { task: Task } }
  | { type: "DELETE_TASK"; playload: { taskId: string } }
  | {
      type: "MOVE_TASK";
      playload: {
        taskId: string;
        sourceColumnId: string;
        destColumnId: string;
        destIndex: number;
      };
    }
  | { type: "SET_STATE"; playload: BoardState };

const sampleState: BoardState = {
  tasks: {
    t1: {
      id: "t1",
      title: "Vattna blommorna",
      columnId: "col-1",
      createdAt: "2025-09-12",
    },
    t2: {
      id: "t2",
      title: "Slänga soporna",
      columnId: "col-3",
      createdAt: "2025-09-13",
    },
    t3: {
      id: "t3",
      title: "Plugga JavaScript 🤓",
      columnId: "col-2",
      createdAt: "2025-05-01",
    },
    t4: {
      id: "t4",
      title: "Plugga TypeScript 🤯",
      columnId: "col-2",
      createdAt: "2025-08-22",
    },
  },
  columns: {
    "col-1": { id: "col-1", title: "ToDo", taskIds: ["t1"] },
    "col-2": { id: "col-2", title: "Doing", taskIds: ["t3", "t4"] },
    "col-3": { id: "col-3", title: "Done", taskIds: ["t2"] },
  },
  columnOrder: ["col-1", "col-2", "col-3"],
};

const BoardContext = createContext<{ state: BoardState; dispatch: React.Dispatch<Action> } | null>(null);

function removeFromArray(arr: string[], index: number) {
  const copy = arr.slice();
  copy.splice(index, 1);
  return copy;
}

function insertIntoArray(arr: string[], index: number, value: string) {
  const copy = arr.slice();
  copy.splice(index, 0, value);
  return copy;
}

function boardReducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "ADD_TASK": {
      const id = userId("t-");
      const createdAt = new Date().toISOString().slice(0, 10);
      const task: Task = {
        id,
        title: action.playload.title,
        description: action.playload.description ?? "",
        columnId: action.playload.columnId,
        createdAt,
      };
      return {
        ...state,
        tasks: { ...state.tasks, [id]: task },
        columns: {
          ...state.columns,
          [action.playload.columnId]: {
            ...state.columns[action.playload.columnId],
            taskIds: [...state.columns[action.playload.columnId].taskIds, id],
          },
        },
      };
    }

    case "UPDATE_TASK": {
      const t = action.playload.task;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [t.id]: t,
        },
      };
    }

    case "DELETE_TASK": {
      const taskId = action.playload.taskId;
      const task = state.tasks[taskId];
      if (!task) return state;
      const column = state.columns[task.columnId];
      return {
        ...state,
        tasks: Object.fromEntries(
          Object.entries(state.tasks).filter(([k]) => k !== taskId)
        ),
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            taskIds: column.taskIds.filter((id) => id !== taskId),
          },
        },
      };
    }

    case "MOVE_TASK": {
      const { taskId, sourceColumnId, destColumnId, destIndex } =
        action.playload;
      if (!state.columns[sourceColumnId] || !state.columns[destColumnId])
        return state;

      const sourceList = state.columns[sourceColumnId].taskIds;
      const destList = state.columns[destColumnId].taskIds;

      const sourceIndex = sourceList.indexOf(taskId);
      if (sourceIndex === -1) return state;

      // Remove from source
      const newSource = removeFromArray(sourceList, sourceIndex);

      // Insert into dest (if moving within the same column and destination index should account for removal)
      let newDest = destList.slice();
      if (sourceColumnId === destColumnId) {
        // moving inside same list
        newDest = removeFromArray(destList, sourceIndex);
        newDest = insertIntoArray(newDest, destIndex, taskId);
      } else {
        newDest = insertIntoArray(destList, destIndex, taskId);
      }

      const newColumns = {
        ...state.columns,
        [sourceColumnId]: {
          ...state.columns[sourceColumnId],
          taskId: newSource,
        },
        [destColumnId]: {
          ...state.columns[destColumnId],
          taskIds: newDest,
        },
      };

      // update task's columnId
      const updatedTask = { ...state.tasks[taskId], columnId: destColumnId };

      return {
        ...state,
        columns: newColumns,
        tasks: {
          ...state.tasks,
          [taskId]: updatedTask,
        },
      };
    }

    case "SET_STATE":
      return action.playload;

    default:
      return state;
  }
}

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stored, setStored] = useLocalStorage<BoardState>(
    "kanban-board",
    sampleState
  );
  const [state, dispatch] = useReducer(boardReducer, stored);

  // sync reducer state with localStorage
  React.useEffect(() => {
    setStored(state);
  }, [state, setStored]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used inside BoardProvider");
  return ctx;
};
