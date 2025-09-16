import { useNavigate } from "react-router-dom";
import { Card } from "../../shared/component/common";
import "./home.css";
import logo from "../../assets/logo.png"



export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
     
          <div className="logo-section">
              <img src={logo} alt="Library Logo" className="logo" />
          </div>

      <h1 className="welcome-text">Welcome to Book Warden Library</h1>

      <Card title="Choose Category!">
        <div className="button-section">
          <button className="category-btn" onClick={() => navigate("/auth/login")}>Member</button>

          <button className="category-btn" onClick={() => navigate("/auth/EmployeeL")}>Employee</button>
        </div>
      </Card>
    </div>
  );
}
