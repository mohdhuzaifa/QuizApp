import * as React from "react";
import styles from "./QuizApp.module.scss"; // Importing SCSS styles
import Home from "../pages/Home"; // Importing Home component
import Quizz from "../pages/Quizz"; // Importing Quizz component
import Result from "../pages/Result"; // Importing Result component
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "../assets/App.css"; // Importing custom CSS
import { Route, Routes, HashRouter } from "react-router-dom"; // Importing necessary components from react-router-dom
import { WebPartContext } from "@microsoft/sp-webpart-base"; // Importing WebPartContext from SharePoint
import { sp } from "@pnp/sp/presets/all"; // Importing SharePoint PnP JS
import { IQuestion, E, SelectedOptionsType } from "../Interfaces"; // Importing necessary interfaces

interface IProps {
  spcontext: WebPartContext; // Props interface containing SharePoint context
}

export default function QuizApp(props: IProps): React.ReactElement {
  const [questions, setQuestions] = React.useState<IQuestion[]>([]); // State to store questions
  const [selectedOptions, setSelectedOptions] =
    React.useState<SelectedOptionsType>({}); // State to store selected options

  // Function to handle option change
  const handleOptionChange = (e: E): void => {
    const { name, value } = e.target;

    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  };

  // Function to retrieve quiz questions from SharePoint
  const getLists = async () => {
    setQuestions(
      await sp.web.lists
        .getByTitle("QuizQuestions")
        .items.select("Title", "type", "Choices")
        .getAll()
    );
  };

  // Function to save user responses to SharePoint
  const saveData = async (answers: string[]): Promise<void> => {
    const data = {
      Title: selectedOptions.name,
      DOB: selectedOptions.dob,
      Response1: selectedOptions.ques0,
      Response2: selectedOptions.ques1,
      Response3: selectedOptions.ques2,
      Response4: selectedOptions.ques3,
      APIResponse1: answers[0],
      APIResponse2: answers[1],
      APIResponse3: answers[2],
      APIResponse4: answers[3],
    };

    await sp.web.lists.getByTitle("Responses").items.add(data); // Adding data to SharePoint list
  };

  React.useEffect(() => {
    sp.setup({
      spfxContext: props.spcontext as any,
    });
    getLists(); // Fetching quiz questions on component mount
  }, []);

  // Rendering QuizApp component
  return (
    <div className={styles.quizApp}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route for Home component */}
          <Route
            path="/quiz"
            element={
              <Quizz
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
                questions={questions}
              />
            } // Route for Quizz component with props
          />
          <Route
            path="/result"
            element={
              <Result
                selectedOptions={selectedOptions}
                questions={questions}
                saveData={saveData}
              />
            } // Route for Result component with props
          />
        </Routes>
      </HashRouter>
    </div>
  );
}
