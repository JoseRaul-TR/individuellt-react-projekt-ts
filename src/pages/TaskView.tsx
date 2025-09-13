import { useParams, Link, useNavigate } from "react-router-dom";
import { useBoard } from "../context/BoardContext";
import TaskModal from "../components/Board/TaskModal";

export default function TaskView() {
  const { taskId } = useParams<{ taskId: string }>();
  const { state } = useBoard();
  const navigate = useNavigate();

  if (!taskId || !state.tasks[taskId]) {
    return (
      <div>
        Task not found – <Link to="/">Back</Link>
      </div>
    );
  }

  const task = state.tasks[taskId];

  return (
    <div className="page task-view">
      <Link to="/">Till board</Link>
      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate(-1)}>Stäng</button>
        <TaskModal task={task} onClose={() => navigate(-1)} />
      </div>
    </div>
  );
}
