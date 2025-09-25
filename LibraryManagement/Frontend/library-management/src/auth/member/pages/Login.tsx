import { useState, type FormEvent } from "react";
import { Header, Card } from "../../../shared/component/common";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      email: Email,
      password: Password,

    };

    const response = await fetch("https://localhost:7260/api/Login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.status === 200) {
  
        navigate("/auth/DashBoardM");
      } else if (response.status === 401) {
        alert("Unauthorized");
        navigate("/auth/register");
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
      <Header title="Member Login" />
      <Card title="Login Form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={Email}
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={Password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        
          <button type="submit">Login</button>
          <p>
            Create account <Link to="/auth/register">Register</Link>
          </p>
        </form>
      </Card>
    </>
  );
}
