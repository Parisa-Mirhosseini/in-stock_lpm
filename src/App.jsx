import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";

import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WarehousePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
