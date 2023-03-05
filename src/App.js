import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UpdateTodo from "./components/updateTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<UpdateTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
