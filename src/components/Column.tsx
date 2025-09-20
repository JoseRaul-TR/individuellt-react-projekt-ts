import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useBoard } from "../hooks/useBoard";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";
import { useNavigate, useLocation } from "react-router-dom";

interface ColumnProps {
  columnId: string;
  draggable?: boolean;
}

export default function Column({ columnId, draggable = true }: ColumnProps) {
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
              navigate(`/column/${columnId}`, { state: { background: location } })
            }
          >
            Visa detaljer
          </button>
        </div>

{/* Tasks list */}
        {!draggable && (
          <div className="tasks-list">
            {column.taskIds.map((taskId) => {
              const task = state.tasks[taskId];
              if (!task) return null;
              return <TaskCard key={taskId} task={task} />;
            })}
          </div>
        )}

        {draggable && (
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
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}

{/* Footer: Add new task */}
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
