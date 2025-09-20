import { useLocation, useNavigate } from "react-router-dom";
import type { Task } from "../types/types";
import type { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export default function TaskCard({ task, provided, snapshot }: TaskCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/task/${task.id}`, { state: { background: location } });
  };

  return (
    <div
      className={`task-card ${snapshot.isDragging ? "is-dragging" : ""}`}
      onClick={handleClick}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <h4 className="task-title">{task.title}</h4>
      <small className="task-date">{task.createdAt}</small>
    </div>
  );
}
