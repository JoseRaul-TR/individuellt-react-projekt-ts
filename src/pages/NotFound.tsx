import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="page-wrapper"
      style={{ textAlign: "center", marginTop: "4rem" }}
    >
      <h1>404 – Sidan hittas inte</h1>
      <p>Tyvärr, sidan du söker finns inte.</p>
      <Link to="/" className="btn btn-primary">
        Gå tillbaka till startsidan
      </Link>
    </div>
  );
}
