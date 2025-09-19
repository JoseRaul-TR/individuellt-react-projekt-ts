import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useBoard } from "../context/BoardContext";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

export default function Column({ columnId }: { columnId: string }) {
  const { state, dispatch } = useBoard();
  const column = state.columns[columnId];

  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");

  const create = () => {
    if (!title.trim()) return;
    dispatch({ type: "ADD_TASK", payload: { columnId, title: title.trim() } });
    setTitle("");
    setCreating(false);
  };

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
            <div className="new-form">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Upgift titel..."
              />
              <div>
                <button onClick={create}>Skapa</button>
                <button onClick={() => setCreating(false)}>Avbryt</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
