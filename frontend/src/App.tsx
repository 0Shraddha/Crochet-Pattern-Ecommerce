import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/item/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
   
  );
}

export default App;