import { useState } from "react";
import { useBoard } from "../hooks/useBoard";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

interface NewColumnFormProps {
  onCancel: () => void;
}

export default function NewColumnForm({ onCancel }: NewColumnFormProps) {
  const { dispatch } = useBoard();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }

    dispatch({
      type: "ADD_COLUMN",
      payload: {
        title,
      },
    });

    onCancel();
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <form
        className="modal new-column-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Ny Kolumn</h2>
          <button type="button" className="btn-close" onClick={onCancel}>
            <FaTimes />
          </button>
        </div>
        <input
          type="text"
          value={title}
          placeholder="Kolumnens titel..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <FaPlus />
          </button>

        </div>
      </form>
    </div>
  );
}
