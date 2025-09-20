import { useParams, Link } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import Column from "../components/Column";

const ColumnView = () => {
  const { columnId } = useParams<{ columnId: string }>();
  const { state } = useBoard();

  if (!columnId || !state.columns[columnId]) {
    return (
      <div className="page-wrapper">
        <div style={{ textAlign: "center" }}>
          Kolumnen hittas inte – <Link to="/">Gå tillbaka till startsidan</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper column-view">
      <Link to="/">Gå tillbaka till startsidan</Link>
      <div className="board-container">
        <Column columnId={columnId} />
      </div>
    </div>
  );
};

export default ColumnView;
