import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useBoard } from "../../context/BoardContext";
import Column from "./Column";

export default function Board() {
    const { state, dispatch } = useBoard();

    function findColumnByTaskId(taskId: string) {
        const entries = Object.entries(state.columns);
        for (const [colId, col] of entries) {
            if (col.taskIds.includes(taskId)) return colId;
        }
        return null;
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const activeId = String(event.active.id);
        const over = event.over?.id;
        if (!over) return;
        const overId = String(over);

        const sourceColumnId = findColumnByTaskId(activeId);
        if (!sourceColumnId) return;

        let destColumnId: string | null = null;
        let destIndex = 0;

        // If dropping on a column droppable zone (id like 'column-col-1')
        if (overId.startsWith('column-')) {
            destColumnId = overId.replace('column-', '');
            destIndex = state.columns[destColumnId].taskIds.length;
        } else {
            // overId is a taskId, insert before that task
            destColumnId = findColumnByTaskId(overId);
            if (!destColumnId) return;
            destIndex = state.columns[destColumnId].taskIds.indexOf(overId);
        }

        dispatch({
            type: 'MOVE_TASK',
            playload: {
                taskId: activeId,
                sourceColumnId,
                destColumnId,
                destIndex
            },
        });
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="board">
                {state.columnOrder.map((colId) => (
                    <Column key={colId} columnId={colId} />
                ))}
            </div>
        </DndContext>
    );
}