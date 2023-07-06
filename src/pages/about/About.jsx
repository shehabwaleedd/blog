import React from 'react'
import "./About.css"
import img from "../../assets/profile51.jpg"
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Waypoint from 'react-waypoint';

const About = () => {
    const [showImage, setShowImage] = useState(false);
    const imageRef = useRef(null);
    const ref = useRef(null)


    useEffect(() => {
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
        <motion.section className='about' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} exit={{ opacity: 0 }}>
            <div className="about__container">
                <motion.div className="about__upper" ref={ref} transition={{ duration: 0.5, type: 'spring' }}>
                    <h1>Story Behind lumos</h1>
                    <p>when i was thinking of the project "lumos", I embarked on a mission to create an online platform that transcends boundaries and empowers individuals to freely express their ideas and thoughts. Lumos represents a digital sanctuary where censorship has no place and restrictions are discarded. It was built with the belief that intellectual freedom is a fundamental right that should be accessible to all. Through meticulous coding and innovative design, I aimed to create an intuitive and immersive experience for users, where they can navigate seamlessly through a vast array of diverse blogs, each offering unique perspectives and insights. I meticulously implemented features that enable users to search, filter, and explore a wide range of topics, ensuring that they can engage with content that aligns with their interests. Lumos is not just a blog; it is a manifestation of my commitment to fostering an inclusive intellectual community, where ideas can flourish and ignite meaningful conversations. With every line of code I wrote, I envisioned a space where individuals from all walks of life can connect, learn, and contribute to the global tapestry of knowledge. Through Lumos, I aspire to empower individuals to challenge the status quo, question societal norms, and expand their intellectual horizons without fear of retribution. It is my hope that Lumos becomes a catalyst for positive change, igniting a spark of enlightenment that resonates with every visitor and inspires them to embrace the beauty of unrestricted expression.</p>
                    <motion.div className="about__mission">
                        <motion.h1 initial={{ x: 100 }} whileInView={{ x: 0 }} transition={{ duration: 1, type: "spring" }}>mission behind lumos</motion.h1>
                        <motion.p initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: 1, type: "spring" }}>
                            The mission behind Lumos is to create an intellectual hub on the internet that fosters a culture of unrestricted expression, open dialogue, and knowledge sharing. We believe that everyone should have the freedom to voice their thoughts, ideas, and opinions without censorship or limitations. Lumos aims to provide a platform where individuals from all backgrounds can come together to engage in meaningful conversations, explore diverse perspectives, and challenge conventional thinking. We strive to empower individuals to expand their intellectual horizons, encourage critical thinking, and promote positive change in society. Our mission is to create a space where intellectual freedom is celebrated, and where ideas can flourish and inspire others to embark on their own journeys of discovery and enlightenment.
                        </motion.p>
                    </motion.div>
                    <div className="about__maker">
                        <motion.h1 initial={{ x: -100 }} whileInView={{ x: 0 }} transition={{ duration: 1, type: "spring" }}>Behind the Creation of Lumos</motion.h1>
                        <div className="about__maker_img" ref={imageRef}>
                            {showImage && <img src={img} alt="" />}
                        </div>
                        <motion.div className="maker__text" initial={{ x: -100 }} whileInView={{ x: 0 }} transition={{ duration: 1, type: "spring" }}>
                            <motion.p >Shehab, a young gentleman of twenty-four years, is a resident of the bustling metropolis of Cairo, Egypt. Situated in the cradle of civilization, Shehab finds inspiration in the rich history and cultural heritage that surrounds him. While his professional journey has taken him through various vocations, it was in the realm of front-end development that his true passion was ignited.</motion.p>
                            <motion.p>Diversity is a hallmark of Shehab's life. Not only is he fluent in three languages, but he also possesses an insatiable thirst for knowledge and an unwavering desire to explore the unknown. His inquisitive nature drives him to delve into the depths of art, culture, and philosophy. Shehab embraces the vibrant tapestry of colors and sounds that surround him, drawing inspiration from the timeless melodies of jazz, which resonate with the greatness of Africa. He finds solace and introspection in the soulful tunes of blues, encapsulating profound sorrows and unwavering hope. The essence of celebration and vitality, encapsulated in funk music, fuels his zest for life.</motion.p>
                            <motion.p>his intellectual pursuits extend beyond dictionaries and lexicons. He envisions a diverse world of literature and philosophy, embarking on an endless journey to uncover the depths of the human soul and life's experiences. His commitment to exploring the intricacies of the human condition is a testament to his passion for understanding and embracing diverse perspectives.</motion.p>
                            <motion.p>he is a young man who carries within him the fire of creativity and the passion for exploration. He eagerly anticipates the challenges and new possibilities that the future holds. His multidimensional nature, fueled by his diverse interests and relentless curiosity, propels him forward in his personal and professional endeavors.</motion.p>
                            <motion.p>With his vibrant spirit, insatiable hunger for knowledge, and commitment to embracing the beauty of different cultures, Shehab is poised to make a positive impact on the world around him. He embodies the spirit of a global citizen, ready to contribute to the ever-evolving tapestry of human experiences.</motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default About