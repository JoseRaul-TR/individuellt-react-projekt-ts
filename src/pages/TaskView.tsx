import { useParams, useNavigate } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import TaskModal from "../components/TaskModal"; // This is your existing TaskModal component

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

  // Logic to handle save and delete
  const handleSave = (updates) => {
    dispatch({ type: "UPDATE_TASK", payload: { task: { ...task, ...updates } } });
    navigate(-1); // Go back to the previous page after saving
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: { taskId: task.id } });
    navigate(-1); // Go back to the previous page after deleting
  };

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <TaskModal
      task={task}
      onClose={handleClose}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}