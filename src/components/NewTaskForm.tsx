import { useState } from "react";
import { useBoard } from "../hooks/useBoard";

interface NewTaskFormProps {
  columnId: string;
  onCancel: () => void;
}
export default function NewTaskForm({ columnId, onCancel }: NewTaskFormProps) {
  const { dispatch } = useBoard();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }

    const newTask = {
      title,
      description,
      createdAt: new Date().toLocaleDateString(),
    };

    dispatch({
      type: "ADD_TASK",
      payload: {
        columnId,
        task: newTask,
      },
    });

    onCancel();
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Upgift titel..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Uppgiftens beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Lägg till
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Avbryt
        </button>
      </div>
    </form>
  );
}
