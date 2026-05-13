import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #cc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>
        Home
      </Link>
      <Link to="/tests" style={{ marginRight: "10px" }}></Link>
    </nav>
  );
}
