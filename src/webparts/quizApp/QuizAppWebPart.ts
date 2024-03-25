// Importing necessary modules and components
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane"; // Importing necessary property pane components
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "QuizAppWebPartStrings"; // Importing localized strings
import QuizApp from "./components/QuizApp"; // Importing QuizApp component

// Interface for Quiz App Web Part props
export interface IQuizAppWebPartProps {
  description: string;
}

// QuizAppWebPart class extending BaseClientSideWebPart
export default class QuizAppWebPart extends BaseClientSideWebPart<IQuizAppWebPartProps> {
  // Render method to render the component
  public render(): void {
    // Creating React element for QuizApp component
    const element: React.ReactElement = React.createElement(QuizApp, {
      spcontext: this.context,
    });

    // Rendering React element into the DOM element
    ReactDom.render(element, this.domElement);
  }

  // Method to dispose of the component
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // Method to define the data version
  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  // Method to define the property pane configuration
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
