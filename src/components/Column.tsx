import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useBoard } from "../hooks/useBoard";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";
import { useNavigate, useLocation } from "react-router-dom";

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

        {/* Tasks */}
        {draggable ? (
          // Drag & Drop enabled for board view
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
                    <Draggable key={taskId} draggableId={taskId} index={index}>
                      {(provided, snapshot) => (
                        <TaskCard
                          task={task}
                          provided={provided}
                          snapshot={snapshot}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          // Static list for modals
          <div className="tasks-list">
            {column.taskIds.map((taskId) => {
              const task = state.tasks[taskId];
              if (!task) return null;
              return (
                <div key={taskId} className="task-card">
                  <h4>{task.title}</h4>
                  {showDescriptions && <p>{task.description}</p>}
                  <small>{task.createdAt}</small>
                </div>
              );
            })}
          </div>
        )}

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
