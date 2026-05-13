import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Tests from "./pages/Tests";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout></MainLayout>} />
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
