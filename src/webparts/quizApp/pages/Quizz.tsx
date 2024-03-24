import * as React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";
import { IQuestion, SelectedOptionsType, E } from "../Interfaces";

interface IProps {
  questions: IQuestion[];
  selectedOptions: SelectedOptionsType;
  handleOptionChange: (e: E) => void;
}

export default function Quiz(props: IProps): React.ReactElement {
  const navigate = useNavigate();
  const { questions, selectedOptions, handleOptionChange } = props;

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    navigate("/result");
  }

  return (
    <div>
      <Container fluid className="p-5 pt-2">
        <div className="d-flex justify-content-between align-item-center ">
          <h1 className="mt-3">Let&apos;s Start Quiz</h1>
          <div>
            <Image
              src="https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-icon_149152-811.jpg"
              alt="Quiz"
              fluid
              style={{ maxHeight: "100px" }}
            />
          </div>
        </div>
        <Row>
          <Col xs={12}>
            <div className="content-section">
              <Form className="mt-5" onSubmit={submitHandler}>
                <Form.Group controlId="studentName" className="mb-4">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleOptionChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="dob" className="mb-4">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    onChange={handleOptionChange}
                    placeholder="Enter your DOB"
                    required
                  />
                </Form.Group>
                <h3 className="text-center mt-5 mb-5"> Quiz Questions </h3>
                <hr />
                {/* Questions */}
                {questions.map((question, i) => (
                  <React.Fragment key={i}>
                    <Form.Group controlId="quizQuestion2" className="mb-4">
                      <Form.Label
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "500",
                          marginBottom: "20px",
                          marginTop: "10px",
                          letterSpacing: "1px",
                        }}
                      >
                        Question {i + 1}: {question.Title}
                      </Form.Label>
                      {question.type === "options" ? (
                        <Options
                          choices={question.Choices.split(",")}
                          value={selectedOptions[`ques${i}`]}
                          name={`ques${i}`}
                          onChange={handleOptionChange}
                        />
                      ) : (
                        <Form.Control
                          type={question.type}
                          value={selectedOptions[`ques${i}`]}
                          name={`ques${i}`}
                          onChange={handleOptionChange}
                        />
                      )}
                    </Form.Group>
                    <hr />
                  </React.Fragment>
                ))}
                {/* Add more quiz questions as needed */}
                <div className="text-end">
                  <Button
                    variant="primary"
                    type="submit"
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
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
