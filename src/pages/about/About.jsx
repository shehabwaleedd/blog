import React from 'react'
import "./About.css"
import img from "../../assets/profile51.jpg"

const About = () => {
    return (
        <section className='about'>
            <div className="about__container">
                <div className="about__upper">
                    <h1>Story Behind lumos</h1>
                    <p>when i was thinking of the project "lumos", I embarked on a mission to create an online platform that transcends boundaries and empowers individuals to freely express their ideas and thoughts. Lumos represents a digital sanctuary where censorship has no place and restrictions are discarded. It was built with the belief that intellectual freedom is a fundamental right that should be accessible to all. Through meticulous coding and innovative design, I aimed to create an intuitive and immersive experience for users, where they can navigate seamlessly through a vast array of diverse blogs, each offering unique perspectives and insights. I meticulously implemented features that enable users to search, filter, and explore a wide range of topics, ensuring that they can engage with content that aligns with their interests. Lumos is not just a blog; it is a manifestation of my commitment to fostering an inclusive intellectual community, where ideas can flourish and ignite meaningful conversations. With every line of code I wrote, I envisioned a space where individuals from all walks of life can connect, learn, and contribute to the global tapestry of knowledge. Through Lumos, I aspire to empower individuals to challenge the status quo, question societal norms, and expand their intellectual horizons without fear of retribution. It is my hope that Lumos becomes a catalyst for positive change, igniting a spark of enlightenment that resonates with every visitor and inspires them to embrace the beauty of unrestricted expression.</p>
                    <div className="about__mission">
                        <h1>mission behind lumos</h1>
                        <p>
                            The mission behind Lumos is to create an intellectual hub on the internet that fosters a culture of unrestricted expression, open dialogue, and knowledge sharing. We believe that everyone should have the freedom to voice their thoughts, ideas, and opinions without censorship or limitations. Lumos aims to provide a platform where individuals from all backgrounds can come together to engage in meaningful conversations, explore diverse perspectives, and challenge conventional thinking. We strive to empower individuals to expand their intellectual horizons, encourage critical thinking, and promote positive change in society. Our mission is to create a space where intellectual freedom is celebrated, and where ideas can flourish and inspire others to embark on their own journeys of discovery and enlightenment.
                        </p>
                    </div>
                    <div className="about__maker">
                        <h1>behind the creation of lumos</h1>
                        <div className="about__maker_img">
                            <img src={img} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About