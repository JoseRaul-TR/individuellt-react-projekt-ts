import { useParams, useNavigate } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import Column from "../components/Column";

export default function ColumnView() {
  const { columnId } = useParams<{ columnId: string }>();
  const { state } = useBoard();
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

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{column.title}</h2>
          <button onClick={() => navigate(-1)} className="btn-close">
            &close;
          </button>
        </div>
        <div className="modal-content">
          {/* Render column in static mode (non-drag&drop) */}
          <Column columnId={columnId} draggable={false} showDescriptions/>
        </div>
      </div>
    </div>
  );
}
