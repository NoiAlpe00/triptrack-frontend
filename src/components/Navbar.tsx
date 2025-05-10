import { useAuthHeader, useSignOut } from "react-auth-kit";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { decodeToken } from "../utils/utilities";
import ChangePassword from "../modals/ChangePassword";
import { logOut } from "../hooks/axios";

export default function CustomNavbar() {
  const location = useLocation();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const authHeader = useAuthHeader();
  const access_token = authHeader();

  const decodedToken = decodeToken(access_token);

  const handleLogout = async () => {
    signOut();
    navigate("/login");
    await logOut(access_token);
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
          {!(decodedToken.userType.toLowerCase() === "guard") && !(decodedToken.userType.toLowerCase() === "driver") && (
            <Nav.Link className="px-3" as={Link} to="/dashboard" eventKey="/dashboard">
              Dashboard
            </Nav.Link>
          )}
          {!(decodedToken.userType.toLowerCase() === "driver") && (
            <Nav.Link className="px-3" as={Link} to="/trips" eventKey="/trips">
              Trips
            </Nav.Link>
          )}
          {(decodedToken.userType.toLowerCase() === "driver" || decodedToken.userType.toLowerCase() === "admin") && (
            <Nav.Link className="px-3" as={Link} to="/maintenanace" eventKey="/maintenanace">
              Maintenance
            </Nav.Link>
          )}
          {decodedToken.userType.toLowerCase() === "admin" && (
            <>
              <Nav.Link className="px-3" as={Link} to="/reports" eventKey="/reports">
                Reports
              </Nav.Link>
              <Nav.Link className="px-3" as={Link} to="/admin" eventKey="/admin">
                Admin
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="ms-auto">
          <div className="d-flex align-items-center px-2">
            {decodedToken.lastName}, {decodedToken.firstName} ({decodedToken.userType})
          </div>

          <div className="d-flex align-items-center px-2">
            <ChangePassword email={decodedToken.email} access_token={access_token} />
          </div>

          <Button variant="danger text-white" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
