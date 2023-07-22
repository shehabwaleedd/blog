import React from 'react'

const TabletMenuSquare = ({
    navOpen,
    setNavOpen,

}) => {
    return (
        <div className={`${navOpen ? "square4OpenMobile" : "square4Mobile"}`} onClick={() => setNavOpen(!navOpen)}>
            <div className="menu__container-mobile" >
                <div className={navOpen ? "hamBox-mobile hamBoxOpen" : "hamBox-mobile"}>
                    <span className={navOpen ? "lineTop-mobile spin" : "lineTop-mobile"}></span>
                    <span className={navOpen ? "lineBottom-mobile spin" : "lineBottom-mobile"}></span>
                </div>
            </div>
        </div>
    )
}

export default TabletMenuSquare