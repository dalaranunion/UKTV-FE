import React from "react";
import "./card.css";
import { ReactComponent as Robot } from "./r2-d2-icon.svg";

/**
 *
 */

interface ContentArray {
  title: string;
  text: string;
}

interface CardProps {
  classes?: string;
  mainTitle: string;
  secondaryTitle: string;
  content: ContentArray[];
}

const Card: React.FC<CardProps> = ({ classes, mainTitle, secondaryTitle, content }) => {
  if (!classes) classes = "";
  return (
    <article className={`card-ctr border-radius-5 ${classes}`}>
      <header className="card-header">
        <h2 className="card-main-title bold heading-lg mb-2">{mainTitle}</h2>
        <h4 className="card-secondary-title bold heading-xsm">{secondaryTitle}</h4>
        <div className="card-badge pt-5 pb-5 pl-5 pr-5">
          <div className="card-icon-ctr">
            <Robot />
          </div>
        </div>
      </header>
      <main>
        <ul className="card-content-list">
          {content.map((item, iteration) => (
            <li key={iteration} className="card-content-list-item">
              <span className="ccl-item-title pt-2 pb-2">{item.title}</span>
              <span className="ccl-item-content pt-2 pb-2">{item.text}</span>
            </li>
          ))}
        </ul>
      </main>
    </article>
  );
};

export default Card;
