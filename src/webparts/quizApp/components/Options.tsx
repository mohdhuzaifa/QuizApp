import * as React from "react";
import { E } from "../Interfaces"; // Importing necessary interfaces

// Interface for Options component props
interface OptionsProps {
  choices: string[]; // Array of available choices
  name: string; // Name attribute for input element
  value: string; // Value attribute for input element
  onChange: (e: E) => void; // onChange event handler
}

// Interface for FinalOptions component props
interface FinalOptionsProps {
  choices: string[]; // Array of available choices
  value: string; // Value of the selected choice
  correct: string; // Correct answer among the choices
}

// Options component
export default function Options(props: OptionsProps): React.ReactElement {
  const { choices, name, value, onChange } = props; // Destructuring props

  // Function to handle choice selection
  const changeHandler = function (option: string): void {
    const e = { target: { name, value: option } }; // Creating synthetic event object
    if (onChange) onChange(e); // Calling onChange event handler if provided
  };

  // Rendering Options component
  return (
    <div className="option-container">
      {choices.map((option) => (
        <div
          key={option}
          className={`option${option === value ? " selected" : ""}`} // Applying selected class if option matches current value
          onClick={() => changeHandler(option)} // Handling click event
        >
          {option} {/* Displaying option text */}
        </div>
      ))}
    </div>
  );
}

// FinalOptions component
export function FinalOptions(props: FinalOptionsProps): React.ReactElement {
  const { choices, value, correct } = props; // Destructuring props

  // Rendering FinalOptions component
  return (
    <div className="option-container">
      {choices.map((option) => (
        <div
          key={option}
          className={[
            "option",
            option === value ? "wrong" : "", // Applying wrong class if option matches selected value
            option === correct ? "right" : "", // Applying right class if option matches correct answer
          ].join(" ")} // Joining class names into a single string
        >
          {option} {/* Displaying option text */}
        </div>
      ))}
    </div>
  );
}
