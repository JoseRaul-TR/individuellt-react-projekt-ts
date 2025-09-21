import { useParams, useNavigate } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import Column from "../components/Column";
import { FaTimes, FaTrashAlt } from "react-icons/fa";

export default function ColumnView() {
  const { columnId } = useParams<{ columnId: string }>();
  const { state, dispatch } = useBoard();
  const navigate = useNavigate();

  if (!columnId || !state.columns[columnId]) {
    return (
      <div className="modal-overlay" onClick={() => navigate(-1)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Kolumnen hittas inte</h2>
          <button onClick={() => navigate("/")}>Tillbaka till startsidan</button>
        </div>
      </div>
    );
  }

  const column = state.columns[columnId];

  const handleDeleteColumn = () => {
    if (window.confirm("Är du säker på att du vill radera denna kolumn? Alla uppgifter i den kommer att raderas.")) {
      dispatch({ type: "DELETE_COLUMN", payload: { columnId: columnId! } });
      navigate("/"); // Navigate back to home page (Board) after deletion
    }
  };

  return (
<div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{column.title}</h2>
          <div className="modal-actions">
            <button className="btn btn-delete" onClick={handleDeleteColumn}>
              <FaTrashAlt />
            </button>
            <button onClick={() => navigate(-1)} className="btn-close">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="modal-content">
          <Column columnId={columnId!} draggable={false} showDescriptions showHeader={false} />
        </div>
      </div>
    </div>
  );
}
