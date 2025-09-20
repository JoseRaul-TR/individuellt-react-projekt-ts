import { useParams, useNavigate } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";

export default function TaskModal() {
  const { taskId } = useParams<{ taskId: string }>();
  const { state } = useBoard();
  const navigate = useNavigate();

  const task = taskId ? state.tasks[taskId] : null;

  if (!task) return null;

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task.title}</h2>
          <button className="btn-close" onClick={() => navigate(-1)}>
            &close;
          </button>
        </div>

        <div className="modal-content">
          <p className="task-description">
            <strong>{task.description}</strong>
          </p>
          <p className="task-date">
            <small>{task.createdAt}</small>
          </p>
        </div>
      </div>
    </div>
  );
}
