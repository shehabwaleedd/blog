import React from 'react'

const DesktopMenuSquare = ({
    navOpen,
    setNavOpen,
}) => {
    return (
        <div className={`${navOpen ? "square4Open" : "square4"}`} onClick={() => setNavOpen(!navOpen)}>
            <div className="menu__container" >
                <div className={navOpen ? "hamBox hamBoxOpen" : "hamBox"}>
                    <span className={navOpen ? "lineTop spin" : "lineTop"}></span>
                    <span className={navOpen ? "lineBottom spin" : "lineBottom"}></span>
                </div>
            </div>
        </div>
    )
}

export default DesktopMenuSquare