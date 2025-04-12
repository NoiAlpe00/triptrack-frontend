import { useSignOut } from "react-auth-kit";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CustomNavbar() {
  const location = useLocation();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    // <Container fluid>
    <Navbar bg="light" expand="lg" sticky="top" className="ps-3 pe-3">
      <Navbar.Brand as={Link} to="/">
        <span className="text-primary">
          <strong>TripTrack</strong>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          variant="pills"
          className="me-auto"
          activeKey={location.pathname} // 👈 Set active tab based on path
        >
          <Nav.Link className="px-3" as={Link} to="/dashboard" eventKey="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link className="px-3" as={Link} to="/trips" eventKey="/trips">
            Trips
          </Nav.Link>
          <Nav.Link className="px-3" as={Link} to="/reports" eventKey="/reports">
            Reports
          </Nav.Link>
          <Nav.Link className="px-3" as={Link} to="/admin" eventKey="/admin">
            Admin
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Button variant="danger text-white" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
