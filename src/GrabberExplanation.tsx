import React from "react";
import "./GrabberExplanation.css";

type ExplanationStep = {
  step: number;
  text: string;
  url: string | null;
};

// Les données avec le type défini
const explanationContent: ExplanationStep[] = [
  {
    step: 1,
    text: "Click to download below the video",
    url: "https://uploads-ssl.webflow.com/6482d3c81a3b206db8abe88e/6693eabddcb28a776ad5b0ff_1%20step%20to%20download%20a%20YouTube%20thumbnail.png",
  },
  {
    step: 2,
    text: "Click to copy the YouTube video address",
    url: "https://uploads-ssl.webflow.com/6482d3c81a3b206db8abe88e/6693eabd53ab0ff39431c0fe_2%20step%20to%20download%20a%20YouTube%20thumbnail.png",
  },
  {
    step: 3,
    text: "Paste link & download YouTube thumbnail",
    url: null,
  },
];

const GrabberExplanation: React.FC = () => {
  return (
    <div className="ParentLayout">
      <div className="TrySection">
        <span>You can try:</span>
        <span>https://www.youtube.com/watch?v=0TolBiTrUg4</span>
      </div>
      <div className="CardsLayout">
        {explanationContent.map((step, index) => (
          <div key={index} className="IndividualLayout">
            <div className="Steptext">
              <p>{step.step}</p>
              <p>{step.text}</p>
            </div>
            {step.url && <img src={step.url} alt={`Step ${step.step}`} />}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrabberExplanation;
