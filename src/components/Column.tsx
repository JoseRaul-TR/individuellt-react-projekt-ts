import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useBoard } from "../hooks/useBoard";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";
import { Link } from "react-router-dom";

interface ColumnProps {
  columnId: string;
}

export default function Column({ columnId }: ColumnProps) {
  const { state } = useBoard();
  const column = state.columns[columnId];

  const [creating, setCreating] = useState(false);

  return (
    <div className="column-wrapper">
      <div className="column">
        <div className="column-header">
          <h3>{column.title}</h3>
          <Link to={`/column/${columnId}`}>Visa</Link>
        </div>

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

        <div className="column-footer">
          {!creating ? (
            <button className="btn-add" onClick={() => setCreating(true)}>
              Lägga till en ny uppgift
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
