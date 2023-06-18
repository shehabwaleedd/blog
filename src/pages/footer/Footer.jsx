import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__container">
                <div className="footer__logo">
                    <h1>lumos</h1>
                </div>
                <div className="footer__credits">
                    <span>© 2023 lumos. All rights reserved.</span>
                    <p>Created and Desgined by <a href="https://shehabwaleedd.vercel.app/" target='__blank'>Shehab Waleed</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer