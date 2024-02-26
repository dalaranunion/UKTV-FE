import React from "react";
import { useState } from "react";
import "./buttons.css";

/**
 *
 */

// States expects an object with icon and text
interface State {
  Icon?: React.FC;
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
  // if(!defaultState) defaultState = 0;

  const [currState, SetCurrState] = useState<number>(0);
  if (defaultState) SetCurrState(defaultState);
  const SvgIcon = states[currState].Icon;
  let ariaLabel = states[currState].text;

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
      aria-label={ariaLabel}
    >
      {states[currState].Icon && (
        <div aria-hidden="true" className="buttons-icon-ctr">
          <SvgIcon />
        </div>
      )}
      {states[currState].text && !hideText && (
        <span className="buttons-text-ctr ml-1 mr-1">{states[currState].text}</span>
      )}
    </button>
  );
};

export default Buttons;
