import { useState } from "react";

function getDateAfter(dayCount) {
    let prefix = "Today is : ";
    if (dayCount < 0) prefix = `Date before ${-dayCount} days was : `;
    if (dayCount > 0) prefix = `Date after ${dayCount} days be : `;
    const today = new Date();
    today.setDate(today.getDate() + dayCount);
    return `${prefix} ${today.toDateString()}`;
}

function DateCounter2() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    function handleOnChange(e) {
        const value = Number(e.target.value);
        setCount(isNaN(value) ? 0 : value);
    }

    function handleReset() {
        setStep(1);
        setCount(0);
    }

    return (
        <div>
            <div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    id="steps"
                    value={step}
                    onChange={(e) => setStep(Number(e.target.value))}
                />
                <label htmlFor="steps">{step}</label>
            </div>
            <div>
                <button onClick={() => setCount(+count - step)}>-</button>
                <input type="text" value={count} onChange={handleOnChange} />
                <button onClick={() => setCount(+count + step)}>+</button>
            </div>
            <p>{getDateAfter(count)}</p>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default DateCounter2;
