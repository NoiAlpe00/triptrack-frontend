import { useSignIn } from "react-auth-kit";
import { Button, Col, Container, FloatingLabel, Form, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = (role: string) => {
    const fakeToken = "fake-jwt-token"; // In real app, get from backend

    const success = signIn({
      token: fakeToken,
      expiresIn: 480,
      tokenType: "Bearer",
      authState: { email: "user@example.com", role },
    });

    if (success) {
      navigate(`/${role.toLowerCase()}`);
    } else {
      alert("Login failed!");
    }
  };

  return (
    <Container>
      <Row className="">
        <Row>
          <Col lg={4}></Col>
          <Col lg={4} className="border border-tertiary rounded px-3 py-5 my-5">
            <Row className="align-items-center">
              <Col>
                <Image src="https://www.southville.edu.ph/wp-content/uploads/2024/04/cropped-SISC-1.png" className="school-logo" rounded></Image>
              </Col>
            </Row>
            <Row className="align-items-center my-5">
              <h1 className="text-primary">
                <strong>TripTrack</strong>
              </h1>
            </Row>
            <Row className="mb-3">
              <h5 className="text-secondary">We are glad to see you back</h5>
            </Row>
            <div className="px-1">
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 small-input">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 small-input">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </div>

            <Row className="mx-1">
              <Button size="lg">Log In</Button>
            </Row>

            <Row className="mt-5">
              <span className="small-text text-secondary">© Sean Ymannuel Espinosa - All Rights Reserved</span>
              <span className="small-text text-secondary">In partial fulfillment of the Course Requirements of the Degree</span>
              <span className="small-text text-secondary">Bachelor of Science in Information Technology</span>
            </Row>
          </Col>
          <Col lg={4}></Col>
        </Row>
      </Row>

      <div style={{ padding: "2rem" }}>
        <h2>Login</h2>
        <button onClick={() => handleLogin("Admin")}>Login as Admin</button>
        <button onClick={() => handleLogin("Guard")}>Login as Guard</button>
        <button onClick={() => handleLogin("Staff")}>Login as Staff</button>
      </div>
    </Container>
  );
}
