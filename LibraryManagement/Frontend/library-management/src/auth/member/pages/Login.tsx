import { useState, type FormEvent } from "react";
import { Header, Card } from "../../../shared/component/common";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Member_Type, setMember_Type] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      email: Email,
      password: Password,
      member_type: Member_Type,
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
        alert("Login Successfully");
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
    setMember_Type("");
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
          <label htmlFor="Member_Type">Account Type</label>
          <select
            id="Member_Type"
            name="Member_Type"
            value={Member_Type}
            onChange={(e) => setMember_Type(e.target.value)}
          >
            ~<option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
          <button type="submit">Login</button>
          <p>
            Create account <Link to="/auth/register">Register</Link>
          </p>
        </form>
      </Card>
    </>
  );
}
