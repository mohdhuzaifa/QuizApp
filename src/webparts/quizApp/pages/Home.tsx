import * as React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { sp } from "@pnp/sp/presets/all";
// import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

export default function Home(props: any): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#1AC6EE", height: "100%" }}>
      <Container>
        <Row
          className="d-flex justify-content-center align-items-center pt-5"
          style={{ minHeight: "100vh" }}
        >
          {/* Content Section */}
          <Col xs={12} md={6} className="p-3">
            <div
              className="content-section text-lg-start text-xs-center"
              style={{ color: "white" }}
            >
              <h1>Welcome to Our Quiz App</h1>

              <h4 className="my-4">
                Test your knowledge with our fun and challenging quizzes!
              </h4>

              <h5>Are you ready to begin?</h5>
              <Button
                variant="primary"
                onClick={() => navigate("/quiz")}
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  backgroundColor: "#9757ED",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  fontSize: "1.20rem",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Start Quiz
              </Button>
            </div>
          </Col>

          {/* Image Section */}
          <Col xs={12} md={6}>
            <div className="my-2">
              <Image
                src="https://play-lh.googleusercontent.com/Sk3qgXlM0ULQx1M9052HenpWmpFsKmb-r-NQkxjFGTBzJLyQLnBWWTELRIlrJFYH9Aw"
                alt="Quiz"
                fluid
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
