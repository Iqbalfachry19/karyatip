import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Web3Provider } from "./config/Web3Provider";
import Home from "./route/Home";
import ProfilePage from "./route/Profile";
import WorkPage from "./route/Works";
import Writing from "./route/Writing";
import TipWriter from "./route/TipWriter";
import Writers from "./route/Writers";
function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writers" element={<Writers />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/tipWriters" element={<TipWriter />} />
          <Route path="/profile/:name" element={<ProfilePage />} />
          <Route path="/work/:title" element={<WorkPage />} />
        </Routes>
      </BrowserRouter>
    </Web3Provider>
  );
}

export default App;
