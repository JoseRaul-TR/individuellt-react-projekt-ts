import { useState } from "react";
import { useBoard } from "../hooks/useBoard";

interface NewTaskFormProps {
    columnId: string;
    onCancel: () => void;
}
export default function NewTaskForm({ columnId, onCancel }: NewTaskFormProps) {
  const { dispatch } = useBoard();
  const [title, setTitle] = useState("");

  const create = () => {
    if (!title.trim()) return;
    dispatch({ type: "ADD_TASK", payload: { columnId, title: title.trim() } });
    setTitle("");
    onCancel();
  };

  return (
    <div className="new-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Upgift titel..."
      />
      <div>
        <button onClick={create}>Skapa</button>
        <button onClick={onCancel}>Avbryt</button>
      </div>
    </div>
  );
}
