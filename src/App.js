import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Favorites from "./components/favorites/Favorites";
import Header from "./components/layout/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    // Routing

    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
