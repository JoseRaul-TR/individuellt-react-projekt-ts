import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useBoard } from "../hooks/useBoard";
import { useNavigate, useLocation } from "react-router-dom";
import type { Task } from "../types/types";

interface TasksListProps {
  columnId: string;
  draggable?: boolean;
  showDescriptions?: boolean;
}

const DraggableTaskCard = ({ task, index }: { task: Task; index: number }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/task/${task.id}`, { state: { background: location } });
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? "is-dragging" : ""}`}
          onClick={handleClick}
        >
          <h4 className="task-title">{task.title}</h4>
          <small className="task-date">{task.createdAt}</small>
        </div>
      )}
    </Draggable>
  );
};

const StaticTaskCard = ({
  task,
  showDescriptions,
}: {
  task: Task;
  showDescriptions?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/task/${task.id}`, { state: { background: location } });
  };

  return (
    <div className="task-card" onClick={handleClick}>
      <h4>{task.title}</h4>
      {showDescriptions && <p>{task.description}</p>}
      <small>{task.createdAt}</small>
    </div>
  );
};

export default function TasksList({
  columnId,
  draggable = true,
  showDescriptions = false,
}: TasksListProps) {
  const { state } = useBoard();
  const column = state.columns[columnId];

  if (!column) return null;

  return (
    <>
      {draggable ? (
        <Droppable droppableId={columnId}>
          {(provided) => (
            <div
              className="tasks-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.taskIds.map((taskId, index) => {
                const task = state.tasks[taskId];
                if (!task) return null;
                return (
                  <DraggableTaskCard key={taskId} task={task} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        <div className="tasks-list">
          {column.taskIds.map((taskId) => {
            const task = state.tasks[taskId];
            if (!task) return null;
            return (
              <StaticTaskCard
                key={taskId}
                task={task}
                showDescriptions={showDescriptions}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
