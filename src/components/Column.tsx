import { useBoard } from "../hooks/useBoard";
import { useNavigate, useLocation } from "react-router-dom";
import TasksList from "./TasksList";
import { FaPlus } from "react-icons/fa";

interface ColumnProps {
  columnId: string;
  draggable?: boolean; // default true, board mode
  showDescriptions?: boolean; // default false, modal mode
  showHeader?: boolean;
}

export default function Column({
  columnId,
  draggable = true,
  showDescriptions = false,
  showHeader= true,
}: ColumnProps) {
  const { state } = useBoard();
  const column = state.columns[columnId];

  const navigate = useNavigate();
  const location = useLocation();

  if (!column) return null;

  return (
    <div className="column-wrapper">
      <div className="column">
        {showHeader && (
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
            <FaPlus />
          </button>
        </div>
        )}

        <TasksList
          columnId={columnId}
          draggable={draggable}
          showDescriptions={showDescriptions}
        />
      </div>
    </div>
  );
}
