import { useState } from "react";
import type { Task } from "../../types";
import { useBoard } from "../../context/BoardContext";

export default function TaskModal({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) {
  const { dispatch } = useBoard();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const save = () => {
    dispatch({
      type: "UPDATE_TASK",
      playload: { task: { ...task, title, description } },
    });
    onClose();
  };

  const remove = () => {
    if (!confirm("Vill du ta bort uppgiften?")) return;
    dispatch({ type: "DELETE_TASK", playload: { taskId: task.id } });
    onClose();
  };

  return (
    <div className="modal.overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Redigera uppgift</h3>
        <label>
          Titel
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Beskrivning
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button onClick={save}>Spara</button>
          <button onClick={remove}>Ta bort</button>
          <button onClick={onClose}>Stäng</button>
        </div>
      </div>
    </div>
  );
}
