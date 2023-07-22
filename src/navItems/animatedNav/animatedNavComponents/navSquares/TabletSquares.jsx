import React from 'react'
import TabletMenuSquare from './TabletSquares/TabletMenuSquare'
import TabletCreatePostSquare from './TabletSquares/TabletCreatePostSquare'

const TabletSquares = ({
    navOpen,
    setNavOpen,
    createOpen,
    user,
}) => {
    return (
        <>
            <TabletMenuSquare
                navOpen={navOpen}
                setNavOpen={setNavOpen}
            />
            <TabletCreatePostSquare
                createOpen={createOpen}
                user={user}
            />
        </>
    )
}

export default TabletSquares