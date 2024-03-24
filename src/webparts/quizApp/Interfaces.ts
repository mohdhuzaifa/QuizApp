interface IQuestion {
  Title: string;
  type: string;
  Choices: string;
}

interface E {
  target: {
    name: string;
    value: string;
  };
}

interface SelectedOptionsType {
  [key: string]: string;
}

export { IQuestion, E, SelectedOptionsType };
