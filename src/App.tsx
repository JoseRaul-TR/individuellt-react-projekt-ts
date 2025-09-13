import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ColumnView from "./pages/ColumnView";
import TaskView from "./pages/TaskView";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <header className="app-header">
        <Link to="/">
          <h1>The Borad App</h1>
        </Link>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/column/:columnId" element={<ColumnView />} />
          <Route path="/task/:taskId" element={<TaskView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
