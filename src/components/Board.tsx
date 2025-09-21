import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useBoard } from "../hooks/useBoard";
import Column from "./Column";
import { useState } from "react";
import NewTaskForm from "./NewTaskForm";
import NewColumnForm from "./NewColumnForm";
import { FaPlus } from "react-icons/fa";

export default function Board() {
  const { state, dispatch } = useBoard();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formType, setFormType] = useState<"task" | "column" | "null">(null);

  // Main handler for drag and drop events.
  const onDragEnd = (result: DropResult) => {
    // Destructure the neccesary properties from the imported type "DropResult" from "@hello-pangea/dnd"
    const { source, destination, draggableId } = result;

    // A. Dropped outside of any droppable area
    if (!destination) {
      return;
    }

    // B. Dropped in the same place were started
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // C. Perform the move
    dispatch({
      type: "MOVE_TASK",
      payload: {
        taskId: draggableId,
        sourceColumnId: source.droppableId,
        destColumnId: destination.droppableId,
        destIndex: destination.index,
      },
    });
  };

  const todoColumnId = state.columnOrder[0];

  const handleCloseModal = () => {
    setFormType(null);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="board">
          {state.columnOrder.map((colId) => (
            <Column key={colId} columnId={colId} draggable />
          ))}
        </section>
      </DragDropContext>

      <div className="add-menu-wrapper">
        <button
          className="add-float-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaPlus />
        </button>
        {menuOpen && (
          <div className="add-menu-options">
            <button
              className="add-option-btn"
              onClick={() => setFormType("task")}
            >
              Ny Uppgift
            </button>
            <button
              className="add-option-btn"
              onClick={() => setFormType("column")}
            >
              Ny Kolumn
            </button>
          </div>
        )}
      </div>

      {formType === "task" && (
        <NewTaskForm columnId={todoColumnId} onCancel={handleCloseModal} />
      )}

      {formType === "column" && <NewColumnForm onCancel={handleCloseModal} />}
    </>
  );
}
