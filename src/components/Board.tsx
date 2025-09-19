import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useBoard } from "../context/BoardContext";
import Column from "./Column";

export default function Board() {
  const { state, dispatch } = useBoard();

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="board">
        {state.columnOrder.map((colId) => (
          <Column key={colId} columnId={colId} />
        ))}
      </section>
    </DragDropContext>
  );
}
