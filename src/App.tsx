import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ColumnView from "./pages/ColumnModal";
import NotFound from "./pages/NotFound";
import TaskView from "./pages/TaskView";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const state = location.state as { background?: Location };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TaskBoard</h1>
      </header>
      <main className="app-main">
        {/* Render main routes */}
        <Routes location={state?.background || location}>
          <Route path="/" element={<Home />} />
          {/* Fallback in case refresh happens in "/column/:columnId" or "/task/:taskId" */}
          <Route path="/column/:columnId" element={<ColumnView />} />
          <Route path="/task/:taskId" element={<TaskView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Render the task modal on top of the actual view */}
        {state?.background && (
          <Routes>
            <Route path="/column/:columnId" element={<ColumnView />} />
            <Route path="/task/:taskId" element={<TaskView />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
