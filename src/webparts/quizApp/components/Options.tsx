import * as React from "react";
import { E } from "../Interfaces";

interface OptionsProps {
  choices: string[];
  name: string;
  value: string;
  onChange: (e: E) => void;
}

interface FinalOptionsProps {
  choices: string[];
  value: string;
  correct: string;
}

export default function Options(props: OptionsProps): React.ReactElement {
  const { choices, name, value, onChange } = props; // ['ans1', 'ans2', 'ans3', 'ans4']

  const changeHandler = function (option: string): void {
    const e = { target: { name, value: option } };
    if (onChange) onChange(e);
  };

  return (
    <div className="option-container">
      {choices.map((option) => (
        <div
          key={option}
          className={`option${option === value ? " selected" : ""}`}
          onClick={() => changeHandler(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export function FinalOptions(props: FinalOptionsProps): React.ReactElement {
  const { choices, value, correct } = props; // ['ans1', 'ans2', 'ans3', 'ans4']

  return (
    <div className="option-container">
      {choices.map((option) => (
        <div
          key={option}
          className={[
            "option",
            option === value ? "wrong" : "",
            option === correct ? "right" : "",
          ].join(" ")}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
