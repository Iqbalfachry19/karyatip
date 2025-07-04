import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Web3Provider } from "./config/Web3Provider";
import Home from "./route/Home";
import ProfilePage from "./route/Profile";
import WorkPage from "./route/Works";
import Writing from "./route/Writing";
import TipWriter from "./route/TipWriter";
import Writers from "./route/Writers";
import EditWorkPage from "./route/EditWork"; // Import the new edit page component
import { ThirdwebProvider } from "thirdweb/react";

function App() {
  return (
    <ThirdwebProvider>
      <Web3Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/writers" element={<Writers />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/tipWriters" element={<TipWriter />} />
            <Route path="/profile/:name" element={<ProfilePage />} />
            <Route path="/work/:id" element={<WorkPage />} />
            <Route path="/writers/edit/:id" element={<EditWorkPage />} />{" "}
            {/* New route for editing work */}
          </Routes>
        </BrowserRouter>
      </Web3Provider>
    </ThirdwebProvider>
  );
}

export default App;
