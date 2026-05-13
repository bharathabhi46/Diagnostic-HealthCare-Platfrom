import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      role: "USER",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await API.post("/auth/register", form);
        setMessage(res.data.message);
        navigate("/login");
      } catch (err) {
        setMessage(err.response?.data?.message || "Error");
      }
    };

    return (
      <div>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <br />

          <input name="email" placeholder="Email" onChange={handleChange} />
          <br />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <br />

          <select name="role" onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="COLLECTOR">COLLECTOR</option>
          </select>

          <br />
          <button type="submit">Register</button>
        </form>

        <p>{message}</p>
      </div>
    );
  };
}
export default Register;
