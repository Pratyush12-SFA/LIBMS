// src/App.tsx

import { Routes, Route } from "react-router-dom";
import "./App.css";

import DefaultPage from "./default";
import Auth from "./auth";
import ManageBooks from "./ManageBooks";
import List from "./ManageBooks/Book/pages/List";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<DefaultPage />} />
        <Route path="/default/*" element={<DefaultPage />} />
        <Route path="/auth/*" element={<Auth />} />

       
        <Route path="/managebooks/*" element={<ManageBooks />}>
         
          <Route path="Book/List" element={<List />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
