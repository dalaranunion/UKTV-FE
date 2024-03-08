import React from "react";
import { useState } from "react";
import "./buttons.css";

/**
 * The button component is to be used across the entire site
 * It can take extra classes, it has two versions
 * If it will take "states", an array of objects, it will toggle
 * between these states
 *
 *
 * @typedef {Object} ButtonProps - All the props a button can get
 * @property {Function} [parentClickFn] - An optional function to call when the component is clicked from its parent.
 * @property {number} defaultState - The initial state index for the button.
 * @property {State[]} states - An array of objects defining the states for the button.
 *
 ** @typedef {Object} State
 ** @property {React.FC} [Icon] - An SVG pulled as a React component to render as the buttons icon.
 ** @property {string} text - The text to display on the button and used in Aria-label.
 *
 * @property {string} [classes] - Additional CSS classes to apply to the button.
 * @property {"main" | "secondary"} btnVersion - The button version (main or secondary).
 * @property {"button" | "submit" | "reset"} btnType - The button type (button, submit, or reset).
 * @property {boolean} hideText - Whether to hide the button text (an aria-label always exists).
 * @property {boolean} [disabled] - Whether the button is disabled.
 *
 */

// States expects an object with icon and text
interface State {
  Icon?: React.FC | undefined;
  text: string;
}

interface ButtonProps {
  parentClickFn?: Function;
  defaultState: number;
  states: State[];
  // Any further classes
  classes?: string;
  // Button version Main/secondary
  btnVersion: "main" | "secondary";
  // Button type reset / submit / etc
  btnType: "button" | "submit" | "reset";
  // Aria label used when there is no button text
  hideText: boolean;
  disabled?: boolean;
}

const Buttons: React.FC<ButtonProps> = ({
  parentClickFn,
  defaultState,
  states,
  hideText,
  classes,
  btnVersion,
  btnType,
  disabled,
}) => {
  const [currState, SetCurrState] = useState<number>(0);
  if (defaultState) SetCurrState(defaultState);

  const stateText = states[currState].text;
  // State icon has uppercase letter as it is a component
  const StateIcon = states[currState].Icon;

  function goToNextState() {
    if (parentClickFn) parentClickFn();

    SetCurrState(currState === states.length - 1 ? 0 : currState + 1);
  }
  return (
    <button
      disabled={disabled}
      onClick={goToNextState}
      className={`button-${btnVersion} ${classes}`}
      type={btnType}
      aria-label={states[currState].text}
    >
      {StateIcon && (
        <div aria-hidden="true" className="buttons-icon-ctr">
          <StateIcon />
        </div>
      )}
      {stateText && !hideText && (
        <span className="buttons-text-ctr ml-1 mr-1">{stateText}</span>
      )}
    </button>
  );
};

export default Buttons;
