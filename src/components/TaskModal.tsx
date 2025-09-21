import { useParams, useNavigate } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";

export default function TaskModal() {
  const { taskId } = useParams<{ taskId: string }>();
  const { state, dispatch } = useBoard();
  const navigate = useNavigate();

  const task = taskId ? state.tasks[taskId] : null;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title || "");
  const [editedDescription, setEditedDescription] = useState(
    task?.description || ""
  );

  if (!task) return null;

  const handleUpdate = () => {
    if (editedTitle.trim() === "") return;
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        task: {
          ...task,
          title: editedTitle,
          description: editedDescription,
        },
      },
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Är du säker på att du vill radera denna uppgift?")) {
      dispatch({
        type: "DELETE_TASK",
        payload: { taskId: task.id },
      });
      navigate(-1);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-actions-fixed">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="icon-btn"
                title="Spara ändringar"
              >
                <FaSave />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="icon-btn"
                title="Avbryt redigering"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="icon-btn"
                title="Redigera uppgift"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="icon-btn"
                title="Radera uppgift"
              >
                <FaTrash />
              </button>
            </>
          )}
          <button
            className="icon-btn"
            onClick={() => navigate(-1)}
            title="Stäng fönster"
          >
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          <div className="task-header">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="task-title-input"
              />
            ) : (
              <h2>{task.title}</h2>
            )}
            <p className="task-date">
              <small>Skapad: {task.createdAt}</small>
            </p>
          </div>
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="task-description-input"
            />
          ) : (
            <p className="task-description">{task.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
