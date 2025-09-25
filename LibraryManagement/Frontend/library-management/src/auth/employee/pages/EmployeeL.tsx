import { useState, type FormEvent } from "react";
import { Header, Card } from "../../../shared/component/common";
import { Link, useNavigate } from "react-router-dom";

export default function EmployeeLogin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = {
      email: Email,
      password: Password,
    };

    try {
      const response = await fetch("https://localhost:7260/api/EmployeeLogin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
 
        navigate("/auth/DashBoard");
      } else if (response.status === 401) {
        alert("Unauthorized");
        navigate("/auth/EmployeeR");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }

    setEmail("");
    setPassword("");
  }

  return (
    <>
      <Header title="Employee Login" />
      <Card title="Login Form">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            value={Email}
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

          <p className="mt-2">
            Create Account{" "}
            <Link to="/auth/EmployeeR" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </form>
      </Card>
    </>
  );
}
