import { createContext, useReducer, useContext } from "react";
import type { BoardState, Task } from "../types";

type Action =
  | { type: "ADD_TASK"; playload: { task: Task } }
  | { type: "UPDATE_TASK"; playload: { task: Task } }
  | {
      type: "MOVE_TASK";
      playload: {
        taskId: string;
        sourceColumnId: string;
        destColumnId: string;
        destIndex: number;
      };
    }
  | { type: "Delete_TASK"; playload: { taskId: string } };
  // More actions ...

  const initialState: BoardState = {
    tasks: {},
    columns: {},
    columnOrder: []
  };

  const BoardContext = createContext<any>(null);

  function boardReducer(state: BoardState, action: Action): BoardState {
    switch (action.type) {
        case 'ADD_TASK':
            // Implement add task to tasks, insert id in column.taskIds
            retrun state;
        // ...
        default:
            return state;
    }
  }

  export const BoardProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(boardReducer, initialState);
    return <BoardContext.Provider value={{ state, dispatch }}>{children}</BoardContext.Provider>
  };

  export const useBoard = () => useContext(BoardContext);