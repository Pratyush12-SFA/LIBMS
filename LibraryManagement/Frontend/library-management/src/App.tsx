import { Routes, Route,  } from "react-router-dom";

import "./App.css";
import DefaultPage from "./default";
import Auth from "./auth";
import ManageBooks from "./ManageBooks";

function App() {
  return (
    <>
    <div>
      
      <Routes>
         
          <Route path="/*" element={<DefaultPage />} />
          <Route path="/default/*" element={<DefaultPage />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/ManageBooks/*" element={<ManageBooks />} />
      </Routes>
      </div>
      </>
  );
}

export default App;
