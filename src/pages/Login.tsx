import { useState } from "react";
import { useAuthHeader, useIsAuthenticated, useSignIn } from "react-auth-kit";
import { Button, Col, Container, FloatingLabel, Form, Row, Image } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginProps, TokenData } from "../utils/TypesIndex";
import { loginUser } from "../hooks/axios";
import { decodeToken } from "../utils/utilities";

export default function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const isAuthenticated = useIsAuthenticated();

  const authHeader = useAuthHeader();
  const access_token = authHeader();

  const [isSuccess, setIsSuccess] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated()) {
    const decodedToken = decodeToken(access_token);
    return decodedToken.userType.toLowerCase() === "guard" ? (
      <Navigate to="/trips" replace />
    ) : decodedToken.userType.toLowerCase() === "driver" ? (
      <Navigate to="/maintenance" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const handleLogin = async (role: string = "Admin") => {
    try {
      const token = await loginUser({ email: formData.email, password: formData.password });
      const decodedToken: TokenData = decodeToken(token.data);
      const userType = decodedToken.userType.trim().toLowerCase();

      const success = token.statusCode >= 200 && token.statusCode < 400;

      if (success) {
        signIn({
          token: token.data,
          expiresIn: 480,
          tokenType: "Bearer",
          authState: { email: decodedToken.email, role: decodedToken.userType ?? role },
        });
        const path = `${userType == "driver" ? "/maintenance" : userType == "admin" ? "/dashboard" : "/trips"}`;
        navigate(path);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      setIsSuccess(false);
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
      <Row className="d-flex justify-content-center">
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
              <div hidden={isSuccess}>
                <span className="thin-text text-danger">
                  <i className="bi bi-exclamation-circle" /> Incorrect Credentials
                </span>
              </div>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 small-input">
                <Form.Control name="email" type="email" placeholder="name@example.com" onChange={handleOnChange} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-1 small-input">
                <Form.Control name="password" type={showPassword ? "text" : "password"} placeholder="Password" onChange={handleOnChange} />
              </FloatingLabel>
              <Form.Check // prettier-ignore
                className="text-start mb-3 text-secondary"
                type="switch"
                id="custom-switch"
                label="Show Password"
                onChange={(e) => setShowPassword(e.target.checked)}
              />
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
    </Container>
  );
}
