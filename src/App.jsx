import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import List from "./views/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/list" Component={List} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
