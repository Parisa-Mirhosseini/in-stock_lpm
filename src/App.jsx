import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import WarehouseList from "./pages/WarehouseList/WarehouseList";



import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<WarehouseList />} />
        <Route path="api/warehouses" element={<WarehouseList />} />
        {/* <Route path="/warehouses/add" element={<WarehouseAdd />} />
        <Route path="/warehouses/:id" element={<WarehouseDetails />} />
        <Route path="/warehouses/edit/:id" element={<WarehouseEdit />} />

        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/inventories/add" element={<InventoryAdd />} />
        <Route path="/inventories/:id" element={<InventoryDetails />} />
        <Route path="/inventories/edit/:id" element={<InventoryEdit />} />  */}
        </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

