import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>
        Home
      </Link>
      <Link to="/tests" style={{ marginRight: "10px" }}>
        Tests
      </Link>
      <Link to="/cart" style={{ marginRight: "10px" }}>
        Cart
      </Link>
      <Link to="/orders" style={{ marginRight: "10px" }}>
        Orders
      </Link>
      <Link to="/login" style={{ marginRight: "10px" }}>
        Login
      </Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
