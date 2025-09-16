import { useState, type FormEvent } from "react";
import { Header, Card } from "../../../shared/component/common";
import { Link } from "react-router-dom";
export default function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      name: Name,
      email: Email,
      password: Password,
      phone: Phone,
    };

    const response = await fetch("https://localhost:7260/api/Registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Register Successfully");
    } else if (response.status === 401) {
      alert("Invalid");
    }
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
  }
  return (
    <>
      <Header title="Member Reister Here!" />

      <Card title="Register">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={Name}
            name="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
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
          <input
            type="number"
            placeholder="Phone"
            value={Phone}
            name="Phone"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </form>
      </Card>
    </>
  );
}
