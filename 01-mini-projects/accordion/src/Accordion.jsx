import { useState } from "react";

function Accordion({ faqs }) {
    console.log(faqs);
    return (
        <div className="accordion">
            {faqs.map(function (faq, index) {
                return <Item faq={faq} index={index + 1} key={index} />;
            })}
        </div>
    );
}

function Item({ faq, index }) {
    const { title, text } = faq;
    const [open, setOpen] = useState(false);

    return (
        <div
            onClick={() => setOpen(!open)}
            className={open ? "item open" : "item"}
        >
            <p className="number">{`0${index}`}</p>
            <p className="title">{title}</p>
            {open && <div className="content-box">{text}</div>}
        </div>
    );
}

export default Accordion;
