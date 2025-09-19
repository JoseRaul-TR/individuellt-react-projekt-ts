import { useParams, useNavigate } from "react-router-dom";
import { useBoard } from "../context/BoardContext";
import TaskModal from "../components/TaskModal";

export default function TaskView() {
  const { taskId } = useParams<{ taskId: string }>();
    const navigate = useNavigate();
  const { state, dispatch } = useBoard();

  if (!taskId || !state.tasks[taskId]) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Uppgiften hittas inte</h2>
        <button onClick={() => navigate("/")}>Tillbaka till board</button>
      </div>
    );
  }

  const task = state.tasks[taskId];

  return (
        <TaskModal 
        task={task} 
        onClose={() => navigate(-1)} 
        onSave={(updates) => {
          dispatch({ type: "UPDATE_TASK", payload: { task: { ...task, ...updates } } });
        }}
        onDelete={() => {
          dispatch({ type: "DELETE_TASK", payload: { taskId: task.id } });
          navigate(-1);
        }} 
        />
  );
}
