import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404 – Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" style={{ color: "#6c63ff", fontWeight: "bold" }}>
        Go back to Home
      </Link>
    </div>
  );
}
