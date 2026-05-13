import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
      email: "",
      password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await API.post("/auth/login", form);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        setMessage("Login successful");

        navigate("/");
      } catch (err) {
        setMessage(err.response?.data?.message || "Error");
      }
    };

    return (
      <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" onChange={handleChange} />
          <br />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <br />

          <button type="submit">Login</button>
        </form>

        <p>{message}</p>
      </div>
    );
  };
}

export default Login;
