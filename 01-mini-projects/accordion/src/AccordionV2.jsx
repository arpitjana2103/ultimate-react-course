import { useState } from "react";

function AccordionV2({ faqs }) {
    const [open, setOpen] = useState(null);

    function handleOpen(index) {
        setOpen(index === open ? null : index);
    }

    return (
        <div className="accordion">
            {faqs.map(function (faq, index) {
                return (
                    <Item
                        faq={faq}
                        index={index}
                        open={index === open}
                        key={index}
                        onOpen={handleOpen}
                    />
                );
            })}
        </div>
    );
}

function Item({ faq, index, open, onOpen }) {
    const { title, text } = faq;

    return (
        <div
            onClick={() => onOpen(index)}
            className={open ? "item open" : "item"}
        >
            <p className="number">{`0${index + 1}`}</p>
            <p className="title">{title}</p>
            {open && <div className="content-box">{text}</div>}
        </div>
    );
}

export default AccordionV2;
