// import Login from "./member/pages/Login";
// import Register from "./member/pages/RegisterM";
import { Routes, Route } from "react-router-dom";
import Login from "./member/pages/Login";
import Register from "./member/pages/RegisterM";
import EmployeeR from "./employee/pages/EmployeeR";
import EmployeeL from "./employee/pages/EmployeeL";
import DashBoard from "./employee/pages/DashBoard";
import DashBoardM from "./member/pages/DashBoardM";

export default function Auth() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="EmployeeR" element={<EmployeeR />} />
      <Route path="EmployeeL" element={<EmployeeL />} />
      <Route path="DashBoard" element={<DashBoard />} />
      <Route path="DashBoardM" element={<DashBoardM/>} />
    </Routes>
  );
}
