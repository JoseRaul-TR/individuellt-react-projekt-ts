import { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { useBoard } from "../../context/BoardContext";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

export default function Column({ columnId }: { columnId: string }) {
  const { state, dispatch } = useBoard();
  const column = state.columns[columnId];
  const { setNodeRef } = useDroppable({ id: `column-${columnId}` });

  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");

  const create = () => {
    if (!title.trim()) return;
    dispatch({ type: "ADD_TASK", playload: { columnId, title: title.trim() } });
    setTitle("");
    setCreating(false);
  };

  return (
    <div className="column-wrapper" ref={setNodeRef}>
      <div className="column">
        <div className="column-header">
          <h3>{column.title}</h3>
          <Link to={`/column/${columnId}`}>Visa</Link>
        </div>

        <SortableContext
          items={column.taskIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="tasks-list">
            {column.taskIds.map((taskId) => (
              <TaskCard key={taskId} taskId={taskId} />
            ))}
          </div>
        </SortableContext>

        <div className="column-footer">
          {!creating ? (
            <button className="btn-add" onClick={() => setCreating(true)}>
              Lägga till ny uppgift
            </button>
          ) : (
            <div className="new-form">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Upgift titel..."
              />
              <div>
                <button onClick={create}>Skapa</button>
                <button onClick={() => setCreating(false)}>Avbryt</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
