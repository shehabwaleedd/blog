import React from 'react'
import MobileMenuSquare from './MobileSquares/mobileMenuSquare/MobileMenuSquare'
import MobileCreatePostSquare from './MobileSquares/mobileCreatePostSquare/MobileCreatePostSquare'

const MobilesSquares = ({
    navOpen,
    setNavOpen,
    createOpen,
    user,
    handleCreateOpen,
}) => {
    return (
        <>
            <MobileMenuSquare 
                navOpen={navOpen}
                setNavOpen={setNavOpen}
            />
            <MobileCreatePostSquare 
                createOpen={createOpen}
                user={user}
                handleCreateOpen={handleCreateOpen}
            />
        </>
    )
}

export default MobilesSquares