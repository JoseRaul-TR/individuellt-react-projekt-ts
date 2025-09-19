import { useState } from "react";
import type { Task } from "../types/types";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updates: Partial<Task>) => void;
  onDelete: () => void;
}

export default function TaskModal({
  task,
  onClose,
  onSave,
  onDelete,
}: TaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDecription] = useState(task.description || "");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Redigera uppgift</h3>

        <label>
          Titel:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Beskrivning:
          <textarea
            value={description}
            onChange={(e) => setDecription(e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button
            className="btn-save"
            onClick={() => onSave({ title, description })}
          >
            Spara
          </button>

          <button className="btn-delete" onClick={onDelete}>
            Ta bort
          </button>
          <button className="btn-close" onClick={onClose}>
            Stäng
          </button>
        </div>
      </div>
    </div>
  );
}
