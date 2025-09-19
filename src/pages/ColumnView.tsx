import { useParams, Link } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import Column from "../components/Column";

const ColumnView = () => {
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
      <Link to="/">← Back to board</Link>
      <div style={{ display: "flex", gap: 20, paddingTop: 20 }}>
        <Column columnId={columnId} />
      </div>
    </div>
  );
};

export default ColumnView;