import React from 'react'
import "./About.css"
import img from "../../assets/profile51.jpg"
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { t } from 'i18next';

const About = () => {
    const [showImage, setShowImage] = useState(false);
    const imageRef = useRef(null);
    const ref = useRef(null)


    useEffect(() => {
        // making the image follows the mouse
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const { top, left } = imageRef.current.parentElement.getBoundingClientRect();
            const image = imageRef.current;

            if (image) {
                const offsetX = clientX - left;
                const offsetY = clientY - top;
                image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            }
        };

        const handleMouseEnter = () => {
            setShowImage(true);
        };

        const handleMouseLeave = () => {
            setShowImage(false);
            const image = imageRef.current;
            if (image) {
                image.style.transform = '';
            }
        };

        const parentElement = imageRef.current?.parentElement;
        if (parentElement) {
            parentElement.addEventListener('mousemove', handleMouseMove);
            parentElement.addEventListener('mouseenter', handleMouseEnter);
            parentElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (parentElement) {
                parentElement.removeEventListener('mousemove', handleMouseMove);
                parentElement.removeEventListener('mouseenter', handleMouseEnter);
                parentElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);


    return (
        <motion.section className='about' 
        initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.7, ease: [0.42, 0, 0.58, 1] } }}
        exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] } }}
        >
            <div className="about__container">
                <motion.div className="about__upper" ref={ref} transition={{ duration: 0.5, type: 'spring' }}>
                    <h1>{t("about__story_behind_lumos")}</h1>
                    <p>{t("about__story_behind_lumos_text")}</p>
                    <motion.div className="about__mission">
                        <motion.h1 initial={{ x: 100 }} whileInView={{ x: 0 }} transition={{ duration: 1, type: "spring" }}>{t("about__mission_behind_lumos")}</motion.h1>
                        <motion.p initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: 1, type: "spring" }}>
                            {t("about__mission_behind_lumos_text")}
                        </motion.p>
                    </motion.div>
                    <div className="about__maker">
                        <motion.h1 initial={{ x: -100 }} whileInView={{ x: 0 }} transition={{ duration: 1, type: "spring" }}>{t("about__behind_creation_of_lumos")}</motion.h1>
                        <div className="about__maker_img" ref={imageRef}>
                            {showImage && <img src={img} alt="" />}
                        </div>
                        <motion.div className="maker__text" initial={{ x: -100 }} whileInView={{ x: 0 }} transition={{ duration: 1, type: "spring" }}>
                            <motion.p>{t("about_behind_story_part1")}</motion.p>
                            <motion.p>{t("about_behind_story_part2")}</motion.p>
                            <motion.p>{t("about_behind_story_part3")}</motion.p>
                            <motion.p>{t("about_behind_story_part4")}</motion.p>
                            <motion.p>{t("about_behind_story_part5")}</motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default About