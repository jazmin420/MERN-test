import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import StudentsTable from "./pages/StudentsTable";

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/students" element={<StudentsTable />} />
</Routes>
    </BrowserRouter>
    </>
  )
}

export default App
