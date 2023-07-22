import React from 'react'
import TabletMenuSquare from './TabletSquares/TabletMenuSquare'
import TabletCreatePostSquare from './TabletSquares/TabletCreatePostSquare'

const TabletSquares = ({
    navOpen,
    setNavOpen,
    createOpen,
    user,
    handleCreateOpen,
}) => {
    return (
        <>
            <TabletMenuSquare
                navOpen={navOpen}
                setNavOpen={setNavOpen}
            />
            <TabletCreatePostSquare
                createOpen={createOpen}
                handleCreateOpen={handleCreateOpen}
                user={user}
            />
        </>
    )
}

export default TabletSquares