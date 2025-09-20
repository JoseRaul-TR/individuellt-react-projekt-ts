import { useState } from "react";
import { useBoard } from "../hooks/useBoard";
import NewTaskForm from "./NewTaskForm";
import { useNavigate, useLocation } from "react-router-dom";
import TasksList from "./TasksList";

interface ColumnProps {
  columnId: string;
  draggable?: boolean; // default true, board mode
  showDescriptions?: boolean; // default false, modal mode
}

export default function Column({
  columnId,
  draggable = true,
  showDescriptions = false,
}: ColumnProps) {
  const { state } = useBoard();
  const column = state.columns[columnId];
  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  if (!column) return null;

  return (
    <div className="column-wrapper">
      <div className="column">
        <div className="column-header">
          <h3>{column.title}</h3>

          {/* + button opens ColumnView as modal */}
          <button
            className="btn-open-modal"
            onClick={() =>
              navigate(`/column/${columnId}`, {
                state: { background: location },
              })
            }
          >
            +
          </button>
        </div>

        <TasksList
          columnId={columnId}
          draggable={draggable}
          showDescriptions={showDescriptions}
        />

        <div className="column-footer">
          {!creating ? (
            <button className="btn-add" onClick={() => setCreating(true)}>
              Lägg till en ny uppgift
            </button>
          ) : (
            <NewTaskForm
              columnId={columnId}
              onCancel={() => setCreating(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}