import { useLocation, useNavigate } from "react-router-dom";
import type { Task } from "../types/types";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/task/${task.id}`, { state: { background: location } });
  };

  return (
    <div className="task-card" onClick={handleClick}>
      <h4>{task.title}</h4>
    </div>
  );
};

export default TaskCard;