// src/Dashboard.tsx
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Import the external CSS file

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-text">
        Welcome to the dashboard. Click the button to view the books list.
      </p>

      <Link to="/ManageBooks/List">
        {/* Use className to apply styling from the CSS file and set the button type */}
        <button type="button" className="dashboard-button">
          Go to Books List
        </button>
      </Link>
    </div>
  );
}
