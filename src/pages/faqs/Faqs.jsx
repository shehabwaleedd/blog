import React, { useState, useEffect } from "react";
import "./Faqs.css";
import FaqsData from "./Data";
import { motion } from "framer-motion";

const Faqs = () => {

    const [activeAccordion, setActiveAccordion] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
    };

    const closeAccordions = () => {
        const accordions = document.getElementsByClassName('accordion');
        for (let i = 0; i < accordions.length; i++) {
            accordions[i].classList.remove('open');
            accordions[i].nextElementSibling.style.maxHeight = null;
            accordions[i].getElementsByClassName('icon')[0].innerHTML = '+';
        }
    };

    const toggleAccordion = (index) => {
        const accordion = document.getElementsByClassName('accordion')[index];
        const panel = accordion.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            accordion.classList.remove('open');
            accordion.getElementsByClassName('icon')[0].innerHTML = '+';
        } else {
            closeAccordions();
            panel.style.maxHeight = panel.scrollHeight + 'px';
            accordion.classList.toggle('open');
            accordion.getElementsByClassName('icon')[0].innerHTML = '-';
        }
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <motion.section className="faqs section"
            initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.7, ease: [0.42, 0, 0.58, 1] } }}
            exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] } }}
        >
            <div className="faq__text">
                <h1>FREQUEST ANSWERED QUESTIONS</h1>
            </div>
            <div className="faqs__container">
                {FaqsData.map(({ id, question, answer }) => (
                    <div className={`item-1 ${activeAccordion === { id } ? 'open' : ''}`} key={id}>
                        <div className="accordion" onClick={() => toggleAccordion(id - 1)}>

                            <div className="accordion__title">
                                <span>- {id} </span>
                                <h1>{question}</h1>
                            </div>
                            <div className="icon">{activeAccordion === 0 ? '-' : '+'}</div>
                        </div>
                        <div className="panel">
                            <p>{answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default Faqs;