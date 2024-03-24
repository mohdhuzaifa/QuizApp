import * as React from "react";
import styles from "./QuizApp.module.scss";
import Home from "../pages/Home";
import Quizz from "../pages/Quizz";
import Result from "../pages/Result";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/App.css";
import { Route, Routes, HashRouter } from "react-router-dom";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
import { IQuestion, E, SelectedOptionsType } from "../Interfaces";

interface IProps {
  spcontext: WebPartContext;
}

export default function QuizApp(props: IProps): React.ReactElement {
  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [selectedOptions, setSelectedOptions] =
    React.useState<SelectedOptionsType>({});

  const handleOptionChange = (e: E): void => {
    const { name, value } = e.target;

    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  };

  const getLists = async () => {
    setQuestions(
      await sp.web.lists
        .getByTitle("QuizQuestions")
        .items.select("Title", "type", "Choices")
        .getAll()
    );
    console.log("questions set");
  };

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

    console.log("savedata");
    console.log(data);
    await sp.web.lists.getByTitle("Responses").items.add(data);
  };

  React.useEffect(() => {
    sp.setup({
      spfxContext: props.spcontext as any,
    });
    getLists();
  }, []);

  return (
    <div className={styles.quizApp}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/quiz"
            element={
              <Quizz
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
                questions={questions}
              />
            }
          />
          <Route
            path="/result"
            element={
              <Result
                selectedOptions={selectedOptions}
                questions={questions}
                saveData={saveData}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}
