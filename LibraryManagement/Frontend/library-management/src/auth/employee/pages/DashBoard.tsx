import "../../../default/pages/home.css"
import "./Dashboard.css"; // Import the external CSS file
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate= useNavigate();
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-text">
        Welcome!
      </p>
        <button
            className="category-btn"
            onClick={() => navigate("/auth/login")}
          >
            Member
          </button>
          <button type="button" className="category-btn" onClick={() => navigate("/ManageBooks/List")}>
            Books
          </button>
          <button type="button" className="category-btn" onClick={() => navigate("/ManageBooks/IssuedList")}>
            Issued Books
          </button>
    </div>
  );
}
