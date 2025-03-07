import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import InventoryList from "./pages/InventoryList/InventoryList.jsx";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails.jsx";
import WarehouseAdd from "./pages/WarehouseAdd/WarehouseAdd.jsx";
import InventoryDetails from "./pages/InventoryDetails/InventoryDetails.jsx";
<<<<<<< HEAD
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit.jsx"
=======
import InventoryAdd from "./pages/InventoryAdd/InventoryAdd.jsx";
import InventoryEdit from "./pages/InventoryEdit/InventoryEdit.jsx";
>>>>>>> develop
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<WarehouseList />} />
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/warehouses/add" element={<WarehouseAdd />} />
<<<<<<< HEAD
        <Route path="/warehouses/:id" element={<WarehouseDetails />} />
        <Route path="/warehouses/edit/:id" element={<WarehouseEdit />} />

=======
        {/* <Route path="/warehouses/edit/:id" element={<WarehouseEdit />} /> */}
>>>>>>> develop
        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/inventories/add" element={<InventoryAdd />} />
        <Route path="/inventories/:id" element={<InventoryDetails />} />
        <Route path="/inventories/edit/:id" element={<InventoryEdit />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
