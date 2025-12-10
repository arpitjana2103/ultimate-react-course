import { useState } from "react";

function getDateAfter(dayCount) {
  const today = new Date();
  today.setDate(today.getDate() + dayCount);
  return today.toDateString();
}

export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function handleIncStep() {
    setStep((step) => step + 1);
  }

  function handleDecStep() {
    setStep((step) => step - 1);
  }

  function handleIncCount() {
    setCount((count) => count + step);
  }

  function handleDecCount() {
    setCount((count) => count - step);
  }

  return (
    <div>
      <div>
        <button onClick={handleDecStep}>-</button>
        <span>Step : {step}</span>
        <button onClick={handleIncStep}>+</button>
      </div>
      <div>
        <button onClick={handleDecCount}>-</button>
        <span>Count : {count}</span>
        <button onClick={handleIncCount}>+</button>
      </div>
      <p>
        {Math.abs(count)} days {count >= 0 ? "from" : "before"} today is{" "}
        {getDateAfter(count)}
      </p>
    </div>
  );
}
