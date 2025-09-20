import { useParams, Link, useNavigate } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import Column from "../components/Column";

export default function ColumnView() {
  const { columnId } = useParams<{ columnId: string }>();
  const { state } = useBoard();
  const navigate = useNavigate();

  // 1. Check if the state is still in its initial, empty state.
  //    The sampleState has keys, so if it's empty, it's still loading from localStorage.
  const isLoading =
    Object.keys(state.columns).length === 0 &&
    Object.keys(state.tasks).length === 0;

  if (isLoading) {
    return null;
  }

  // 2. Check if the state is loaded, check if the column actually exists
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

  // 3. Render the component only when the data is ready and the column is found.
  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{state.columns[columnId].title}</h2>
          <button onClick={() => navigate(-1)} className="btn-close">
            ✕
          </button>
        </div>
        <div className="modal-content">
          {/* Column with no drag&drop */}
          <Column columnId={columnId} draggable={false} />
        </div>
      </div>
    </div>
  );
}
