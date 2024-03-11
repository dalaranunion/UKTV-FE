import React from "react";
import "./card.css";
import { ReactComponent as Robot } from "./r2-d2-icon.svg";

/**
 * @typedef {Object} CardProps
 * @property {string} [classes] - Additional CSS classes to apply to the component.
 * @property {string} mainTitle - The main title of the card.
 * @property {string} secondaryTitle - The optional secondary title of the card.
 * @property {ContentArray[]} content - An array of content objects defining the rest of card's content.
 *
 ** @typedef {Object} ContentArray
 ** @property {string} title - The title of the content item.
 ** @property {string} text - The text content of the item.
 *
 */

interface ContentArray {
  title: string;
  text: string;
}

interface CardProps {
  classes?: string;
  mainTitle: string;
  secondaryTitle: string | null;
  content: ContentArray[];
}

const Card: React.FC<CardProps> = ({ classes, mainTitle, secondaryTitle, content }) => {
  if (!classes) classes = "";
  return (
    <article className={`card-ctr border-radius-5 ${classes}`}>
      <header className="card-header">
        <h2 className="card-main-title bold heading-lg mb-2">{mainTitle}</h2>
        {secondaryTitle ? (
          <h4 className="card-secondary-title bold heading-xsm">{secondaryTitle}</h4>
        ) : null}
        <div className="card-badge pt-5 pb-5 pl-5 pr-5">
          <div className="card-icon-ctr">
            <Robot />
          </div>
        </div>
      </header>
      <div>
        <ul className="card-content-list">
          {content.map((item, iteration) => (
            <li key={iteration} className="card-content-list-item">
              <span className="ccl-item-title pt-2 pb-2">{item.title}</span>
              <span className="ccl-item-content pt-2 pb-2">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Card;
