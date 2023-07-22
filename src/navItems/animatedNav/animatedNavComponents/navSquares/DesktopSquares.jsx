import React from 'react'
import DesktopArticlesSquare from './DesktopSquares/DesktopArticlesSquare'
import DesktopAboutSquare from './DesktopSquares/DesktopAboutSquare'
import DesktopAccountSquare from './DesktopSquares/DesktopAccountSquare'
import DesktopMenuSquare from './DesktopSquares/DesktopMenuSquare'
import DesktopCreatePostSquare from './DesktopSquares/DesktopCreatePostSquare'

const DesktopSquares = ({
    articlesOpen,
    handleArticlesOpen,
    postCount,
    language,
    aboutOpen,
    handleAboutOpen,
    accountOpen,
    handleAccountOpen,
    user,
    navOpen,
    setNavOpen,
    createOpen,
    handleCreateOpen,
}) => {
    return (
        <>
            <DesktopArticlesSquare
                articlesOpen={articlesOpen}
                handleArticlesOpen={handleArticlesOpen}
                postCount={postCount}
                language={language}
            />
            <DesktopAboutSquare
                aboutOpen={aboutOpen}
                handleAboutOpen={handleAboutOpen}
                language={language}
            />
            <DesktopAccountSquare
                language={language}
                user={user}
                accountOpen={accountOpen}
                handleAccountOpen={handleAccountOpen}
            />
            <DesktopMenuSquare 
                navOpen={navOpen}
                setNavOpen={setNavOpen}
            />
            <DesktopCreatePostSquare 
                createOpen={createOpen}
                handleCreateOpen={handleCreateOpen}
                user={user}
                language={language}
            />
        </>
    )
}

export default DesktopSquares