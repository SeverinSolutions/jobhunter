import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SavedJobs from "./pages/SavedJobs";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 min-h-screen">
          <div className="max-w-4xl mx-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/saved" element={<SavedJobs />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App
