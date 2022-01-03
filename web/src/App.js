import "./App.css";
import { Create } from "./views/Create";
import { Library } from "./views/Library";
import { Play } from "./views/Play";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/library" element={<Library />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
