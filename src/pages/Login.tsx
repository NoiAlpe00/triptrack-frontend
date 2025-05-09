import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Button, Col, Container, FloatingLabel, Form, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginProps, TokenData } from "../utils/TypesIndex";
import { loginUser } from "../hooks/axios";
import { decodeToken } from "../utils/utilities";

export default function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const handleLogin = async (role: string = "Admin") => {
    const token = await loginUser({ email: formData.email, password: formData.password });

    const decodedToken: TokenData = decodeToken(token.data);

    const success = token.status >= 200 && token.status < 400;

    signIn({
      token: token.data,
      expiresIn: 480,
      tokenType: "Bearer",
      authState: { email: decodedToken.email, role: decodedToken.userType ?? role },
    });

    if (success) {
      navigate(`/dashboard`);
    } else {
      alert("Login failed!");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                <Form.Control name="email" type="email" placeholder="name@example.com" onChange={handleOnChange} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 small-input">
                <Form.Control name="password" type="password" placeholder="Password" onChange={handleOnChange} />
              </FloatingLabel>
            </div>

            <Row className="mx-1">
              <Button
                size="lg"
                onClick={() => {
                  handleLogin();
                }}
              >
                Log In
              </Button>
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
        <button onClick={() => handleLogin("Requisitioner")}>Login as Requisitioner</button>
      </div>
    </Container>
  );
}
