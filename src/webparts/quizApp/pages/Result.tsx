// Importing necessary modules and components
import * as React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  ProgressBar,
  Form,
} from "react-bootstrap"; // Importing necessary components from react-bootstrap
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import { IQuestion, SelectedOptionsType } from "../Interfaces"; // Importing necessary interfaces
import axios from "axios"; // Importing axios for HTTP requests
import { FinalOptions } from "../components/Options"; // Importing FinalOptions component

// Function to add CORS to URL
const withCORS = (url: string): string =>
  "https://api.allorigins.win/get?charset=ISO-8859-1&url=https://timeapi.io/api" +
  url;

interface IProps {
  selectedOptions: SelectedOptionsType;
  questions: IQuestion[];
  saveData: (answers: string[]) => void;
}

interface IResult {
  total: number;
  correct: number;
  percent: number;
}
// Function to fetch response with CORS
async function getCORSResponse(url: string): Promise<any> {
  const response = await axios.get(withCORS(url));

  const data = JSON.parse(response.data.contents);
  return data;
}
// Function to get today's date
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero indexed, so we add 1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
// Result component
export default function Result(props: IProps): React.ReactElement {
  const navigate = useNavigate();
  const { selectedOptions, questions, saveData } = props;
  const [calculating, setCalculating] = React.useState<boolean>(false);
  const [ans1, setAns1] = React.useState<string>("");
  const [ans2, setAns2] = React.useState<string>("");
  const [ans3, setAns3] = React.useState<string>("");
  const [ans4, setAns4] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const answers = React.useMemo<string[]>(() => {
    return [ans1, ans2, ans3, ans4];
  }, [ans1, ans2, ans3, ans4]);

  const result = React.useMemo<IResult>(() => {
    const allAnswers = [
      ans1 == selectedOptions.ques0,
      ans2 == selectedOptions.ques1,
      ans3 == selectedOptions.ques2,
      ans4 == selectedOptions.ques3,
    ];
    const correctAnswers = allAnswers.filter(Boolean);

    return {
      correct: correctAnswers.length,
      total: allAnswers.length,
      percent: (correctAnswers.length / allAnswers.length) * 100,
    };
  }, [ans1, ans2, ans3, ans4, selectedOptions]);

  // Function to get answer 1
  const getAnswer1 = async (): Promise<string> => {
    try {
      const data = await getCORSResponse("/Conversion/DayOfTheWeek/1776-07-04");
      const result = data.dayOfWeek;
      setAns1(result);
      return result;
    } catch (e) {
      setError(true);
      return "";
    }
  };

  // Function to get answer 2
  const getAnswer2 = async (): Promise<string> => {
    try {
      const today = getTodayDate();
      const data = await getCORSResponse("/Conversion/DayOfTheYear/" + today);
      const result = data.day.toString();
      setAns2(result);
      return result;
    } catch (e) {
      setError(true);
      return "";
    }
  };

  // Function to get answer 3
  const getAnswer3 = async (): Promise<string> => {
    try {
      const data = await getCORSResponse("/Conversion/DayOfTheWeek/2024-12-05");
      setAns3(data.dayOfWeek);
      return data.dayOfWeek;
    } catch (e) {
      setError(true);
      return "";
    }
  };

  // Function to get answer 4
  const getAnswer4 = async (): Promise<string> => {
    try {
      const data = await getCORSResponse(
        "/Conversion/DayOfTheWeek/" + selectedOptions.dob
      );
      setAns4(data.dayOfWeek);
      return data.dayOfWeek;
    } catch (e) {
      setError(true);
      return "";
    }
  };

  // Function to calculate answers
  const calculateAnswers = async (): Promise<void> => {
    setCalculating(true);

    const tempAnswers = [];

    tempAnswers.push(await getAnswer1());
    tempAnswers.push(await getAnswer2());
    tempAnswers.push(await getAnswer3());
    tempAnswers.push(await getAnswer4());

    if (!error) await saveData(tempAnswers);

    setCalculating(false);
  };

  // Effect hook to calculate answers when component mounts
  React.useEffect(() => {
    calculateAnswers();
  }, []);

  // JSX rendering
  return (
    <Container fluid className="p-5 pb-0 text-center">
      {error ? (
        <>
          <h1 className="mb-3">Hey {selectedOptions["name"]}, Sorry!</h1>
          <h6 className="mb-3">
            You have completed the quiz. But we are unable to fetch the answers
            for now :{"("}
          </h6>
        </>
      ) : calculating ? (
        <>
          <h1 className="mb-3">Hey {selectedOptions["name"]}, Please wait!</h1>
          <h6 className="mb-3">
            You have completed the quiz. We are assessing your answers...
          </h6>
        </>
      ) : (
        <>
          <Row>
            <Col xs={12} className="text-center">
              <div className="mb-2">
                <Image
                  src="https://media.istockphoto.com/id/1168757141/vector/gold-trophy-with-the-name-plate-of-the-winner-of-the-competition.jpg?s=612x612&w=0&k=20&c=ljsP4p0yuJnh4f5jE2VwXfjs96CC0x4zj8CHUoMo39E="
                  alt="Quiz"
                  fluid
                  style={{ maxHeight: "200px" }}
                />
              </div>
              <h1 className="mb-3">Congratulation, {selectedOptions.name}!</h1>
              <h6 className="mb-3">
                You have completed the quiz. Here&apos;s your result:
              </h6>
              <div className="result-details mb-3">
                <p>
                  Total Questions: <strong>{result?.total}</strong>
                </p>
                <p>
                  Correct Answers: <strong>{result?.correct}</strong>
                </p>
                <p>
                  Percentage: <strong>{result?.percent}%</strong>
                </p>
              </div>
              {/* Progress bar */}
              <ProgressBar
                now={result?.percent}
                label={`${result?.percent}%`}
              />
              <Button
                variant="primary"
                onClick={() => navigate("/")}
                style={{
                  marginTop: "15px",

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
                Restart Quiz
              </Button>
            </Col>
          </Row>

          <Form className="mt-5">
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
                    <FinalOptions
                      choices={question.Choices.split(",")}
                      value={selectedOptions[`ques${i}`]}
                      correct={answers[i]}
                    />
                  ) : (
                    <Form.Control
                      type={question.type}
                      value={selectedOptions[`ques${i}`]}
                      name={`ques${i}`}
                    />
                  )}
                </Form.Group>
                <hr />
              </React.Fragment>
            ))}
          </Form>
        </>
      )}
    </Container>
  );
}
