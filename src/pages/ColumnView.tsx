import { useParams, Link } from "react-router-dom";
import Column from "../components/Board/Column";
import { useBoard } from "../context/BoardContext";

export default function ColumnView() {
  const { columnId } = useParams<{ columnId: string }>();
  const { state } = useBoard();
  if (!columnId || !state.columns[columnId]) {
    return (
      <div>
        Column not found – <Link to="/">Back</Link>
      </div>
    );
  }

  return (
    <div className="page column-view">
      <Link to="/">Till board</Link>
      <div style={{ display: "flex", gap: 20, paddingTop: 20 }}>
        <Column columnId={columnId} />
      </div>
    </div>
  );
}
